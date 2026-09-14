# Technical Glossary

> Knowledge transfer reference for technical terminology used throughout the documentation.

---

## Core Concepts

### Embedding

An embedding is a numerical representation of text as a vector , a list of floating-point numbers that captures semantic meaning. When you embed the phrase "capital of France" and the phrase "what is the main city in France," the resulting vectors are close together in vector space because they mean similar things. This is the foundation of semantic search. Instead of matching keywords, we match meaning.

We use sentence-transformers to generate embeddings locally. The embedding model takes text input and produces a fixed-size vector (e.g., 384 or 768 dimensions). These vectors are what we store in our vector database and compare against each other.

**Why it matters for us:** Every query gets embedded before we decide where to route it. The quality of the embedding directly determines our cache hit rate , poor embeddings mean similar queries don't match, and we lose the cost savings.

### Vector

A vector is an array of numbers that represents data in a way that preserves relationships. In our context, vectors represent text queries. Two vectors that are close together in vector space have similar meanings. The distance between vectors is what we measure when we do a cache lookup.

Vector databases store these vectors and allow fast similarity search , finding the vectors closest to a given query vector. This is fundamentally different from traditional databases that match exact strings.

### Vector Database

A vector database is specialized storage designed to index and query high-dimensional vectors efficiently. Traditional databases use B-trees or hash indexes for exact lookups. Vector databases use indexing structures like HNSW or IVF to find approximate nearest neighbors , vectors that are close to the query vector , in sub-millisecond time.

We use Qdrant as our primary vector database and Redis as our semantic cache layer. Qdrant handles persistent storage; Redis handles fast in-memory lookups.

---

## Inference & Optimization

### LLM (Large Language Model)

A large language model is a neural network trained on massive text datasets that can generate, understand, and reason about language. Examples include GPT-4, Claude, and Llama. These models have billions of parameters and require significant compute resources to run.

### SLM (Small Language Model)

A small language model is a smaller, cheaper alternative to frontier LLMs. Models like Phi-3, Gemma 2B, or Mistral 7B can handle simple tasks , lookups, rephrasing, basic summarization , at a fraction of the cost. They may have 1-7 billion parameters compared to a frontier model's hundreds of billions.

In our system, SLMs handle the majority of queries. Only queries that require complex reasoning, multi-step logic, or deep domain knowledge get escalated to the frontier model.

### Frontier Model

A frontier model is the most capable, most expensive LLM available , GPT-4, Claude 3.5 Sonnet, Gemini Ultra. These models excel at complex reasoning, nuanced analysis, and tasks that require deep understanding. They also cost 10-100x more per token than SLMs.

Our system only routes to frontier models when simpler models can't handle the query. This is where the 60% cost savings come from , most queries don't need frontier-level intelligence.

### Inference

Inference is the process of running input text through a model to generate output. When you send a prompt to an LLM and get a response, that's inference. The cost of inference depends on the model size, the input length, and the output length.

### Quantization

Quantization is the process of reducing the precision of model weights , converting from 32-bit floating point (FP32) to 16-bit (FP16), 8-bit (INT8/FP8), or even 4-bit (INT4) integers. This reduces memory usage and increases inference speed with minimal quality loss.

- **FP16** , Half precision. Minimal quality loss, 2x memory reduction.
- **INT8** , 8-bit integers. Noticeable speed improvement, slight quality loss on some tasks.
- **FP8** , 8-bit floating point. NVIDIA's preferred format for H100 GPUs. Good balance of speed and quality.
- **INT4** , 4-bit integers. Maximum compression, some quality degradation on complex reasoning.

We study quantization guides to understand when INT4 is safe (simple routing decisions) versus when we need FP16 or higher (complex reasoning).

### KV-Cache (Key-Value Cache)

KV-cache is a technique for storing intermediate computations during text generation. When a model generates tokens, it computes key and value matrices for attention layers. Without caching, these would be recomputed for every token. KV-cache stores them, so subsequent tokens only need to compute new entries.

The problem is that KV-cache grows with sequence length and batch size. On a single GPU, memory fills up quickly. This is where PagedAttention comes in.

### PagedAttention

PagedAttention is vLLM's memory management technique for KV-cache. It treats KV-cache like virtual memory , dividing it into fixed-size "pages" that can be stored in non-contiguous memory locations. This eliminates memory fragmentation and allows hundreds of concurrent requests on a single GPU.

Without PagedAttention, each request needs a pre-allocated contiguous memory block for its KV-cache. Most of that memory goes unused. PagedAttention lets multiple requests share GPU memory efficiently.

**Why it matters for us:** Our routing layer spins up small models on demand. PagedAttention lets us serve many concurrent requests without wasting GPU memory.

### Continuous Batching

Traditional batching groups requests into fixed batches , all requests in a batch must complete before the next batch starts. Continuous batching allows new requests to join an existing batch as earlier ones complete. This improves GPU utilization and reduces average latency.

vLLM implements continuous batching natively. When a request finishes generating tokens, the GPU slot is immediately filled by a waiting request instead of sitting idle.

### Prefix Caching

Prefix caching stores the KV-cache for common prompt prefixes. If multiple queries share the same system prompt or context, the shared prefix is computed once and reused across all queries. This reduces time-to-first-token for subsequent requests.

---

## Semantic Search & Similarity

### Cosine Similarity

Cosine similarity measures the angle between two vectors, regardless of their magnitude. It returns a value between -1 and 1, where 1 means identical direction (same meaning), 0 means perpendicular (unrelated), and -1 means opposite direction.

```
cosine_similarity(A, B) = (A · B) / (||A|| × ||B||)
```

We use a threshold of 0.92 for cache hits. If a new query's embedding has cosine similarity > 0.92 with a stored query, we return the cached response. This threshold is tuned to balance hit rate (higher threshold = fewer false matches) against cache utilization (lower threshold = more hits).

### HNSW (Hierarchical Navigable Small World)

HNSW is an indexing algorithm for approximate nearest neighbor search. It builds a multi-layer graph where each layer is a "small world" network , every node connects to a few neighbors. Search starts at the top layer (sparse, long-range connections) and drills down to lower layers (dense, short-range connections).

HNSW provides sub-millisecond search on millions of vectors with high accuracy. The trade-off is memory usage , HNSW indexes consume significant RAM compared to alternatives like IVF-PQ.

**Why it matters for us:** Cache lookups need to be fast (< 5ms). HNSW gives us the speed without sacrificing accuracy.

### IVF (Inverted File Index)

IVF partitions vectors into clusters (Voronoi cells) and searches only the closest clusters to the query. It's more memory-efficient than HNSW but requires a training step and has lower recall at the same speed.

### Metadata Filtering

Metadata filtering combines vector similarity search with attribute-based filters. For example: "find queries similar to this one, but only from the last 7 days" or "only from the finance domain." The database first filters by metadata, then searches for similar vectors within the filtered set.

Qdrant supports pre-filtering (filter first, then search) and post-filtering (search first, then filter results). The choice affects latency and recall.

---

## Knowledge Graphs & RAG

### Knowledge Graph

A knowledge graph stores entities and their relationships as a graph structure. Nodes represent entities (concepts, documents, users), and edges represent relationships (depends-on, part-of, authored-by). This allows traversal queries like "find all components that depend on this service" , something vector databases handle poorly.

We use Neo4j to store knowledge graphs. When the SLM detects that a query involves structural relationships, it writes the relationship structure to Neo4j. Future queries can traverse these relationships instead of re-inferring them.

### GraphRAG

GraphRAG combines graph-based knowledge retrieval with traditional vector search. Instead of just finding similar documents, GraphRAG traverses relationships in a knowledge graph to find connected information. This is particularly useful for queries that require multi-hop reasoning , "what are the downstream impacts of changing this API?"

### RAG (Retrieval-Augmented Generation)

RAG is a technique where a language model's response is augmented with retrieved context. Instead of relying solely on the model's training data, RAG fetches relevant documents from a knowledge base and includes them in the prompt. This reduces hallucinations and keeps responses grounded in factual data.

We use llamaIndex to orchestrate RAG pipelines. When a query needs document context, llamaIndex handles retrieval, reranking, and injection into the prompt.

### Reranking

Reranking takes an initial set of retrieved results and reorders them based on relevance. The first retrieval stage (vector search) is fast but approximate. Reranking is slower but more accurate. A common pattern is: retrieve top-20 with vector search, then rerank to get top-5.

---

## Routing & Orchestration

### State Machine

A state machine is a model of computation where the system moves through a finite set of states based on inputs. In our context, each query enters a state machine that determines its routing path: cache lookup → complexity evaluation → model selection → response generation.

LangGraph implements our state machine. Each node in the graph represents a state, and edges represent transitions based on conditions (cache hit/miss, complexity score, etc.).

### Deterministic Routing

Deterministic routing means the same input always produces the same output path. If a query is classified as "simple," it always routes to the SLM , not sometimes to the frontier model. This predictability is critical for debugging, testing, and maintaining consistent cost behavior.

### Complexity Evaluation

Complexity evaluation is the process of determining how difficult a query is. Our system uses a small model to assess whether a query requires simple pattern matching (route to SLM) or multi-step reasoning (escalate to frontier). The evaluation considers factors like query length, domain specificity, and structural requirements.

---

## Infrastructure

### Containerization

Containerization packages an application and its dependencies into a lightweight, portable unit (container). Docker is the standard tool. Containers ensure the application runs identically in development, testing, and production.

We containerize every service , FastAPI, vLLM, Qdrant, Redis , using Docker. Multi-stage builds keep image sizes small by separating build-time dependencies from runtime dependencies.

### Async (Asynchronous)

Asynchronous programming allows the system to handle multiple operations concurrently without blocking. When FastAPI sends a request to vLLM, it doesn't wait for the response , it continues handling other requests. When the response arrives, FastAPI picks it up.

This is critical for our gateway. A single query might involve embedding, cache lookup, model inference, and response storage. Without async, each step would block the next, and throughput would collapse.

### Server-Sent Events (SSE)

SSE is a protocol for streaming data from server to client over HTTP. Instead of waiting for the complete response, the client receives tokens as they're generated. This improves perceived latency , the user sees output immediately, even if the full response takes seconds.

---

## Metrics & Monitoring

### Latency

Latency is the time between sending a request and receiving a response. We track multiple latency metrics:

- **Time-to-first-token (TTFT)** , How long until the first token appears
- **Inter-token latency** , Time between subsequent tokens
- **End-to-end latency** , Total request time

Our target is < 100ms for cached responses and < 500ms for SLM responses.

### Throughput

Throughput is the number of requests the system can handle per second. vLLM's continuous batching and PagedAttention maximize throughput by keeping GPUs fully utilized.

### Cache Hit Rate

Cache hit rate is the percentage of queries served from cache. Higher cache hit rate means more cost savings. Our target is > 40% for repetitive query workloads.

### Cost Per Query

Cost per query is the total inference cost divided by the number of queries. This includes embedding cost, cache lookup cost, and model inference cost. Our target is > 60% reduction compared to routing everything to the frontier model.

---

**Next:** [Problem Statement →](/scope/problem)

**Related:** [Scope →](/scope/) | [Architecture →](/idea/architecture)
