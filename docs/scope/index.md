# Scope

> Tech domains, tools, and integration points.

## Core Question

> **How much intelligence can be avoided while preserving answer quality?**

For term definitions, see [Technical Glossary →](/scope/glossary)

---

## Usage Constraints

We're bootstrapped. Every tool must have a free tier or be self-hosted.

| Constraint | Implication |
|------------|-------------|
| No GPU budget at start | Ollama for dev, vLLM self-hosted for prod |
| Free tier vector DB | Qdrant cloud free, Redis self-hosted |
| Free CI/CD | GitHub Actions (public repos) |
| No managed services | Everything runs in Docker on a single machine initially |

---

## Domains

### AI Engineering

This is where the core inference work happens. We need to serve LLMs at scale without burning cash on GPU time.

**vLLM** is our primary inference engine. It implements PagedAttention, a memory management technique that lets us handle hundreds of concurrent requests on a single GPU by treating KV-cache like virtual memory pages. This is critical for our routing layer where we need to spin up small models on demand without wasting memory. We dig into their docs on continuous batching and prefix caching to squeeze out maximum throughput.

- Docs: https://docs.vllm.ai/
- Free tier: Self-hosted (open source, Apache 2.0)
- Key pages: PagedAttention, Continuous Batching, Prefix Caching

**Ollama** runs locally during development. It wraps llama.cpp and lets us test model behavior on consumer hardware before deploying to GPU clusters. Free, fast iteration cycle. We read their model library docs to understand quantization formats and parameter counts.

- Docs: https://github.com/ollama/ollama/blob/main/docs/README.md
- Free tier: Fully free (open source, MIT)
- Key pages: Model Library, Quantization Formats, API Reference

**TensorRT-LLM** is for production-grade optimization. NVIDIA's engine applies FP8/INT4 quantization and kernel-level batching that vLLM alone can't match. We study their quantization guides to understand when INT4 degrades quality versus when it's safe.

- Docs: https://nvidia.github.io/TensorRT-LLM/
- Free tier: Self-hosted (open source, Apache 2.0)
- Key pages: Quantization Guide, Benchmarks, Getting Started

**sentence-transformers** generates embeddings locally , no API cost, no latency penalty. We use it to embed queries for our semantic cache. The key insight is that embedding quality directly determines cache hit rate, so we benchmark different models (all-MiniLM, e5-large) against our query distribution.

- Docs: https://www.sbert.net/docs/
- Free tier: Fully free (open source, Apache 2.0)
- Key pages: Pretrained Models, Training, Semantic Search

---

### Vector Storage

This is the memory layer. Every query that hits a frontier model should become reusable knowledge stored here.

**Qdrant** is our primary vector database. Written in Rust, it's fast and has a generous free tier. We use HNSW indexing for sub-millisecond similarity search and metadata filtering to narrow results by domain or recency. We read their filtering docs to understand pre-filter vs post-filter trade-offs.

- Docs: https://qdrant.tech/documentation/
- Free tier: 1GB storage, 1M vectors, 10K queries/month on cloud
- Key pages: Filtering, HNSW Indexing, Performance Tuning

**Redis** doubles as our semantic cache layer. When a query arrives, we embed it and check Redis for cosine similarity > 0.92. If found, we return instantly. Redis's in-memory speed means this check adds < 2ms latency.

- Docs: https://redis.io/docs/
- Free tier: Self-hosted (open source, BSD)
- Key pages: RediSearch Vector Commands, TTL, Pub/Sub

**Neo4j** stores knowledge graphs. When the SLM detects that a query involves relationships (dependencies, hierarchies, causal chains), it writes the structure to Neo4j. This lets us answer complex queries by traversing relationships instead of re-inferring from scratch. We study GraphRAG patterns to understand when graph traversal beats vector search.

- Docs: https://neo4j.com/docs/
- Free tier: Aura free tier , 50K nodes, 175K relationships, 1 graph
- Key pages: Cypher Queries, Graph Data Modeling, APOC Procedures

---

### Routing & Orchestration

This is the decision-making layer. It determines how queries flow through the system.

**LangGraph** implements our state machine routing. Each query enters a graph with nodes for cache lookup, complexity evaluation, model selection, and response generation. The graph is deterministic , same query type always follows the same path. We read their state machine docs to understand how to handle branching logic and error recovery.

- Docs: https://langchain-ai.github.io/langgraph/
- Free tier: Fully free (open source, MIT)
- Key pages: State Machines, Persistence, Human-in-the-Loop

**LangChain** builds composable routing chains. When the semantic cache misses, LangChain decides whether to route to a small model or escalate to a frontier model. We use their chain abstraction to implement fallback logic and error handling.

- Docs: https://python.langchain.com/docs/
- Free tier: Fully free (open source, MIT)
- Key pages: LCEL, Chains, Routing, Fallbacks

---

### API & Backend

This is the gateway. Every query enters here and exits here.

**FastAPI** is our async Python web framework. It handles request routing, validation, and streaming. We chose it for its async performance , critical when we're making multiple model calls per query , and its auto-generated OpenAPI docs which save us from maintaining separate API documentation.

- Docs: https://fastapi.tiangolo.com/
- Free tier: Fully free (open source, MIT)
- Key pages: Async, WebSocket, Background Tasks, Dependency Injection

**Pydantic** validates every request and response. Type safety catches errors at the boundary before they propagate into the system. We define schemas for query inputs, model outputs, and routing decisions.

- Docs: https://docs.pydantic.dev/
- Free tier: Fully free (open source, MIT)
- Key pages: V2 Migration, Validators, Settings Management

**httpx** communicates with model backends asynchronously. When we need to call vLLM, Ollama, or external APIs, httpx manages the connections without blocking the event loop.

- Docs: https://www.python-httpx.org/
- Free tier: Fully free (open source, BSD)
- Key pages: Async Client, Timeouts, Connection Pooling

**SSE-starlette** streams responses to clients. Instead of waiting for the full response, users see tokens as they're generated. This matters for perceived latency , a streaming response feels faster even if total time is identical.

- Docs: https://github.com/sysid/sse-starlette
- Free tier: Fully free (open source, MIT)
- Key pages: EventSourceResponse, Client Integration

---

### DevOps

This is the deployment and monitoring layer. It keeps everything running and tells us when it's broken.

**Docker** containerizes the entire system. Every service , FastAPI, vLLM, Qdrant, Redis , runs in containers. This ensures development environments match production. We use multi-stage builds to keep image sizes small.

- Docs: https://docs.docker.com/
- Free tier: Docker Desktop free for small teams (< 250 employees, < $10M revenue)
- Key pages: Multi-stage Builds, Compose, Networking

**GitHub Actions** automates testing and deployment. Every push triggers linting, type checking, and integration tests. Free for public repos, which fits our bootstrapped model.

- Docs: https://docs.github.com/en/actions
- Free tier: 2,000 minutes/month for public repos (unlimited)
- Key pages: Matrix Testing, Caching, Secrets Management

**Prometheus** collects metrics. Query latency, cache hit rates, model inference times, cost per request , everything gets measured. Without measurement, optimization is guesswork.

- Docs: https://prometheus.io/docs/
- Free tier: Fully free (open source, Apache 2.0)
- Key pages: PromQL, Recording Rules, Alerting Rules

**Grafana** visualizes those metrics. Dashboards show real-time system health and historical trends. When cache hit rate drops, we see it immediately.

- Docs: https://grafana.com/docs/
- Free tier: Cloud free tier , 10K metrics, 50GB logs, 50GB traces
- Key pages: Dashboard Variables, Annotations, Alerting

---

## Architecture

```text
                              ┌─────────────────────────────────┐
                              │         Prometheus              │
                              │    (metrics collection)         │
                              └───────────────┬─────────────────┘
                                              │
                                              ▼
┌──────────┐    ┌──────────────────────────────────────────────────────────┐
│  Client  │───▶│                     FastAPI Gateway                     │
└──────────┘    │  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
                │  │ Pydantic │  │  httpx   │  │   SSE    │              │
                │  │(validate)│  │ (async)  │  │(streaming│              │
                │  └──────────┘  └──────────┘  └──────────┘              │
                └───────────────────────────┬──────────────────────────────┘
                                            │
                                            ▼
                ┌───────────────────────────────────────────────────────────┐
                │               sentence-transformers                      │
                │              (embed query → vector)                      │
                └───────────────────────────┬───────────────────────────────┘
                                            │
                                            ▼
                ┌───────────────────────────────────────────────────────────┐
                │                    Redis / Qdrant                        │
                │              (semantic cache lookup)                     │
                │           cosine similarity > 0.92 ?                    │
                └──────────┬────────────────────────────┬──────────────────┘
                           │                            │
                      HIT  │                            │ MISS
                           ▼                            ▼
                ┌──────────────────┐    ┌───────────────────────────────────┐
                │ Return cached    │    │         LangGraph                 │
                │ response (<10ms) │    │    (complexity evaluation)        │
                └──────────────────┘    └─────────────┬─────────────────────┘
                                                      │
                                    ┌─────────────────┼─────────────────┐
                                    │                 │                 │
                                    ▼                 ▼                 ▼
                           ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
                           │  Simple?    │  │ Structural? │  │  Complex?   │
                           │  SLM via    │  │  SLM +      │  │  Frontier   │
                           │  vLLM       │  │  Neo4j      │  │  Model API  │
                           └──────┬──────┘  └──────┬──────┘  └──────┬──────┘
                                  │                │                │
                                  ▼                ▼                ▼
                           ┌──────────────────────────────────────────────┐
                           │         Store response in Redis/Qdrant      │
                           │         + Neo4j if structural knowledge     │
                           └──────────────────────────────────────────────┘
```

---

**Next:** [Problem Statement →](/scope/problem)

**Related:** [Technology Reference →](/product-ecosystem/) | [Architecture →](/idea/architecture)
