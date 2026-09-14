# Semantic Cache

> Reuse previous answers.

## The Idea

Most queries are repetitive. "What is the capital of France?" gets asked millions of times. "Summarize this document" appears in thousands of sessions. Running inference for every instance is wasteful. The answer already exists, we just need to find it.

Traditional caching matches exact strings. "What is the capital of France?" and "What's the capital of France?" are different strings with the same meaning. Semantic caching matches meaning, not characters. We embed the query into a vector, search our vector store for similar vectors, and if the cosine similarity exceeds 0.92, we return the cached response.

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

The embedding step converts text into a 384-dimensional vector using sentence-transformers. This takes less than 10 milliseconds on CPU. The vector captures semantic meaning, paraphrases produce similar vectors even though the text is different.

The vector goes to Redis, which stores previous query-response pairs with their embeddings. Redis performs a cosine similarity search in under 2 milliseconds. If the top result exceeds our threshold, we return it immediately. The user gets a response in under 100 milliseconds total, faster than any model could generate it.

## The Threshold

0.92 is our starting point. It's not a permanent constant, it's an experimental value we'll tune based on real data.

The threshold controls a trade-off. Too low (0.85) means false positives, queries that are semantically different get matched, and users get wrong answers. Too high (0.98) means missed cache hits, similar queries don't match, and we pay for inference unnecessarily.

The goal is to find the Pareto frontier where latency, cost, quality, and cache hit rate balance. We'll run experiments at 0.85, 0.90, 0.92, 0.95, and 0.98 to find the optimal point for our query distribution.

## Cache Invalidation

Cached responses can't live forever. Stale data is worse than no data. We use time-based expiration combined with access patterns:

High-value queries (accessed > 10 times in 24 hours) stay for 7 days. These are clearly useful, people keep asking them. Medium-value queries (2-9 accesses) stay for 24 hours. One-off queries expire in an hour.

This prevents cache pollution. A single random query doesn't squat in the cache forever. But a query that keeps getting asked earns its place.

---

**Next:** [State Machine →](/idea/state-machine)

**Related:** [Vector Storage →](/product-ecosystem/vector-databases) | [Glossary: Cosine Similarity →](/scope/glossary)
