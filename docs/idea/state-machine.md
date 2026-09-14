# State Machine

> **Deep Anchor** - Research / Mastery / Systems

## Concept

The API maintains explicit execution state through a state machine.

## State Diagram

```text
PENDING
   │
   ▼
EMBEDDING
   │
   ▼
RETRIEVAL
   │
   ├─────────────── similarity >= threshold
   │                         │
   │                         ▼
   │                    CACHE HIT
   │                         │
   │                         ▼
   │                    FINAL RESPONSE
   │
   └─────────────── similarity < threshold
                            │
                            ▼
                       SLM ROUTING
                            │
                            ▼
                     COMPLEXITY EVAL
                      ┌─────┴─────┐
                      │           │
                     LOW         HIGH
                      │           │
                      ▼           ▼
                     SLM       FRONTIER
                      │           │
                      └─────┬─────┘
                            │
                            ▼
                        RESPONSE
                            │
                            ▼
                   COMPRESS / EMBED
                            │
                            ▼
                        VECTOR DB
```

## State Definitions

| State | Description |
|-------|-------------|
| PENDING | Initial state, waiting to start |
| EMBEDDING | Generating query embedding |
| RETRIEVAL | Searching for similar queries |
| CACHE HIT | Found similar query in cache |
| SLM ROUTING | Evaluating query complexity |
| COMPLEXITY EVAL | Determining complexity level |
| SLM | Processing with small language model |
| FRONTIER | Processing with frontier model |
| RESPONSE | Generating final response |
| COMPRESS / EMBED | Storing knowledge for future use |
| VECTOR DB | Writing to vector database |

## State Transitions

```python
class StateMachine:
    def __init__(self):
        self.state = "PENDING"
    
    def transition(self, event: str):
        transitions = {
            "PENDING": "EMBEDDING",
            "EMBEDDING": "RETRIEVAL",
            "RETRIEVAL": {
                "cache_hit": "CACHE HIT",
                "cache_miss": "SLM ROUTING"
            },
            "SLM ROUTING": "COMPLEXITY EVAL",
            "COMPLEXITY EVAL": {
                "low": "SLM",
                "high": "FRONTIER"
            },
            "SLM": "RESPONSE",
            "FRONTIER": "RESPONSE",
            "CACHE HIT": "FINAL RESPONSE",
            "RESPONSE": "COMPRESS / EMBED",
            "COMPRESS / EMBED": "VECTOR DB",
            "VECTOR DB": "FINAL RESPONSE"
        }
        
        if isinstance(transitions.get(self.state), dict):
            self.state = transitions[self.state][event]
        else:
            self.state = transitions[self.state]
```

## State Tracking

Each state transition is recorded:

```python
class StateTransition:
    from_state: str
    to_state: str
    event: str
    timestamp: float
    duration_ms: float
```

## Observability

Track state machine behavior:

- State distribution
- Transition frequency
- Time per state
- Error rates per state

---

**Next:** [SLM Routing →](/idea/slm-routing)

**Related:** [Agentic Systems →](/area/agentic-systems) | [Architecture →](/idea/architecture)
