# Architecture

> How the system fits together.

## Overview

The system is a pipeline. A query enters at the top and exits at the bottom, but which path it takes depends on the decision nodes along the way. The architecture is designed so that most queries take the cheapest path.

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

## Data Flow

The query enters through the API gateway , FastAPI handles validation, rate limiting, and request parsing. It's immediately embedded using sentence-transformers. The embedding is a 384-dimensional vector that captures the semantic meaning of the query.

The vector goes to Redis for a fast cache lookup. If cosine similarity exceeds 0.92 against any stored query, we return the cached response. This takes less than 10 milliseconds. Most repetitive queries die here.

If the cache misses, the query enters the SLM routing layer. LangGraph's state machine evaluates complexity. The SLM scores the query from 1-6 based on reasoning depth, domain complexity, and confidence. Scores 1-3 route to the SLM for a cheap response. Scores 4-5 trigger structural evaluation , the SLM checks if the query involves relationships that need Neo4j traversal. Score 6 escalates to the frontier model.

Every response , cached, SLM, or frontier , gets embedded and stored. The frontier response gets extra compression to extract reusable knowledge. This feeds the learning loop: expensive answers become future cache hits.

## State Management

Each request carries explicit state through the pipeline. This is critical for debugging and observability. When something goes wrong , a slow response, a wrong answer, a failed routing decision , we can trace exactly which state it was in and what happened.

```python
class SystemState(BaseModel):
    user_query: str
    query_embedding: Optional[list[float]] = None
    cache_hit: bool = False
    similarity_score: float = 0.0
    cached_response: Optional[str] = None
    final_response: str = ""
    execution_source: str = "Pending"  # cache | slm | frontier
    latency_ms: float = 0.0
```

The state is immutable through most of the pipeline. Each node reads from it, makes a decision, and writes the result. The next node reads the updated state. This makes the system predictable , same input, same state transitions, same output.

## Why This Architecture

The hierarchy is the key insight. Traditional systems have one path: query → model → response. We have four paths, and the system automatically selects the cheapest one that can produce a correct answer.

The cache handles repetition. The SLM handles simplicity. The frontier handles complexity. And the learning loop ensures the system gets smarter over time , every expensive answer becomes a future cache hit.

---

**Next:** [Semantic Cache →](/idea/semantic-cache)

**Related:** [Problem Statement →](/scope/problem) | [Product Ecosystem →](/product-ecosystem/)
