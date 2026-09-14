# Problem Statement

> **Deep Anchor** - Research / Mastery / Systems

## The Problem

Companies are bleeding cash on API calls. Every query , whether it's "summarize this document" or "what is 2+2" , hits the same expensive frontier model. There's no differentiation between trivial and complex requests. The bill keeps growing, and there's no architectural reason for it.

Most AI systems treat every request as if it requires the most powerful model available. This is wasteful. A lookup question doesn't need GPT-4. A simple rephrasing doesn't need Claude. But without a routing layer, every query pays the same price.

## The Solution

An API that sits between the user's query and the inference backend. A semantic router and distillation gateway.

The core idea is simple: use embedding models to form low-latency caches, and route simple queries to cheap small language models. Only the queries that actually require complex reasoning hit the frontier model.

When a query arrives, we embed it and check our vector store. If we've seen something similar before (cosine similarity > 0.92), we return the cached response instantly. If not, we evaluate complexity. Simple queries get routed to a small, cheap model. Structural queries , ones that require mapping relationships or updating knowledge , get handled by the SLM with access to our knowledge graph. Only genuinely complex reasoning reaches the frontier model.

## The Pitch

> **Our API will cut your LLM Cloud spend by 60%. Without dropping your accuracy by a single percent.**

This isn't about sacrificing quality. It's about intelligently distributing work. Most queries are repetitive or simple enough that a smaller model handles them perfectly. The expensive model only gets called when it's actually needed.

## Responsible Usage of AI

We can pass queries through domain experts using AI. But there are guardrails. AI acts as a junior developer , useful for boilerplate, FastAPI route definitions, Docker configurations, unit tests. Everything else is strictly handwritten. The same principle applies to our routing: AI handles the routine, humans handle the critical.

## How It Works

When a query enters the system, it follows a path based on complexity:

1. **Semantic Cache Check:** We embed the query and search our vector store. If cosine similarity exceeds 0.92 against a stored query, we return the cached response. This is instant , sub-100ms latency.

2. **Complexity Evaluation:** If no cache hit, a small language model evaluates whether the query requires structural mapping. Can it be answered with simple pattern matching, or does it need multi-step reasoning?

3. **SLM Routing:** Simple queries get routed to a small, cheap model. If the SLM determines the query requires structural knowledge , updating a knowledge graph, mapping database relationships , it handles that natively. It also compresses and stores the method to learn from the database indefinitely.

4. **Frontier Escalation:** Only genuinely complex queries reach the expensive frontier model. The response gets cached and stored for future requests.

## Success Criteria

- Cache hit rate > 40% for repetitive queries
- SLM handles > 30% of requests without the frontier model
- Average latency < 100ms for cached responses
- Cost per query reduced by > 60%
- Quality maintained within acceptable bounds , no accuracy drop

---

**Next:** [Non-Goals →](/scope/non-goals)

**Related:** [Architecture →](/idea/architecture) | [Semantic Cache →](/idea/semantic-cache)
