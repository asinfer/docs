# Knowledge Retrieval

> **Deep Anchor** - Research / Mastery / Systems

## Overview

The retrieval layer is the heart of the system.

## Research Topics

| Topic | Description |
|-------|-------------|
| Semantic similarity | Measuring meaning overlap |
| Approximate nearest neighbor | Efficient vector search |
| Vector indexing | Organizing embeddings for fast lookup |
| Metadata filtering | Combining vector and attribute search |
| Hybrid retrieval | Mixing search strategies |
| Reranking | Improving result order |
| Query rewriting | Transforming user queries |
| Embedding compression | Reducing storage requirements |
| Retrieval confidence | Measuring result quality |
| Semantic cache invalidation | Managing cache freshness |

## Retrieval Pipeline

```text
User Query
    │
    ▼
Query Embedding
    │
    ▼
Vector Search
    │
    ▼
Candidate Results
    │
    ▼
Reranking
    │
    ▼
Final Results
```

## Similarity Thresholds

| Threshold | Behavior |
|-----------|----------|
| > 0.95 | High confidence match |
| 0.90 - 0.95 | Likely match |
| 0.85 - 0.90 | Possible match |
| < 0.85 | No match |

## Retrieval Strategies

### 1. Vector Search Only

Simple cosine similarity search.

### 2. Hybrid Search

Combine vector search with keyword matching.

### 3. Metadata-Filtered Search

Filter results by attributes before similarity comparison.

### 4. Multi-Stage Retrieval

Retrieve candidates, then rerank with a more expensive model.

## Quality Metrics

| Metric | Description |
|--------|-------------|
| Recall@K | Percentage of relevant results in top-K |
| MRR | Mean reciprocal rank |
| NDCG | Normalized discounted cumulative gain |
| Latency | Time to retrieve results |

---

**Next:** [Vector Databases →](/area/vector-databases)

**Related:** [Semantic Cache →](/idea/semantic-cache) | [Experiments →](/start-over/)
