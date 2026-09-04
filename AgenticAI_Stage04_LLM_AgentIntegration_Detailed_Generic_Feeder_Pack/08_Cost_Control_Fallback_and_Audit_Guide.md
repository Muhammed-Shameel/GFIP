# Cost Control, Fallback and Audit Guide

## Cost Control

| Control | Requirement |
|---|---|
| Prompt size | Keep context small |
| Max tokens | Set output cap |
| Temperature | Keep low for structured output |
| Provider | Use mock/local/free first |
| Retry count | Limit retries |
| Logging | Log metadata, not secrets |
| Batch demo | Use limited sample cases |

## Fallback Strategy

Every LLM-backed agent must have fallback.

| Failure | Fallback |
|---|---|
| Provider key missing | Mock or deterministic |
| Provider timeout | Deterministic |
| Invalid JSON | Deterministic |
| Schema validation failure | Deterministic |
| Unsafe output | Deterministic |
| Rate limit | Deterministic or retry once |

## Audit Fields

| Field | Purpose |
|---|---|
| `workflow_id` | Links to workflow run |
| `agent_name` | Which agent used LLM |
| `provider` | Provider name |
| `model` | Model name |
| `prompt_template_id` | Prompt version |
| `input_context_summary` | What was sent, summarized |
| `raw_output_available` | Yes/No, avoid storing sensitive raw if not needed |
| `parsed_output` | Structured output |
| `validation_status` | passed/failed |
| `fallback_used` | true/false |
| `fallback_reason` | reason if any |
| `created_at` | timestamp |

## Safety Statement

```text
The LLM-assisted mode is used for learning and demonstration.
It is not production-grade medical, legal, financial or hiring decision automation.
Outputs must be reviewed and validated.
```
