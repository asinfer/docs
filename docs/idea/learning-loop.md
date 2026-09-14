# Learning Loop

> Every expensive answer makes future answers cheaper.

## The Idea

The system improves over time. Every query that hits the frontier model gets compressed and stored. Next time a similar query arrives, it hits the cache. The more queries we process, the fewer queries need expensive inference.

This is the flywheel. Without it, every day starts from zero. With it, the system gets smarter with every query. The cache grows, the SLM handles more, and frontier usage drops.

## The Virtuous Cycle

```text
More queries
    │
    ▼
More cache hits
    │
    ▼
Less frontier use
    │
    ▼
Lower cost
    │
    ▼
More queries
```

The cycle is self-reinforcing. More queries mean more cache entries. More cache entries mean higher hit rates. Higher hit rates mean fewer frontier calls. Fewer frontier calls mean lower costs. Lower costs mean we can handle more queries. The loop closes.

## Knowledge Compression

When the frontier model answers, we don't just return the response and forget it. We extract the essential knowledge, embed it, and store it. The response becomes reusable intelligence.

```text
Frontier Model
      │
      ▼
Final Response
      │
      ▼
Compression
      │
      ▼
Embedding
      │
      ▼
Vector DB
```

The compression step is critical. Raw responses are often verbose, contain formatting, or include context that isn't useful for future queries. We extract the core information, the answer itself, and store that. This keeps the cache lean and relevant.

## The Long-Term View

```text
Query → Cache → SLM → Frontier → Compress → Vector DB → Query
                    ↑                              │
                    └──────────────────────────────┘
```

The loop closes. Expensive answers feed the cache. The cache feeds future answers. Cost drops over time. The system becomes more efficient with every query it processes.

## Why This Matters

Without the learning loop, cost is constant. Every query pays the same price regardless of how many times we've answered it before. With the learning loop, cost decreases over time. The system pays for itself.

---

**Next:** [Plan Overview →](/plan/)

**Related:** [Semantic Cache →](/idea/semantic-cache)
