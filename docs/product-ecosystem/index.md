# Product Ecosystem

> Three pluggable products that combine into a single inference gateway.

## The Products

We build three independent plugins. Each solves a specific problem. Together, they form the Frontier API , a system that cuts LLM costs by 60% without accuracy loss.

```text
┌─────────────────────────────────────────────────────────────┐
│                      Frontier API                           │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Advanced   │  │  Knowledge   │  │  Inference   │      │
│  │    Router    │  │  Retrieval   │  │  Optimizer   │      │
│  │              │  │  (Pluggable) │  │  (Pluggable) │      │
│  │  (Pluggable) │  │              │  │              │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                 │                 │               │
│         └─────────────────┼─────────────────┘               │
│                           │                                 │
│                           ▼                                 │
│                   Single API Endpoint                       │
└─────────────────────────────────────────────────────────────┘
```

Each plugin is independently deployable. You can use the Router without Retrieval. You can use Inference Optimizer without the Router. The Frontier API combines all three for maximum value.

---

## Advanced Router

**Purpose:** Direct every query to the cheapest model that can answer it correctly.

The Router is the brain of the system. It decides *where* a query goes , not *how* it's answered.

### What It Does

When a query arrives, the Router evaluates its complexity and routes accordingly:

- **Cache hit** → Return cached response (< 10ms)
- **Simple query** → SLM via vLLM (50ms)
- **Structural query** → SLM with Neo4j traversal
- **Complex reasoning** → Frontier model API (200ms+)

### How It Works

The Router is a LangGraph state machine. Each node evaluates a condition and transitions to the next state deterministically , same input always produces the same path.

```text
Query
  │
  ▼
┌─────────────────┐
│ Embed Query     │ ← sentence-transformers generates vector
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Cache Lookup    │ ← Redis/Qdrant cosine similarity > 0.92
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
  HIT       MISS
    │         │
    ▼         ▼
┌────────┐  ┌─────────────────┐
│ Return │  │ Complexity Eval │ ← SLM scores 1-6
└────────┘  └────────┬────────┘
                     │
          ┌──────────┼──────────┐
          │          │          │
        1-3        4-5         6
          │          │          │
          ▼          ▼          ▼
       ┌─────┐  ┌────────┐  ┌─────────┐
       │ SLM │  │ SLM +  │  │ Frontier│
       │     │  │ Neo4j  │  │ Model   │
       └─────┘  └────────┘  └─────────┘
```

### Components Used

- **LangGraph** , State machine implementation
- **LangChain** , Fallback chains, model wrappers
- **sentence-transformers** , Query embedding for cache lookup
- **Redis** , In-memory semantic cache (< 2ms lookup)
- **Qdrant** , Persistent vector storage
- **Neo4j** , Knowledge graph for structural queries
- **FastAPI** , Request handling, async routing

### Pluggable Interface

```python
class RouterPlugin:
    def evaluate(self, query: str, embedding: list[float]) -> Route:
        """Return routing decision: cache, slm, structural, or frontier."""
        ...

    def fallback(self, query: str, error: Exception) -> Route:
        """Handle routing failures."""
        ...
```

---

## Knowledge Retrieval

**Purpose:** Augment queries with relevant context from your knowledge base.

Retrieval is the memory layer. It finds relevant documents, chunks, and relationships to inject into prompts , reducing hallucinations and keeping responses grounded.

### What It Does

When a query needs context beyond what the model knows, Retrieval:

1. Searches your knowledge base for relevant chunks
2. Reranks results by relevance
3. Injects top results into the prompt
4. Returns the augmented response

### How It Works

```text
Query
  │
  ▼
┌─────────────────────┐
│ Query Embedding     │ ← sentence-transformers
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│ Vector Search       │ ← Qdrant (semantic)
│ + Keyword Search    │ ← BM25 (exact match)
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│ Reranking           │ ← cross-encoder model
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│ Prompt Injection    │ ← top-5 chunks into context
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│ LLM Inference       │ ← augmented response
└─────────────────────┘
```

### Components Used

- **llamaIndex** , RAG pipeline orchestration
- **sentence-transformers** , Document and query embeddings
- **Qdrant** , Vector storage for document chunks
- **Neo4j** , Graph relationships for multi-hop retrieval
- **LangChain** , Prompt templates, chain composition

### Pluggable Interface

```python
class RetrievalPlugin:
    def retrieve(self, query: str, top_k: int = 5) -> list[Chunk]:
        """Fetch relevant chunks from knowledge base."""
        ...

    def augment(self, query: str, chunks: list[Chunk]) -> str:
        """Inject chunks into prompt context."""
        ...

    def index(self, document: Document) -> None:
        """Add document to knowledge base."""
        ...
```

### GraphRAG

When documents have complex relationships (dependencies, hierarchies), Retrieval uses Neo4j to traverse graph structures. This catches context that pure vector search misses , "what are all the services that depend on this API?" requires relationship traversal, not just similarity.

---

## Inference Optimizer

**Purpose:** Serve models faster and cheaper through quantization, batching, and caching.

The Optimizer handles the *how* of model serving. While the Router decides *where* a query goes, the Optimizer ensures that destination runs efficiently.

### What It Does

- Quantizes models to reduce memory and increase throughput
- Batches concurrent requests for GPU efficiency
- Caches KV-cache prefixes for repeated prompts
- Serves embeddings locally to eliminate API costs

### How It Works

```text
┌─────────────────────────────────────────────────┐
│              Inference Optimizer                 │
│                                                 │
│  ┌─────────────┐  ┌─────────────┐               │
│  │  vLLM       │  │  TensorRT   │               │
│  │  (dev/prod) │  │  (prod)     │               │
│  └──────┬──────┘  └──────┬──────┘               │
│         │                │                      │
│         └────────┬───────┘                      │
│                  │                              │
│         ┌────────┴────────┐                     │
│         │                 │                     │
│    ┌────▼────┐      ┌────▼────┐                 │
│    │ Paged   │      │ Quant   │                 │
│    │Attention│      │ization  │                 │
│    └─────────┘      └─────────┘                 │
│                                                 │
│  ┌─────────────────────────────────────────┐    │
│  │ sentence-transformers (embeddings)      │    │
│  └─────────────────────────────────────────┘    │
└─────────────────────────────────────────────────┘
```

### Components Used

- **vLLM** , Primary inference engine (PagedAttention, continuous batching)
- **TensorRT-LLM** , Production optimization (FP8/INT4 quantization)
- **Ollama** , Local development (CPU/Apple Silicon)
- **sentence-transformers** , Local embedding generation

### Pluggable Interface

```python
class InferencePlugin:
    def serve(self, prompt: str, model: str) -> str:
        """Run inference on specified model."""
        ...

    def embed(self, text: str) -> list[float]:
        """Generate embedding vector."""
        ...

    def optimize(self, model: str, format: str) -> None:
        """Quantize model for deployment."""
        ...
```

---

## How They Connect

The three plugins communicate through a shared interface. The Frontier API wires them together:

```python
class FrontierAPI:
    def __init__(self, router, retrieval, optimizer):
        self.router = router
        self.retrieval = retrieval
        self.optimizer = optimizer

    async def query(self, user_query: str) -> Response:
        # 1. Embed the query
        embedding = self.optimizer.embed(user_query)

        # 2. Route the query
        route = self.router.evaluate(user_query, embedding)

        # 3. Retrieve context if needed
        if route.needs_context:
            chunks = self.retrieval.retrieve(user_query)
            prompt = self.retrieval.augment(user_query, chunks)
        else:
            prompt = user_query

        # 4. Run inference
        response = self.optimizer.serve(prompt, route.model)

        # 5. Cache the response
        self.router.cache(user_query, embedding, response)

        return response
```

### Data Flow

```text
User Query
    │
    ▼
┌───────────────────────────────────────────────┐
│ Frontier API                                 │
│                                               │
│  1. InferenceOptimizer.embed(query)           │
│     └─▶ embedding vector                     │
│                                               │
│  2. AdvancedRouter.evaluate(query, embedding) │
│     └─▶ route decision                       │
│                                               │
│  3. KnowledgeRetrieval.retrieve(query)        │
│     └─▶ relevant chunks (if needed)          │
│                                               │
│  4. InferenceOptimizer.serve(prompt, model)   │
│     └─▶ model response                       │
│                                               │
│  5. AdvancedRouter.cache(query, response)     │
│     └─▶ stored for future hits               │
│                                               │
└───────────────────────────────────────────────┘
    │
    ▼
Response
```

### Independence

Each plugin works without the others:

| Combination | What Works |
|-------------|------------|
| Router only | Directs queries, no retrieval or optimization |
| Router + Retrieval | Routes with context, no optimization |
| Router + Optimizer | Routes and serves efficiently, no retrieval |
| Retrieval + Optimizer | Serves with context, no smart routing |
| All three | Full Frontier API , maximum cost savings |

---

## Tech Stack Summary

| Plugin | Core Tools | Supporting Tools |
|--------|-----------|------------------|
| Advanced Router | LangGraph, Redis, Qdrant | LangChain, sentence-transformers, Neo4j |
| Knowledge Retrieval | llamaIndex, Qdrant, Neo4j | sentence-transformers, LangChain |
| Inference Optimizer | vLLM, sentence-transformers | Ollama, TensorRT-LLM |

All three share:
- **FastAPI** , Async request handling
- **Docker** , Containerized deployment
- **Prometheus + Grafana** , Metrics and monitoring

---

**Next:** [Scope →](/scope/)
