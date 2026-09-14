# MLOps

> **Deep Anchor** - Research / Mastery / Systems

## Overview

MLOps operationalizes machine learning systems.

## Research Topics

| Topic | Description |
|-------|-------------|
| Model versioning | Tracking model versions |
| Model serving | Deploying models for inference |
| Model monitoring | Tracking model performance |
| Data pipelines | Managing training data |
| Feature stores | Serving features consistently |
| A/B testing | Comparing model versions |
| Rollback | Reverting to previous versions |

## MLOps Stack

```text
Training
    │
    ▼
Validation
    │
    ▼
Deployment
    │
    ▼
Serving
    │
    ▼
Monitoring
    │
    ▼
Feedback Loop
```

## Key Metrics

| Metric | Description |
|--------|-------------|
| Model latency | Time to generate predictions |
| Model accuracy | Quality of predictions |
| Model drift | Change in model performance over time |
| Data drift | Change in input data distribution |
| Throughput | Predictions per second |

## Deployment Strategies

### 1. Blue-Green

Two identical environments, swap traffic.

### 2. Canary

Gradually roll out to subset of traffic.

### 3. Shadow

Run new model alongside old, compare results.

---

**Next:** [DevOps →](/area/devops)

**Related:** [Orchestration →](/area/orchestration) | [Production →](/plan/olympus)
