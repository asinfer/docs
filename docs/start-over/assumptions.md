# Broken Assumptions

> **Research / Mastery / Systems**

## Purpose

Document assumptions that were proven wrong.

## Assumption Template

### Assumption: [Statement]

**Date Made:** YYYY-MM-DD

**Evidence At Time:**
> [Why we believed it]

**How It Was Broken:**
> [What proved it wrong]

**Impact:**
> [What changed]

**Lesson:**
> [What we learned]

---

## Example Assumptions

### Assumption: 0.92 is the optimal similarity threshold

**Date Made:** 2024-01-15

**Evidence At Time:**
> Initial experiments showed good results at 0.92

**How It Was Broken:**
> Testing on different datasets showed threshold should be adaptive

**Impact:**
> Had to implement dynamic threshold adjustment

**Lesson:**
> Optimal parameters depend on workload characteristics

---

### Assumption: SLM can handle 50% of queries

**Date Made:** 2024-01-20

**Evidence At Time:**
> Theoretical analysis suggested most queries are simple

**How It Was Broken:**
> Real-world queries were more complex than expected

**Impact:**
> Had to adjust routing logic and thresholds

**Lesson:**
> Real workloads differ from theoretical models

---

### Assumption: Cache hit rate will be high

**Date Made:** 2024-01-25

**Evidence At Time:**
> Many queries are repetitive in production

**How It Was Broken:**
> Query distribution was more diverse than expected

**Impact:**
> Had to invest more in SLM and frontier paths

**Lesson:**
> Understand your workload before optimizing

---

## Active Assumptions

| Assumption | Status | Evidence |
|------------|--------|----------|
| Embedding latency < 10ms | Unverified | TBD |
| SLM quality sufficient | Unverified | TBD |
| Cache invalidation works | Unverified | TBD |

---

**Next:** [Lessons Learned →](/start-over/lessons)

**Related:** [Failure Analysis →](/start-over/failure) | [Experiments →](/start-over/)
