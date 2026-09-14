# State Machine

> Track execution through explicit states.

## The Idea

Every query follows a deterministic path. Same input, same path, every time. This isn't a suggestion, it's a guarantee. The state machine makes debugging possible, when something goes wrong, we know exactly where it happened and what transition failed.

Without a state machine, queries flow through the system opaquely. You see the input and output, but not what happened in between. With a state machine, every transition is logged, every state is tracked, and every decision is auditable.

## State Diagram

```text
PENDING
   │
   ▼
EMBEDDING
   │
   ▼
RETRIEVAL
   │
   ├─────────────── similarity >= threshold
   │                         │
   │                         ▼
   │                    CACHE HIT
   │                         │
   │                         ▼
   │                    FINAL RESPONSE
   │
   └─────────────── similarity < threshold
                            │
                            ▼
                       SLM ROUTING
                            │
                            ▼
                     COMPLEXITY EVAL
                      ┌─────┴─────┐
                      │           │
                     LOW         HIGH
                      │           │
                      ▼           ▼
                     SLM       FRONTIER
                      │           │
                      └─────┬─────┘
                            │
                            ▼
                        RESPONSE
                            │
                            ▼
                   COMPRESS / EMBED
                            │
                            ▼
                        VECTOR DB
```

## States

PENDING is the initial state, waiting to start. EMBEDDING generates the query vector. RETRIEVAL searches the cache. From there, the path splits:

If similarity exceeds the threshold, we hit CACHE HIT and jump to FINAL RESPONSE. Fast path, no inference.

If the cache misses, we enter SLM ROUTING. The SLM evaluates the query and moves to COMPLEXITY EVAL. Low complexity routes to SLM. High complexity routes to FRONTIER.

Both paths converge at RESPONSE, then COMPRESS/EMBED stores the result for future use, and VECTOR DB persists it.

## Why Determinism Matters

Non-deterministic routing is a nightmare to debug. If the same query sometimes routes to the SLM and sometimes to the frontier, you can't predict costs, you can't reproduce bugs, and you can't trust your benchmarks. Deterministic routing means same input always produces the same path. The only variable is the threshold, which we control.

## Observability

Each state transition is logged with timestamps. We track time per state, transition frequency, and error rates. This is how we know if the cache is slow, the SLM is underperforming, or the frontier escalation rate is too high.

---

**Next:** [SLM Routing →](/idea/slm-routing)

**Related:** [Architecture →](/idea/architecture)
