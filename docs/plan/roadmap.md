# Roadmap

> Monthly and bi-weekly targets. Complete each benchmark perfectly.

## Present to October: Learning Phase

This phase focuses on mastering AI Engineering related tools. Either Architecture, RAG, or Optimizations. Graph-based or Session-based State Architecture to handle complex, multi-turn agent conversations. Advanced RAG pipelines featuring hybrid search, custom reranking, or metadata filtering to minimize hallucinations. Latency Optimization using quantized models or structured output optimization to prove code is ready for real-world traffic.

This phase includes personal mini projects and researching the above three categories. Before testing them in hackathons.

### Bi-Week 1-2: Foundation

- [ ] Repository setup with Python API skeleton
- [ ] VitePress documentation site live
- [ ] Docker Compose configuration for local dev
- [ ] GitHub Actions CI/CD pipeline
- [ ] SystemState model defined (Pydantic)
- [ ] Basic embedding service with sentence-transformers
- [ ] Read vLLM docs: PagedAttention, continuous batching, prefix caching

### Bi-Week 3-4: Vector Storage + Cache

- [ ] Qdrant integration with HNSW indexing
- [ ] Basic retrieval working (semantic search)
- [ ] Similarity search validated
- [ ] Redis semantic cache layer with RediSearch
- [ ] Cache threshold experiment: test 0.85, 0.90, 0.92, 0.95, 0.98
- [ ] Cache hit/miss metrics implemented
- [ ] Read Qdrant filtering docs (pre-filter vs post-filter)

### Bi-Week 5-6: Routing + State Machine

- [ ] LangGraph state machine implementation
- [ ] Complexity evaluator with SLM (Mistral 7B or Phi-3)
- [ ] Routing policy defined: simple (1-3), structural (4-5), complex (6)
- [ ] SLM confidence scoring
- [ ] Deterministic routing validated (same input, same path)
- [ ] Read LangGraph state machine docs
- [ ] Read LangChain LCEL, chains, routing, fallbacks

### Bi-Week 7-8: Integration

- [ ] Cache to SLM path end-to-end
- [ ] Error handling: retry with backoff, fail fast, circuit breaker
- [ ] Latency budget validated (< 100ms cached, < 500ms SLM)
- [ ] FastAPI gateway with Pydantic validation
- [ ] SSE streaming with SSE-starlette
- [ ] Read llamaIndex advanced RAG patterns
- [ ] Read llamaIndex hybrid search, metadata filtering, reranking

### Bi-Week 9-10: Model Serving

- [ ] vLLM integration for SLM serving
- [ ] Ollama local development workflow
- [ ] Benchmark: vLLM vs Ollama latency and throughput
- [ ] Basic benchmarks: cache latency, SLM accuracy
- [ ] Read Neo4j Cypher queries, graph data modeling
- [ ] Read Neo4j APOC procedures

### Bi-Week 11-12: Frontier + Learning Loop

- [ ] Frontier model integration (GPT-4 or Claude API)
- [ ] Escalation policy: complexity > threshold, confidence < threshold
- [ ] Knowledge compression: extract essential info from frontier responses
- [ ] Embedding generation for compressed knowledge
- [ ] Write-back to Redis/Qdrant + Neo4j if structural
- [ ] Learning loop validated: expensive answers become future cache hits
- [ ] Read GraphRAG patterns

### Research Topics

- [ ] vLLM V1 Architecture Evolution: Decoupling Front-End and Back-End Engines (Stoica et al., 2025)
- [ ] DuoAttention: Efficient Long-Context LLM Inference with Dual KV Cache (2024/2025)
- [ ] EAGLE-3: Speculative Decoding via Lightweight Draft Heads (NeurIPS)
- [ ] Model Context Protocol (MCP) (Anthropic/Open Source Initiative)

### Mini Projects

- [ ] Embedding benchmark: all-MiniLM-L6-v2 vs e5-large vs all-mpnet-base-v2
- [ ] Cache threshold sweep with documented results
- [ ] LangGraph state machine prototype with branching logic
- [ ] vLLM PagedAttention memory utilization test
- [ ] TensorRT-LLM quantization comparison: FP16 vs INT8 vs INT4

---

## October to November: Hackathon Phase

Reality checks of depth. We will occasionally go in only those seem valuable and harmonious to our projects. Participating in high-pressure hackathons to test the architecture under real constraints.

### Hackathons

**Build, Ship, Shape: Amazon Developer Hackathon**
- Focus: Intelligent applications and productivity tools using cloud workflows
- Deadline: October 23, 2026
- Goal: Showcase optimized LLM piping and agent architectures
- Our angle: Cost reduction API with semantic cache and SLM routing

**Nebius x NVIDIA Global AI Hackathon**
- Focus: Building the next frontier of AI on open, high-performance infrastructure
- Deadline: October 30, 2026
- Goal: Stress-test heavy ML deployments and optimization techniques
- Our angle: vLLM optimization, PagedAttention, quantization benchmarks

### Bi-Week 13-14 (Early October)

- [ ] Prepare hackathon project skeleton
- [ ] Core routing pipeline functional end-to-end
- [ ] Basic benchmarks documented (cache latency, SLM accuracy)
- [ ] Demo-ready API endpoint
- [ ] vLLM serving optimized for demo load
- [ ] Documentation polished for hackathon judges

### Bi-Week 15-16 (Late October)

- [ ] Participate in Amazon Hackathon (October 23)
- [ ] Participate in Nebius x NVIDIA Hackathon (October 30)
- [ ] Document lessons learned from each hackathon
- [ ] Identify architecture gaps revealed under pressure
- [ ] Redesign based on real-world feedback

### Live Events

- [ ] NVIDIA GTC (online attendance) , watch for vLLM and TensorRT announcements
- [ ] KubeCon CloudNativeCon India (online attendance) , infrastructure patterns
- [ ] Official YouTube events and talks , stay current on tooling updates

### Community

- [ ] Follow X (Twitter) AI engineering community
- [ ] Participate in Reddit r/LocalLLaMA, r/MachineLearning
- [ ] Join Discord channels for vLLM, LangChain, Qdrant
- [ ] No side-tracked research. Non-functional requirements would be outsourced after VC pitch.

---

## December to February: Production Phase

### Bi-Week 17-18

- [ ] Production hardening: authentication, rate limiting
- [ ] Observability: Prometheus metrics, Grafana dashboards
- [ ] API versioning
- [ ] Re-evaluate using benchmark savings and adjust architecture

### Bi-Week 19-20

- [ ] Security review
- [ ] SLA definitions
- [ ] Production deployment on AWS/GCP (free tier)
- [ ] Developer onboarding docs

### Bi-Week 21-22

- [ ] Open source micro-tools released
- [ ] GitHub repositories public
- [ ] Technical articles published

### Bi-Week 23-24

- [ ] All benchmarks published with methodology
- [ ] Reproducible benchmark scripts
- [ ] Final documentation polish

---

## March 2027: Launch

- [ ] Production API live
- [ ] VC-ready demo
- [ ] Public proof: hackathon wins, benchmarks, FOSS contributions

---

## Benchmark Targets

| Metric | Target | Phase |
|--------|--------|-------|
| Cache hit rate | > 40% | Learning |
| SLM handling rate | > 30% | Learning |
| Cached response latency | < 100ms | Learning |
| Full pipeline latency | < 500ms | Production |
| Cost reduction vs frontier | > 60% | Production |
| Quality maintenance | > 90% accuracy | Production |

---

**Next:** [Milestones →](/plan/milestones)

**Related:** [Deep Anchor →](/plan/deep-anchor) | [Start Over →](/start-over/)
