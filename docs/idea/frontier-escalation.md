# Frontier Escalation

> **Deep Anchor** - Research / Mastery / Systems

## Concept

Only difficult requests should reach the frontier model.

```text
                     Request
                        │
                        ▼
                    Tiny SLM
                        │
                        ▼
                 Complexity Score
                        │
                  > threshold
                        │
                        ▼
                 Frontier Model
```

## The Frontier Model

> **An expensive exception path.**

Not the default path.

## When to Escalate

| Condition | Action |
|-----------|--------|
| Complexity > threshold | Escalate to frontier |
| SLM confidence < threshold | Escalate to frontier |
| Domain requires expertise | Escalate to frontier |
| Multi-step reasoning required | Escalate to frontier |

## Escalation Policy

```python
class EscalationPolicy:
    def should_escalate(self, state: SystemState) -> bool:
        # Check complexity score
        if state.complexity_score > self.complexity_threshold:
            return True
        
        # Check SLM confidence
        if state.slm_confidence < self.confidence_threshold:
            return True
        
        # Check domain expertise
        if state.requires_expertise:
            return True
        
        return False
```

## Frontier Model Integration

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

## Cost Management

| Strategy | Description |
|----------|-------------|
| Rate limiting | Limit frontier requests |
| Cost budgets | Set spending limits |
| Quality gates | Ensure frontier is worth it |
| Fallback | Handle frontier failures |

## Quality Assurance

Validate frontier responses:

- Accuracy check
- Relevance check
- Completeness check
- Safety check

---

**Next:** [Learning Loop →](/idea/learning-loop)

**Related:** [SLM Routing →](/idea/slm-routing) | [Cost Benchmarks →](/benchmarks/)
