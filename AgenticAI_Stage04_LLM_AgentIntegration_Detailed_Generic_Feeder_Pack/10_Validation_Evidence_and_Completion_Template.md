# Validation, Evidence and Completion Template

## Validation Checklist

| No. | Validation Item | Expected Result | Status |
|---:|---|---|---|
| 1 | Deterministic endpoint works | No regression | Pending |
| 2 | LangGraph endpoint works | No regression | Pending |
| 3 | LLM provider adapter works | Mock or real provider responds | Pending |
| 4 | Selected LLM agent runs | Structured output returned | Pending |
| 5 | LLM output validates | Schema validation passes | Pending |
| 6 | Invalid output fallback works | Deterministic fallback used | Pending |
| 7 | No protected field changed unexpectedly | Baseline comparison passed | Pending |
| 8 | LLM trace/audit captured | Provider/model/validation/fallback visible | Pending |
| 9 | UI shows LLM-assisted mode | Demo is explainable | Pending |
| 10 | Latest Repomix generated | Attached | Pending |

## Comparison Table

| Area | Deterministic Output | LangGraph Output | LLM-Assisted Output | Acceptable? | Notes |
|---|---|---|---|---|---|
| Final recommendation |  |  |  | Yes/No |  |
| Score/risk/rank |  |  |  | Yes/No |  |
| Agent observations |  |  |  | Yes/No |  |
| Explanation quality |  |  |  | Yes/No |  |
| Structured output validity |  |  |  | Yes/No |  |
| Fallback behavior |  |  |  | Yes/No |  |
| Audit trace |  |  |  | Yes/No |  |

## Evidence Required

| Evidence | Required |
|---|---|
| Deterministic API response | Yes |
| LangGraph API response | Yes |
| LLM-assisted API response | Yes |
| LLM prompt contract | Yes |
| Structured output schema | Yes |
| Validation/fallback evidence | Yes |
| UI screenshot showing LLM-assisted mode | Yes |
| Provider/model configuration without secrets | Yes |
| Latest Repomix | Yes |
| Known limitations | Yes |

## Completion Summary

```text
Stage 4 LLM Agent Integration is complete.
Selected agent nodes were enhanced or powered by LLM using a free/low-cost or mock provider.
The LLM output is structured and validated.
Deterministic fallback is preserved.
The deterministic, LangGraph and LLM-assisted outputs were compared.
The demo now shows how LLM fits inside an Agentic AI workflow without becoming a chatbot.
```
