# Idea

> What we're building and why.

## The Core Idea

Most AI systems waste money. Every query , whether it's "what is 2+2" or "analyze this financial report" , hits the same expensive frontier model. There's no differentiation. The bill keeps growing, and there's no architectural reason for it.

We fix this by adding intelligence *before* inference. Our API sits between the user and the model. It doesn't just forward requests , it makes decisions. Should this query be answered from cache? Can a small model handle it? Or does it actually need the expensive model?

The result is a 60% cost reduction with no accuracy loss. Not because we use smaller models everywhere , but because we use the *minimum* intelligence required for each specific query.

## What We Build

```text
┌─────────────────────────────────────────┐
│         Frontier API                    │
├─────────────────────────────────────────┤
│                                         │
│  Semantic Cache    → Free answers       │
│  SLM Router        → Cheap answers      │
│  Frontier Escalation → Expensive only   │
│  Knowledge Loop    → Learn from spend   │
│                                         │
└─────────────────────────────────────────┘
```

Four mechanisms working together:

**Semantic Cache** checks if we've seen something similar before. If yes, return instantly , zero inference cost.

**SLM Router** evaluates query complexity. Simple questions go to a small, cheap model. The router is the decision-maker , it determines which model handles each query.

**Frontier Escalation** only happens when nothing cheaper can answer. The frontier model is an exception path, not the default.

**Knowledge Loop** ensures every expensive answer makes future answers cheaper. When the frontier model responds, we compress and store the result. Next time a similar query arrives, it hits cache instead.

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
Cached Answer        Tiny SLM
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

The flow is a hierarchy. Every query starts at the cheapest option and escalates only when necessary. Most queries never leave the first two levels.

## Intelligence Hierarchy

**Level 1 , Cache (Free, < 5ms):** If we've seen something similar (cosine similarity > 0.92), return the cached response. No model involved. No inference cost. This handles repetitive queries , the same question asked by different users or the same user asking again.

**Level 2 , Retrieval (Low cost, < 20ms):** If the query needs context from documents, we retrieve relevant chunks and let a small model answer with that context. This is cheaper than raw inference because the model has the information it needs , no hallucination, no guessing.

**Level 3 , SLM (Low cost, < 100ms):** For straightforward questions that don't need retrieval , simple reasoning, classification, summarization , a small language model handles it. Models like Mistral 7B or Phi-3 cost 10-100x less than frontier models.

**Level 4 , Frontier (High cost, 500ms+):** Only queries that require deep reasoning, multi-step logic, or domain expertise reach here. This is GPT-4, Claude 3.5, Gemini Ultra. The expensive option. Most queries should never see this layer.

## The Goal

> **Spend intelligence only where intelligence is necessary.**

This isn't about using smaller models everywhere. It's about understanding what each query actually needs. A lookup question doesn't need GPT-4. A simple rephrasing doesn't need Claude. But a complex analysis might need both. The system figures this out automatically.

## Success Metric

```text
Useful Answers
────────────────────────────
Compute + Latency + Cost
```

We measure usefulness per unit of compute, latency, and cost. If we can answer the same question cheaper and faster without losing accuracy, we win.

---

**Next:** [Architecture →](/idea/architecture)

**Related:** [Problem Statement →](/scope/problem) | [Engineering Principles →](/scope/principles)
