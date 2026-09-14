# Inference Optimization

> **Reference** - Technology Domain

## Topics

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

## Benchmark Targets

| Metric | Target | Current |
|--------|--------|---------|
| Embedding latency | < 10ms | TBD |
| Vector search | < 5ms | TBD |
| Cache lookup | < 2ms | TBD |
| Total p95 | < 100ms | TBD |

---

**Related:** [Semantic Cache →](/idea/semantic-cache) | [Benchmarks →](/benchmarks/)
