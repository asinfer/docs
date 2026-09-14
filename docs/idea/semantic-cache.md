# Semantic Cache

> **Deep Anchor** - Research / Mastery / Systems

## Principle

> **A request should not automatically trigger model inference.**

First ask:
> "Have we already solved something sufficiently similar?"

## How It Works

```text
Query
  │
  ▼
Embedding
  │
  ▼
Vector Search
  │
  ▼
Similarity Score
  │
  ├── > 0.92 ──► Cached Response
  │
  └── < 0.92 ──► Intelligence Pipeline
```

## Cache Threshold

The threshold `0.92` is an initial experimental value.

It should **NOT** be treated as a permanent constant.

## Threshold Research

The system should experimentally determine the optimal threshold:

```text
Similarity Threshold
        │
        ├── 0.80
        ├── 0.85
        ├── 0.90
        ├── 0.92
        ├── 0.95
        └── 0.98
```

## For Each Threshold, Measure

| Metric | Description |
|--------|-------------|
| Cache hit rate | Percentage of queries answered from cache |
| False-positive rate | Incorrect cache hits |
| Answer quality | Accuracy of cached responses |
| Latency | Response time |
| Cost | Compute cost |
| Model invocation rate | Percentage requiring model inference |

## The Pareto Frontier

Find the optimal balance between:

```text
Latency
Cost
Quality
Cache Hit Rate
```

## Cache Implementation

```python
class SemanticCache:
    def __init__(self, threshold: float = 0.92):
        self.threshold = threshold
        self.vector_db = VectorDB()
    
    def lookup(self, query_embedding: list[float]) -> Optional[CachedResponse]:
        results = self.vector_db.search(query_embedding, top_k=1)
        
        if results and results[0].score > self.threshold:
            return results[0].response
        
        return None
    
    def store(self, query_embedding: list[float], response: str):
        self.vector_db.insert(query_embedding, response)
```

## Cache Invalidation

Strategies for keeping cache fresh:

| Strategy | Description |
|----------|-------------|
| TTL | Expire after time period |
| LRU | Evict least recently used |
| Size limit | Evict when cache is full |
| Semantic drift | Invalidate when data changes |

---

**Next:** [State Machine →](/idea/state-machine)

**Related:** [Knowledge Retrieval →](/area/retrieval) | [Experiments →](/start-over/)
