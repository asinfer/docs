# Lessons Learned

> **Research / Mastery / Systems**

## Purpose

Document key lessons from failures and experiments.

## Lesson Template

### Lesson: [Title]

**Context:**
> [When/where this applies]

**Lesson:**
> [What we learned]

**Evidence:**
> [How we know this]

**Application:**
> [How to apply this]

---

## Core Lessons

### 1. Measure Before Optimizing

**Context:** Any performance optimization

**Lesson:** Without measurement, optimization is guesswork.

**Evidence:** Multiple experiments where we optimized the wrong thing.

**Application:** Always establish baselines before changing anything.

---

### 2. Cache Threshold is Workload-Dependent

**Context:** Semantic cache implementation

**Lesson:** The optimal similarity threshold depends on your specific workload.

**Evidence:** Testing on different datasets showed different optimal thresholds.

**Application:** Don't hardcode thresholds. Make them configurable and adaptive.

---

### 3. Real Workloads Differ from Theory

**Context:** SLM routing design

**Lesson:** Theoretical analysis of query complexity doesn't match real-world distributions.

**Evidence:** SLM handling rate was lower than predicted.

**Application:** Test with real data early and often.

---

### 4. Failure is Information

**Context:** Any experiment

**Lesson:** Failed experiments are not wasted effort. They provide valuable information.

**Evidence:** Many breakthroughs came from analyzing failures.

**Application:** Document failures thoroughly. They are as valuable as successes.

---

### 5. Simplicity Wins

**Context:** Architecture decisions

**Lesson:** Simple solutions often outperform complex ones.

**Evidence:** Complex routing logic was slower and less reliable than simple heuristics.

**Application:** Start simple. Add complexity only when measured and necessary.

---

### 6. Public Proof Beats Private Claims

**Context:** Building credibility

**Lesson:** Evidence is more persuasive than assertions.

**Evidence:** Open-source projects and published benchmarks attracted more interest than claims.

**Application:** Build in public. Share results. Publish benchmarks.

---

## Lesson Categories

| Category | Count |
|----------|-------|
| Architecture | 3 |
| Optimization | 2 |
| Process | 1 |
| Communication | 1 |

---

**Next:** [Next Iteration →](/start-over/next-iteration)

**Related:** [Failure Analysis →](/start-over/failure) | [Engineering Principles →](/scope/principles)
