# SLM Routing

> Classify complexity. Route to the right model.

## Concept

If no sufficiently similar answer exists, the system routes to a Small Language Model (SLM).

## How It Works

```text
Vector DB
    │
    ▼
Tiny SLM
```

The SLM acts as the first intelligence layer.

## SLM Responsibilities

| Task | Description |
|------|-------------|
| Classify complexity | Determine if query is simple or complex |
| Answer simple requests | Handle straightforward questions |
| Route requests | Direct to appropriate model |
| Summarize | Condense information |
| Rewrite queries | Transform for better retrieval |
| Determine retrieval strategy | Choose how to find information |
| Identify escalation | Determine if frontier model is needed |

## Complexity Evaluation

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

## Evaluation Signals

| Signal | Description |
|--------|-------------|
| Reasoning depth | How many steps required |
| Number of operations | How many actions needed |
| Retrieval requirements | How much context needed |
| Ambiguity | How unclear is the query |
| Domain complexity | How specialized is the topic |
| Expected answer length | How long will the answer be |
| Confidence | How sure is the SLM |
| Tool requirements | What tools are needed |
| Mathematical complexity | How much math is involved |

## SLM Selection

| Criteria | Weight |
|----------|--------|
| Latency | High |
| Quality | Medium |
| Cost | Medium |
| Size | Low |

## Routing Logic

```python
class SLMRouter:
    def route(self, query: str, context: str) -> RoutingDecision:
        complexity = self.evaluate_complexity(query, context)
        
        if complexity < self.threshold:
            return RoutingDecision(
                model="slm",
                reason="low_complexity"
            )
        else:
            return RoutingDecision(
                model="frontier",
                reason="high_complexity"
            )
```

---

**Next:** [Frontier Escalation →](/idea/frontier-escalation)

**Related:** [Inference Optimization →](/area/inference) | [State Machine →](/idea/state-machine)
