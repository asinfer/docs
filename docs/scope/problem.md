# Problem Statement

> **Deep Anchor** - Research / Mastery / Systems

## The Problem

Most AI systems use the most expensive model to answer every request. This is wasteful.

```text
Current State:
┌─────────────────────────────────────┐
│  User Query                         │
│       │                             │
│       ▼                             │
│  Frontier Model (GPT-4, Claude)     │
│       │                             │
│       ▼                             │
│  Response                           │
└─────────────────────────────────────┘

Cost: $0.01 - $0.10 per query
Latency: 500ms - 2000ms
```

## Why It Matters

| Factor | Impact |
|--------|--------|
| Cost | Organizations spend millions on unnecessary inference |
| Latency | Users wait for expensive models when cheap ones suffice |
| Sustainability | Unnecessary compute wastes energy |
| Scalability | High per-query costs limit growth |

## The Insight

> **Most requests do not require the most expensive model available.**

Consider a user asking "What is the capital of France?" This does not require GPT-4. A simple lookup or tiny model can answer it.

## What We're Building

A system that intelligently routes requests:

```text
Request Complexity
       │
       ▼
┌──────────────────┐
│   Cache Layer    │ ← Check if answer exists
├──────────────────┤
│   SLM Layer      │ ← Use small model for simple tasks
├──────────────────┤
│   Frontier Layer │ ← Only for complex reasoning
└──────────────────┘
```

## Success Criteria

The project succeeds when:

- [ ] Cache hit rate > 40% for repetitive queries
- [ ] SLM handles > 30% of requests without frontier model
- [ ] Average latency < 100ms for cached responses
- [ ] Cost per query reduced by > 60%
- [ ] Quality maintained within acceptable bounds

---

**Next:** [Non-Goals →](/scope/non-goals)

**Related:** [Architecture →](/idea/architecture) | [Semantic Cache →](/idea/semantic-cache)
