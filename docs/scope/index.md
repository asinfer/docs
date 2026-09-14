# Scope

> Tech domains and their integration points.

## Integration Map

```text
                    ┌───────────────────┐
                    │     Agentic AI    │
                    └─────────┬─────────┘
                              │
           ┌──────────────────┼──────────────────┐
           │                   │                  │
           ▼                   ▼                  ▼
        Retrieval         Orchestration        MLOps
           │                   │                  │
           └─────────────┬─────┴──────────────────┘
                         │
                         ▼
                 Efficient Inference
                         │
                         ▼
                   Vector Systems
                         │
                         ▼
                      DevOps
                         │
                         ▼
                  Production API
```

## Domains

| Domain | What It Covers |
|--------|----------------|
| [Inference Optimization](/area/inference) | Embedding, quantization, batching, caching, routing |
| [Knowledge Retrieval](/area/retrieval) | Semantic search, similarity, reranking, hybrid retrieval |
| [Vector Databases](/area/vector-databases) | Indexing (HNSW/IVF/PQ), metrics, sharding, compression |
| [Agentic Systems](/area/agentic-systems) | State machines, decision trees, tool use, memory |
| [Orchestration](/area/orchestration) | Pipelines, retries, circuit breaking, load balancing |
| [MLOps](/area/mlops) | Versioning, serving, monitoring, A/B testing |
| [DevOps](/area/devops) | CI/CD, containers, IaC, observability |
| [GraphQL](/area/graphql) | Schema design, resolvers, subscriptions |

## Core Question

> **How much intelligence can be avoided while preserving answer quality?**

---

**Next:** [Problem Statement →](/scope/problem)

**Related:** [Technology Reference →](/area/) | [Architecture →](/idea/architecture)
