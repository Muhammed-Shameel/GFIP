# Context and Prompt Contract Guide

## Context Rule

```text
Send selected shared context.
Do not send full database dumps.
```

## Approved Context

| Context | Allowed |
|---|---|
| Domain input summary | Yes |
| Existing graph state summary | Yes |
| Relevant agent outputs | Yes |
| Final deterministic score/recommendation if needed | Yes |
| Known limitations | Yes |
| Raw secret values | No |
| Full database dump | No |
| Sensitive personal data | Avoid/mask |
| Unverified facts | Avoid or label clearly |

## Prompt Contract

Every LLM-backed agent must have:

| Contract Item | Purpose |
|---|---|
| Agent role | Defines what this LLM agent does |
| Input context | Defines what it can use |
| Output schema | Defines structured output |
| Boundaries | Defines what it cannot change |
| Missing data rule | Prevents hallucination |
| Fallback rule | Explains what happens if invalid output |
| Cost limit | Keeps prompt small |

## Standard Prompt Skeleton

```text
You are [AGENT_NAME], an LLM-backed agent inside an Agentic AI workflow.

You will receive structured context from the LangGraph state.
Use only the provided context.
Do not invent missing facts.
If information is missing, set the relevant field to "not_available".

Task:
[AGENT_TASK]

Important boundaries:
- Do not change protected deterministic fields: [LIST]
- Do not create fake scores.
- Do not make final autonomous decision unless this agent is explicitly selected for recommendation and validation is enabled.
- Return only valid JSON matching the schema.

Input context:
[STRUCTURED_CONTEXT]

Output JSON schema:
[SCHEMA]
```

## Temperature Guidance

| Output Type | Suggested Temperature |
|---|---|
| Structured extraction | 0.0 - 0.2 |
| Scoring explanation | 0.1 - 0.3 |
| Draft message | 0.3 - 0.6 |
| Demo narration | 0.4 - 0.7 |

## Missing Data Rule

Prompt must include:

```text
If the context does not contain the information, do not infer it.
Use "not_available" or an empty list.
```
