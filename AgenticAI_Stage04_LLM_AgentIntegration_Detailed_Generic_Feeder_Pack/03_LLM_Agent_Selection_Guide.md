# LLM Agent Selection Guide

## Purpose

Not every agent should use LLM.

This guide helps interns decide which existing deterministic agents can be replaced or enhanced by LLM.

## Selection Criteria

| Criteria | Good LLM Candidate? |
|---|---|
| Requires summarizing text | Yes |
| Requires generating human-readable guidance | Yes |
| Requires interpreting qualitative information | Yes |
| Requires explaining a decision | Yes |
| Requires drafting a message | Yes |
| Requires strict numeric calculation | No |
| Requires hard compliance rule | Usually No |
| Requires exact threshold decision | Usually No |
| Requires audit integrity | No, only summarize audit |

## Agent Selection Table

Complete this before implementation.

| Agent | Current Deterministic Role | LLM Value | Risk Level | LLM Mode | Fallback |
|---|---|---|---|---|---|
| Agent 1 |  |  | Low/Medium/High | Replace/Enhance/Explain Only | Deterministic |
| Agent 2 |  |  | Low/Medium/High | Replace/Enhance/Explain Only | Deterministic |
| Agent 3 |  |  | Low/Medium/High | Replace/Enhance/Explain Only | Deterministic |

## LLM Modes

| Mode | Meaning | Recommended For |
|---|---|---|
| Explain Only | LLM explains existing result | Safe first step |
| Enhance | LLM adds qualitative insight but does not override score/rule | Good learning mode |
| Replace with Validation | LLM replaces selected agent but output is validated and fallback exists | Advanced internship step |
| Draft Only | LLM drafts human message | Support/mentor/customer notes |

## Project Examples

### CPIP

| Agent | LLM Mode |
|---|---|
| Resume Readiness Agent | Enhance or replace with schema validation |
| Portfolio Feedback Agent | Enhance |
| Interview Preparation Agent | Replace with validation |
| Role Matching Score Agent | Keep deterministic, LLM explains |

### ABIP

| Agent | LLM Mode |
|---|---|
| Passenger Intent Agent | Replace/enhance using structured extraction |
| Fare Rule Explanation Agent | Enhance |
| Support Summary Agent | Replace/enhance |
| Price calculation/rule Agent | Keep deterministic |

### AHIP

| Agent | LLM Mode |
|---|---|
| Patient Journey Observation Agent | Enhance |
| Claims Review Narrative Agent | Enhance with guardrails |
| Analyst Handover Note Agent | Replace/enhance |
| Risk scoring Agent | Keep deterministic/fallback |
