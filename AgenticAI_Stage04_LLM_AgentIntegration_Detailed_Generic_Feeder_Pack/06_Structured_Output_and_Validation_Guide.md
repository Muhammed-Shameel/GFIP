# Structured Output and Validation Guide

## Why Structured Output Matters

LLM output must be usable by the application.

Do not accept free-form text where the system expects structured data.

## Example Generic Schema

```json
{
  "agent_name": "string",
  "mode": "llm_assisted",
  "summary": "string",
  "observations": ["string"],
  "recommendation": "string",
  "confidence": 0.0,
  "risks": ["string"],
  "missing_information": ["string"],
  "should_fallback": false
}
```

## Validation Requirements

| Validation | Required |
|---|---|
| Valid JSON | Yes |
| Required fields present | Yes |
| Confidence within range | Yes |
| No protected fields changed | Yes |
| Missing data handled | Yes |
| Output length reasonable | Yes |
| Fallback triggered if invalid | Yes |

## Protected Fields

These should not be changed by LLM unless the stage explicitly allows replacement and validation.

| Field | Default Rule |
|---|---|
| Deterministic score | Protected |
| Risk category | Protected |
| Ranking | Protected |
| Final action | Protected |
| Audit ID | Protected |
| Price/calculation | Protected |
| Compliance decision | Protected |

## Fallback Logic

```text
Run LLM node.
Validate JSON.
If valid → use LLM output.
If invalid → use deterministic fallback.
Record fallback reason.
Continue graph.
```

## Validation Output

Every LLM node should return:

```json
{
  "llm_used": true,
  "provider": "mock/gemini/groq/ollama/huggingface",
  "model": "model-name",
  "validation_status": "passed/failed",
  "fallback_used": false,
  "fallback_reason": null
}
```
