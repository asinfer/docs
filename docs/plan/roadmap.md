# Roadmap

> Weekly and monthly targets. Complete each benchmark perfectly.

## Month 1 — Foundation + Semantic Cache

### Week 1: Infrastructure

| Target | Done |
|--------|------|
| Repository setup | ⬜ |
| VitePress documentation | ⬜ |
| Python API skeleton | ⬜ |
| SystemState defined | ⬜ |
| Basic embedding service | ⬜ |

### Week 2: Vector + Retrieval

| Target | Done |
|--------|------|
| Vector DB integration | ⬜ |
| Basic retrieval working | ⬜ |
| Similarity search validated | ⬜ |

### Week 3: Semantic Cache

| Target | Done |
|--------|------|
| Store query embeddings | ⬜ |
| Store responses | ⬜ |
| Cache threshold experiment | ⬜ |
| Cache hit/miss metrics | ⬜ |

### Week 4: Cache Benchmark

| Target | Done |
|--------|------|
| Latency benchmark (cache path) | ⬜ |
| Cache threshold sweep (0.80-0.98) | ⬜ |
| Document benchmark results | ⬜ |

---

## Month 2 — SLM Router + Complexity Eval

### Week 5: SLM Integration

| Target | Done |
|--------|------|
| Tiny SLM integration | ⬜ |
| SLM response path working | ⬜ |
| Basic complexity evaluator | ⬜ |

### Week 6: Routing Policy

| Target | Done |
|--------|------|
| Routing policy defined | ⬜ |
| Complexity scoring validated | ⬜ |
| SLM confidence scoring | ⬜ |

### Week 7: SLM Benchmark

| Target | Done |
|--------|------|
| SLM accuracy benchmark | ⬜ |
| SLM latency benchmark | ⬜ |
| SLM vs no-routing baseline | ⬜ |
| Document benchmark results | ⬜ |

### Week 8: Integration Test

| Target | Done |
|--------|------|
| Cache → SLM path end-to-end | ⬜ |
| Error handling validated | ⬜ |
| Latency budget validated (<100ms) | ⬜ |

---

## Month 3 — Frontier Escalation + Knowledge Loop

### Week 9: Frontier Integration

| Target | Done |
|--------|------|
| Frontier model integration | ⬜ |
| Escalation policy defined | ⬜ |
| SLM → Frontier path working | ⬜ |

### Week 10: Knowledge Compression

| Target | Done |
|--------|------|
| Response compression | ⬜ |
| Embedding generation | ⬜ |
| Knowledge write-back to vector DB | ⬜ |
| Learning loop validated | ⬜ |

### Week 11: Full System Benchmark

| Target | Done |
|--------|------|
| End-to-end latency benchmark | ⬜ |
| Cost benchmark (full pipeline) | ⬜ |
| Quality benchmark (accuracy) | ⬜ |
| Cache hit rate measurement | ⬜ |

### Week 12: Benchmark Documentation

| Target | Done |
|--------|------|
| All benchmarks published | ⬜ |
| Results documented with methodology | ⬜ |
| Reproducible benchmark scripts | ⬜ |

---

## Month 4 — Public Proof

### Week 13-14: Open Source

| Target | Done |
|--------|------|
| Micro-tools released | ⬜ |
| GitHub repositories public | ⬜ |
| README + docs polished | ⬜ |

### Week 15-16: Competition + FOSS

| Target | Done |
|--------|------|
| Hackathon participation | ⬜ |
| FOSS contributions | ⬜ |
| Technical articles published | ⬜ |

---

## Month 5-6 — Production

### Week 17-20: Production Hardening

| Target | Done |
|--------|------|
| Authentication | ⬜ |
| Rate limiting | ⬜ |
| Observability | ⬜ |
| API versioning | ⬜ |

### Week 21-24: Launch

| Target | Done |
|--------|------|
| Security review | ⬜ |
| SLA definitions | ⬜ |
| Production deployment | ⬜ |
| Developer onboarding docs | ⬜ |

---

## Benchmark Completion Path

Each benchmark follows:

```text
Define Metric
    │
    ▼
Set Target
    │
    ▼
Implement Test
    │
    ▼
Run Benchmark
    │
    ▼
Document Results
    │
    ▼
Publish
```

### Benchmark Targets

| Metric | Target | Month |
|--------|--------|-------|
| Cache hit rate | > 40% | Month 1 |
| SLM handling rate | > 30% | Month 2 |
| Cached response latency | < 100ms | Month 1 |
| Full pipeline latency | < 500ms | Month 3 |
| Cost reduction vs frontier | > 60% | Month 3 |
| Quality maintenance | > 90% accuracy | Month 3 |

---

**Next:** [Milestones →](/plan/milestones)

**Related:** [Deep Anchor →](/plan/deep-anchor) | [Start Over →](/start-over/)
