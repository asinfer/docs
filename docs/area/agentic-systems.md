# Agentic Systems

> **Deep Anchor** - Research / Mastery / Systems

## Overview

Agentic systems maintain explicit execution state and make autonomous decisions.

## Research Topics

| Topic | Description |
|-------|-------------|
| State machines | Modeling execution states |
| Decision trees | Routing logic |
| Tool use | Invoking external capabilities |
| Memory | Short-term and long-term storage |
| Planning | Multi-step execution |
| Self-reflection | Evaluating own performance |
| Error recovery | Handling failures gracefully |

## State Machine Concept

```text
PENDING
   │
   ▼
EMBEDDING
   │
   ▼
RETRIEVAL
   │
   ├──→ CACHE HIT → FINAL RESPONSE
   │
   └──→ CACHE MISS → SLM ROUTING
                          │
                          ▼
                     COMPLEXITY EVAL
                      ┌─────┴─────┐
                     LOW         HIGH
                      │           │
                      ▼           ▼
                     SLM       FRONTIER
                      │           │
                      └─────┬─────┘
                            │
                            ▼
                        RESPONSE
                            │
                            ▼
                   COMPRESS / EMBED
                            │
                            ▼
                        VECTOR DB
```

## State Management

Each request carries explicit state:

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

## Decision Points

| Decision | Input | Output |
|----------|-------|--------|
| Cache hit? | Similarity score | Boolean |
| Escalate? | Complexity score | Boolean |
| Retry? | Error type | Boolean |

---

**Next:** [Orchestration →](/area/orchestration)

**Related:** [State Machine →](/idea/state-machine) | [Architecture →](/idea/architecture)
