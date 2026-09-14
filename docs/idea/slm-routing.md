# SLM Routing

> Classify complexity. Route to the right model.

## The Idea

When the cache misses, the query needs actual inference. But not all inference is equal. A simple lookup question doesn't need GPT-4. A complex multi-step analysis can't be handled by a 7B parameter model. The SLM routing layer evaluates each query and sends it to the right destination.

The SLM is the first real intelligence layer in the pipeline. It's not just answering questions, it's making decisions. It classifies queries as simple, structural, or complex, and routes accordingly.

## How It Works

```text
                Request
                   │
                   ▼
             Complexity Eval
              /            \
             /              \
           LOW              HIGH
            │                │
            ▼                ▼
        SLM Response    Frontier Model
```

When a query enters the SLM routing layer, it gets scored on a scale of 1-6. The score determines where the query goes next.

## What the SLM Decides

Simple queries (score 1-3) get answered directly by the SLM. These are questions like "what is X?", "summarize this paragraph", or "classify this text." The SLM can handle them without help.

Structural queries (score 4-5) need relationship traversal. The SLM detects that the query involves dependencies, hierarchies, or causal chains. It handles these by accessing Neo4j, traversing the knowledge graph, and composing an answer from the relationships it finds.

Complex queries (score 6) escalate to the frontier model. These require deep reasoning, multi-step logic, or domain expertise that the SLM can't provide. The SLM recognizes its limits and escalates rather than returning a wrong answer.

## Evaluation Signals

The SLM considers multiple signals when scoring: reasoning depth (how many steps required), number of operations needed, domain complexity (is this specialized knowledge?), and its own confidence. If the SLM is unsure about any of these, it biases toward escalation. Better to pay for the frontier model than to return incorrect information.

## Why an SLM for Routing

Using a frontier model to route queries defeats the purpose. The routing layer itself needs to be cheap. An SLM like Mistral 7B or Phi-3 can evaluate complexity in under 50 milliseconds at a fraction of the cost. The routing decision is simple enough that a small model handles it well.

---

**Next:** [Frontier Escalation →](/idea/frontier-escalation)

**Related:** [Inference →](/product-ecosystem/inference)
