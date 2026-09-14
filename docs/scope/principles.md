# Engineering Principles

> **Deep Anchor** - Research / Mastery / Systems

## Core Principles

These principles guide every engineering decision.

### 1. Measure Before Optimizing

**Principle:** No performance claim without a benchmark.

**Why:** Without measurement, optimization is guesswork.

**Application:**

```python
# Before optimizing, measure
latency = measure_latency(query)
cost = calculate_cost(query)
quality = evaluate_quality(query, response)

# Then optimize
if latency > threshold:
    optimize_latency()
```

**Trade-off:** Measurement adds overhead. But without it, you optimize the wrong things.

---

### 2. Cache Before Compute

**Principle:** Always ask whether the answer already exists.

**Why:** Cache hits are free. Compute is expensive.

**Application:**

```text
Query
  │
  ▼
Cache Lookup
  │
  ├── Hit → Return cached answer
  │
  └── Miss → Compute answer
```

**Trade-off:** Cache invalidation is hard. But the cost of recomputation is higher.

---

### 3. Cheap Intelligence Before Expensive Intelligence

**Principle:** Prefer the cheapest model that can answer correctly.

**Why:** Not all queries require frontier models.

**Hierarchy:**

```text
Cache (free)
  ↓
Retrieval (cheap)
  ↓
SLM (low cost)
  ↓
Frontier Model (expensive)
```

**Trade-off:** Quality may decrease with cheaper models. But most queries don't need high quality.

---

### 4. Every Expensive Computation Should Create Reusable Knowledge

**Principle:** Frontier inference should feed the knowledge layer.

**Why:** The system should improve over time.

**Application:**

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

**Trade-off:** Compression may lose information. But the benefit of reuse outweighs the loss.

---

### 5. Public Proof Beats Private Claims

**Principle:** Prefer evidence over assertions.

**Why:** Credibility comes from demonstration, not declaration.

**Application:**

```text
Prefer:
├── GitHub repositories
├── Published benchmarks
├── Open experiments
├── Hackathon wins
├── FOSS contributions
└── Production deployments

Over:
└── "I know this"
```

**Trade-off:** Public proof takes more effort. But it builds lasting credibility.

---

### 6. Simplicity Is a Performance Feature

**Principle:** Avoid unnecessary infrastructure.

**Why:** Every component adds latency, cost, and failure modes.

**Application:**

```text
Before adding a component:
1. Does it solve a real problem?
2. Can we solve it simpler?
3. Is the complexity justified?
```

**Trade-off:** Simplicity may limit features. But features without reliability are worthless.

---

### 7. Start Over Deliberately

**Principle:** A failed architecture should become documentation, not hidden history.

**Why:** Failure is information. Hiding it wastes learning.

**Application:**

```text
When something fails:
1. Document what happened
2. Analyze why it failed
3. Record what we learned
4. Revise the architecture
5. Start again with new knowledge
```

**Trade-off:** Starting over feels like waste. But continuing with a broken architecture is worse.

---

## Principle Hierarchy

```text
Measurement
    │
    ▼
Caching
    │
    ▼
Cheap Intelligence
    │
    ▼
Knowledge Reuse
    │
    ▼
Public Proof
    │
    ▼
Simplicity
    │
    ▼
Deliberate Restart
```

---

**Next:** [Technology Reference →](/area/)

**Related:** [Start Over →](/start-over/) | [Milestones →](/plan/milestones)
