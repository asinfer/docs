# Non-Goals

> **Deep Anchor** - Research / Mastery / Systems

## What We Are NOT Building

We're building a semantic routing gateway, not another AI platform. Every tool we don't build is a tool we don't maintain, debug, or explain to users.

### New Foundation Models

Training or fine-tuning foundation models isn't our problem. Companies like OpenAI, Anthropic, and Meta already solve this. Our value is in *routing* to the right model, not creating new ones. Fine-tuning might enter the picture later for domain-specific distillation, but that's optimization , not core.

### General-Purpose Chatbots

The market is saturated with chat interfaces. We're not competing with ChatGPT or Claude's web UI. Our product is an API , a routing layer that makes existing models cheaper. The interface is someone else's problem.

### New Vector Databases

Qdrant, Pinecone, and Redis already work. Building a new vector store would distract from our core hypothesis: can intelligent routing cut costs by 60%? If existing databases don't fit, we'll contribute upstream or fork , not start from scratch.

### AI Agent Frameworks

LangGraph, AutoGen, and CrewAI already solve agent orchestration. We orchestrate agents using these tools. We don't build new frameworks for others to use.

### General-Purpose API Gateways

Kong, NGINX, and Traefik handle infrastructure routing. We handle *inference* routing , a different problem. Our gateway understands query complexity, not just HTTP methods and rate limits.

### Enterprise Platform Features

SSO, role-based access control, multi-tenancy, billing systems , these matter eventually. But building them before proving the core value is premature optimization. Start small, prove value, then scale.

---

**Next:** [Engineering Principles →](/scope/principles)

**Related:** [Roadmap →](/plan/roadmap)
