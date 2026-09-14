# Vector Databases

> **Deep Anchor** - Research / Mastery / Systems

## Overview

Vector databases store and query embeddings at scale.

## Research Topics

| Topic | Description |
|-------|-------------|
| Indexing strategies | HNSW, IVF, PQ, Flat |
| Similarity metrics | Cosine, Euclidean, Dot Product |
| Filtering | Pre-filter vs post-filter |
| sharding | Distributing data across nodes |
| Replication | Ensuring high availability |
| Consistency | Balancing freshness and speed |
| Storage compression | Reducing memory footprint |
| Batch operations | Bulk insert/update/delete |

## Indexing Strategies

| Strategy | Pros | Cons |
|----------|------|------|
| Flat | Perfect accuracy | Slow at scale |
| IVF | Good balance | Requires training |
| HNSW | Fast queries | High memory |
| PQ | Low memory | Lossy compression |

## Similarity Metrics

```text
Cosine Similarity:
  sim(A, B) = (A · B) / (||A|| × ||B||)
  
  Range: [-1, 1]
  Use when: Direction matters, magnitude doesn't

Euclidean Distance:
  dist(A, B) = sqrt(Σ(Ai - Bi)²)
  
  Range: [0, ∞)
  Use when: Magnitude matters

Dot Product:
  dot(A, B) = Σ(Ai × Bi)
  
  Range: (-∞, ∞)
  Use when: Both direction and magnitude matter
```

## Vector DB Selection Criteria

| Factor | Weight |
|--------|--------|
| Query latency | High |
| Accuracy | High |
| Scalability | Medium |
| Cost | Medium |
| Ease of use | Low |

## Integration Points

```text
Query
  │
  ▼
Embedding Service
  │
  ▼
Vector DB
  │
  ├──→ Cache Layer
  │
  └──→ Retrieval Layer
```

---

**Next:** [Agentic Systems →](/area/agentic-systems)

**Related:** [Knowledge Retrieval →](/area/retrieval) | [Semantic Cache →](/idea/semantic-cache)
