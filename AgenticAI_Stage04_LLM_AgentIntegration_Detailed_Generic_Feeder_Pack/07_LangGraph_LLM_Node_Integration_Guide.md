# LangGraph LLM Node Integration Guide

## Purpose

This guide explains how LLM fits inside the Stage 3 LangGraph workflow.

## Before LLM

```text
START
→ Deterministic Agent Node
→ Deterministic Agent Node
→ Recommendation Node
→ Audit Node
→ END
```

## After LLM Integration

```text
START
→ Deterministic Context Node
→ LLM-backed Agent Node
→ Deterministic Validation Node
→ Recommendation/Fallback Node
→ Audit Node
→ END
```

## Recommended Node Pattern

```python
def llm_agent_node(state):
    context = build_safe_context(state)
    prompt = build_prompt(context)
    raw_output = llm_provider.generate(prompt)
    parsed = parse_json(raw_output)
    validation = validate_output(parsed)

    if not validation.ok:
        fallback = deterministic_agent.run(state)
        state["agent_outputs"].append(fallback)
        state["llm_trace"].append({
            "agent": "Example LLM Agent",
            "llm_used": True,
            "validation_status": "failed",
            "fallback_used": True,
            "fallback_reason": validation.error
        })
        return state

    state["agent_outputs"].append(parsed)
    state["llm_trace"].append({
        "agent": "Example LLM Agent",
        "llm_used": True,
        "validation_status": "passed",
        "fallback_used": False
    })
    return state
```

## Recommended Graph State Additions

| Field | Purpose |
|---|---|
| `llm_enabled` | Whether LLM mode is active |
| `llm_provider` | Provider used |
| `llm_trace` | LLM call summaries |
| `fallbacks` | Fallback records |
| `validation_results` | Schema/guardrail validation |
| `cost_observation` | Rough token/cost note if available |

## UI Demo Suggestion

In Agent Workflow Console, add:

```text
Mode: Deterministic / LangGraph / LLM-Assisted
```

For LLM-assisted mode, show:

- Which agents used LLM
- Provider/model
- Structured output
- Validation status
- Fallback used or not
- Final comparison
