# Inference Optimization

> **Deep Anchor** - Research / Mastery / Systems

## Overview

Low-latency inference is the foundation of the system.

## Research Topics

| Topic | Description |
|-------|-------------|
| Embedding latency | Time to generate embeddings |
| Model cold starts | Time to load models into memory |
| Batching | Grouping requests for efficiency |
| Quantization | Reducing model precision |
| Caching | Reusing previous computations |
| Speculative execution | Predicting next steps |
| Model routing | Directing queries to appropriate models |
| CPU vs GPU inference | Hardware selection |
| Memory locality | Data access patterns |
| Request coalescing | Combining similar requests |
| Asynchronous execution | Non-blocking operations |
| Streaming | Progressive response delivery |
| Token efficiency | Minimizing token usage |

## Key Questions

1. What is the minimum latency required for semantic routing?
2. When is an embedding lookup cheaper than model inference?
3. When does caching stop being useful?
4. What percentage of requests can be answered without an expensive model?

## Latency Budget

```text
Target: < 100ms for cached responses

Embedding:     ~10ms
Vector Search: ~5ms
Cache Lookup:  ~2ms
Response:      ~1ms
────────────────────
Total:         ~18ms
```

## Optimization Strategies

### 1. Embedding Caching

Cache frequently used embeddings to avoid recomputation.

### 2. Model Warm-up

Keep models loaded in memory to avoid cold starts.

### 3. Request Coalescing

Batch similar requests to amortize model invocation costs.

### 4. Speculative Execution

Pre-compute likely next steps while waiting for current results.

## Benchmark Targets

| Metric | Target | Current |
|--------|--------|---------|
| Embedding latency | < 10ms | TBD |
| Vector search | < 5ms | TBD |
| Cache lookup | < 2ms | TBD |
| Total p95 | < 100ms | TBD |

---

**Next:** [Knowledge Retrieval →](/area/retrieval)

**Related:** [Semantic Cache →](/idea/semantic-cache) | [Benchmarks →](/benchmarks/)
