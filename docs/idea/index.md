# Idea

> What we're building. What we provide. The product.

## Product Statement

**Headless Hyper-Efficient API** — An inference system that spends intelligence only where intelligence is necessary.

## What We Provide

A production API that:

1. **Routes queries** through a hierarchy of increasingly expensive intelligence
2. **Caches semantically** — reuses previous answers for similar queries
3. **Evaluates complexity** — decides if a small model can answer or if a frontier model is needed
4. **Learns over time** — every expensive answer makes future answers cheaper

## What We Build

```text
┌─────────────────────────────────────────┐
│         Headless Hyper-Efficient API    │
├─────────────────────────────────────────┤
│                                         │
│  Semantic Cache    → Free answers       │
│  SLM Router        → Cheap answers      │
│  Frontier Escalation → Expensive only   │
│  Knowledge Loop    → Learn from spend   │
│                                         │
└─────────────────────────────────────────┘
```

## How It Works

```text
User Query
    │
    ▼
Fast Embedding
    │
    ▼
Vector DB
    │
    ┌──────────┴──────────┐
    │                     │
    ▼                     ▼
Close Match           No Match
    │                     │
    ▼                     ▼
Cached Answer        Tiny SLM / Cloud SLM
                          │
                          ▼
                     Complexity
                       Eval
                  ┌──────┴──────┐
                  │             │
                 Low           High
                  │             │
                  ▼             ▼
              SLM Answer    Frontier Model
                                │
                                ▼
                         Compress / Embed
                                │
                                ▼
                           Vector DB
```

## Intelligence Hierarchy

| Level | Model | Cost | Latency | Use Case |
|-------|-------|------|---------|----------|
| 1 | Cache | Free | < 5ms | Repeated queries |
| 2 | Retrieval | Low | < 20ms | Similar queries |
| 3 | SLM | Low | < 100ms | Simple reasoning |
| 4 | Frontier | High | 500ms+ | Complex reasoning |

## Core Mechanisms

| Mechanism | Purpose |
|-----------|---------|
| [Semantic Cache](/idea/semantic-cache) | Reuse previous answers |
| [State Machine](/idea/state-machine) | Track execution |
| [SLM Routing](/idea/slm-routing) | Classify complexity |
| [Frontier Escalation](/idea/frontier-escalation) | Handle complex queries |
| [Learning Loop](/idea/learning-loop) | Improve over time |

## The Goal

> **Spend intelligence only where intelligence is necessary.**

Not:
> "Use a smaller model."

But:
> **Use the minimum amount of intelligence required to produce a sufficiently correct answer.**

## Success Metric

```text
Useful Answers
───────────────────────
Compute + Latency + Cost
```

---

**Next:** [Architecture →](/idea/architecture)

**Related:** [Problem Statement →](/scope/problem) | [Engineering Principles →](/scope/principles)
