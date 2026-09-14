# Core Idea

> **Deep Anchor** - Research / Mastery / Systems

## The Fundamental Principle

> **Do not use the most expensive model to answer every request.**

Instead, intelligently route requests through a hierarchy of increasingly expensive intelligence.

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

## Success Metric

```text
Useful Answers
───────────────────────
Compute + Latency + Cost
```

The goal is not:
> "Use a smaller model."

The goal is:
> **Use the minimum amount of intelligence required to produce a sufficiently correct answer.**

---

**Next:** [Architecture →](/idea/architecture)

**Related:** [Problem Statement →](/scope/problem) | [Engineering Principles →](/scope/principles)
