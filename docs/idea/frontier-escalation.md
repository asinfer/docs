# Frontier Escalation

> Handle complex queries with expensive models.

## The Idea

The frontier model is an expensive exception path, not the default. Only queries that no cheaper model can handle reach here. This is where the 60% cost savings come from, most queries never touch this layer.

If every query hit the frontier model, we'd be no different from a direct API call. The value of our system is in keeping queries away from this layer. The frontier is there for when nothing else works.

## When We Escalate

The SLM escalates to the frontier model under specific conditions:

Complexity score exceeds the threshold. The SLM evaluated the query and determined it needs more reasoning capacity than it can provide. This might be multi-step logic, domain expertise, or nuanced analysis.

Confidence is low. The SLM isn't sure about its own answer. Rather than guessing, it escalates. This is a safety mechanism, wrong answers are more expensive than expensive answers.

Domain requires deep expertise. Some queries need specialized knowledge that a 7B parameter model simply doesn't have. Medical, legal, financial, or technical analysis often falls into this category.

Multi-step reasoning is needed. Queries that require chaining multiple inferences, comparing options, or building arguments step by step. The SLM can handle single-step reasoning, but complex chains need the frontier model's capacity.

## After Inference

The frontier response doesn't just go to the user. It gets compressed, embedded, and stored. This is the learning loop in action. Next time a similar query arrives, it hits the cache, not the frontier model.

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

The compression step extracts the essential knowledge from the response. Not the full response, but the key information that would help answer similar questions in the future. This compressed knowledge gets embedded and stored in the vector database.

## Cost Management

Rate limiting prevents runaway costs. If a user sends 1000 queries that all escalate to the frontier, we need to cap that. Budgets set spending limits per user or per time period. Quality gates ensure the frontier model is actually needed, we don't escalate trivially.

The goal is to keep frontier usage below 30% of total queries. If it goes higher, we're either routing poorly or the threshold needs adjustment.

---

**Next:** [Learning Loop →](/idea/learning-loop)

**Related:** [SLM Routing →](/idea/slm-routing)
