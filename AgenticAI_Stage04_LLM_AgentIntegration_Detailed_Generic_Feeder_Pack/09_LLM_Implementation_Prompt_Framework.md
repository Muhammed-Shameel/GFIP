# LLM Implementation Prompt Framework

## Master Implementation Prompt

```text
Act as an Agentic AI Architect, LangGraph Engineer, LLM Integration Mentor and RealRails Internship Mentor.

We are implementing Stage 4 — LLM Agent Integration.

Important correction:
This stage is not only LLM explanation.
The goal is to place free/low-cost LLM capability inside selected LangGraph agent nodes, while preserving deterministic fallback and validation.

Mandatory inputs I am providing:
1. Stage 4 LLM Agent Integration Feeder ZIP
2. Product Foundation / Product Bible
3. Domain Guide
4. Agentic AI Architecture Feeder
5. Shared Context / Workflow Memory Guide
6. Latest Repomix after Stage 3 LangGraph
7. Stage 1.5 Visualization evidence
8. Stage 2 Cloud Deployment evidence
9. Stage 3 LangGraph evidence
10. Existing deterministic workflow API output
11. Existing LangGraph API output
12. Known limitations
13. Preferred LLM provider or mock mode

Task:
Design and implement LLM-assisted agent integration.

Required approach:
1. Review current deterministic and LangGraph workflows from Repomix.
2. Identify which agents are good candidates for LLM-powered or LLM-enhanced mode.
3. Do not blindly convert every agent to LLM.
4. Create an LLM provider adapter with mock mode first.
5. Add support for one free/low-cost provider if feasible.
6. Create prompt contracts for selected agents.
7. Ensure LLM returns structured JSON/schema output.
8. Validate LLM output.
9. Add deterministic fallback if LLM fails or validation fails.
10. Integrate selected LLM-backed agents into LangGraph nodes.
11. Preserve existing deterministic and LangGraph endpoints.
12. Add an LLM-assisted endpoint or mode.
13. Update Agent Workflow Console to show LLM-assisted mode, provider, validation and fallback.
14. Capture comparison evidence: deterministic vs LangGraph vs LLM-assisted.
15. Generate latest Repomix after implementation.

Strict rules:
- Do not build a chatbot as the main output.
- Do not remove deterministic baseline.
- Do not remove LangGraph baseline.
- Do not send full database dump to LLM.
- Do not commit API keys or secrets.
- Do not make paid provider mandatory.
- Do not allow LLM to silently change protected fields without validation.
- Do not claim enterprise production readiness.
- Keep this as a proper learning-grade Agentic AI demo.

Output required:
1. Current architecture assessment
2. Candidate LLM agent selection table
3. Provider strategy
4. Prompt contracts
5. Structured output schemas
6. Files to add/change
7. Exact code changes
8. New endpoint/mode details
9. Fallback and validation logic
10. UI/demo update
11. Test/validation steps
12. Evidence checklist
13. Completion report draft
```

## Debug Prompt

```text
The LLM-assisted agent stage is failing.

I am attaching:
1. Latest Repomix after attempted changes
2. Error logs
3. Deterministic endpoint response
4. LangGraph endpoint response
5. LLM-assisted endpoint response/error
6. Provider settings without secret values
7. Files changed
8. Expected behavior
9. Actual behavior

Please debug with minimal changes.

Rules:
- Do not rewrite unrelated code.
- Do not remove deterministic fallback.
- Do not remove LangGraph endpoint.
- Do not expose secrets.
- Fix provider/prompt/schema/fallback issue only.
- Provide exact file-level changes and validation steps.
```
