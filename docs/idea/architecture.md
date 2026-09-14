# Architecture

> How the system fits together.

## Overview

```text
                       CLIENT
                         │
                         ▼
                 GraphQL / REST API
                         │
                         ▼
                  Request Gateway
                         │
                         ▼
                 Fast Embedding
                         │
                         ▼
                    Vector DB
                         │
              ┌──────────┴──────────┐
              │                     │
          CACHE HIT              CACHE MISS
              │                     │
              ▼                     ▼
        Cached Response           Tiny SLM
                                      │
                                      ▼
                               Complexity Eval
                                  │       │
                                 LOW     HIGH
                                  │       │
                                  ▼       ▼
                                 SLM   Frontier
                                          │
                                          ▼
                                      Compress
                                          │
                                          ▼
                                      Vector DB
```

## Components

| Component | Purpose |
|-----------|---------|
| API Gateway | Handle incoming requests |
| Embedding Service | Generate query embeddings |
| Vector DB | Store and search embeddings |
| Cache Layer | Store previous responses |
| SLM Router | Classify query complexity |
| Frontier Handler | Manage expensive inference |
| Knowledge Compressor | Extract reusable knowledge |

## Data Flow

```text
1. Client sends query
2. Gateway validates and routes
3. Embedding service generates vector
4. Vector DB searches for similar queries
5. If similarity > threshold:
   - Return cached response
6. Else:
   - SLM evaluates complexity
   - If complexity < threshold:
     - SLM generates response
   - Else:
     - Frontier model generates response
   - Compress and store response
7. Return response to client
```

## State Management

Each request maintains explicit state:

```python
class SystemState(BaseModel):
    user_query: str
    query_embedding: Optional[list[float]] = None
    cache_hit: bool = False
    closest_match_id: Optional[str] = None
    similarity_score: float = 0.0
    cached_response: Optional[str] = None
    eval_reasoning: Optional[str] = None
    final_response: str = ""
    execution_source: str = "Pending"
    latency_ms: float = 0.0
```

## API Surface

### REST

```text
POST /v1/query      # Execute query
POST /v1/embed      # Generate embedding
POST /v1/evaluate   # Evaluate complexity
POST /v1/retrieve   # Search knowledge base

GET /v1/health      # Health check
GET /v1/stats       # System statistics
GET /v1/metrics     # Performance metrics
```

### GraphQL

```graphql
type Query {
  execute(query: String!): ExecutionResult
  health: HealthStatus
  stats: SystemStats
}
```

---

**Next:** [Semantic Cache →](/idea/semantic-cache)

**Related:** [Problem Statement →](/scope/problem) | [Technology Reference →](/area/)
