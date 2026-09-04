<div class="hero">
  <div class="eyebrow">Post 3</div>
  <h1>LLM Node Implementation Protocol</h1>
  <p>This post gives the master prompt and implementation rules for adding LLM-backed graph nodes with structured output and fallback.</p>
  
<div>
  <span class="badge">LLM Inside Agents</span>
  <span class="badge">Free / Low-Cost First</span>
  <span class="badge">Structured Output</span>
  <span class="badge">Fallback Required</span>
</div>

</div>

<h2>Recommended Architecture</h2>
<pre>LangGraph Workflow
→ Selected LLM-backed Node
→ Prompt Contract
→ LLM Provider Adapter
→ Structured JSON Output
→ Schema Validation
→ Fallback if Invalid
→ Audit Trace
→ Final Response</pre>

<h2>Suggested Folder Structure</h2>
<pre>backend/app/application/llm/
  __init__.py
  providers.py
  mock_provider.py
  prompt_templates.py
  schemas.py
  validators.py
  llm_service.py

backend/app/application/graphs/nodes/
  selected_llm_agent_node.py</pre>

<h2>Environment Variables</h2>
<table>
<thead><tr><th>Variable</th><th>Purpose</th></tr></thead>
<tbody>
<tr><td><code>LLM_ENABLED</code></td><td>Enable/disable LLM mode.</td></tr>
<tr><td><code>LLM_PROVIDER</code></td><td>mock / ollama / gemini / groq / huggingface.</td></tr>
<tr><td><code>LLM_MODEL</code></td><td>Selected model name.</td></tr>
<tr><td><code>LLM_API_KEY</code></td><td>Hosted provider key if used. Never commit.</td></tr>
<tr><td><code>LLM_BASE_URL</code></td><td>Local/provider base URL if required.</td></tr>
<tr><td><code>LLM_TIMEOUT_SECONDS</code></td><td>Timeout control.</td></tr>
<tr><td><code>LLM_MAX_TOKENS</code></td><td>Cost/output control.</td></tr>
</tbody>
</table>

<h2>Master Implementation Prompt</h2>
<pre>Act as an Agentic AI Architect, LangGraph Engineer, LLM Integration Mentor and RealRails Internship Mentor.

We are implementing Stage 4 — LLM Agent Integration.

The goal:
Place free/low-cost or mock LLM capability inside selected LangGraph agent nodes.
This should create a proper Agentic AI demo showing how LLM fits inside agent orchestration.

Mandatory inputs:
1. Stage 4 LLM Agent Integration Feeder ZIP
2. Product Foundation / Product Bible
3. Domain Guide
4. Agentic AI Architecture Feeder
5. Shared Context / Workflow Memory Guide
6. Latest Repomix after Stage 3
7. Stage 1.5 Visualization evidence
8. Stage 2 Cloud evidence
9. Stage 3 LangGraph evidence
10. Deterministic API output
11. LangGraph API output
12. Known limitations
13. Preferred provider or mock mode

Tasks:
1. Review current deterministic and LangGraph architecture.
2. Select candidate agents for LLM.
3. Keep unsuitable agents deterministic.
4. Create LLM provider adapter with mock mode.
5. Add one real free/low-cost provider only if feasible.
6. Create prompt contracts for selected agents.
7. Enforce structured JSON/schema output.
8. Validate LLM output.
9. Add deterministic fallback.
10. Integrate selected LLM-backed node into LangGraph.
11. Preserve deterministic and LangGraph endpoints.
12. Add LLM-assisted endpoint or mode.
13. Update Agent Workflow Console to show LLM-assisted mode, provider, validation and fallback.
14. Compare deterministic vs LangGraph vs LLM-assisted outputs.
15. Generate latest Repomix after implementation.

Strict rules:
- Do not build chatbot-only output.
- Do not make paid provider mandatory.
- Do not commit API keys.
- Do not send full DB dump to LLM.
- Do not remove deterministic fallback.
- Do not remove LangGraph baseline.
- Do not silently allow LLM to change protected fields.
- Keep the demo learning-grade, low-cost and explainable.

Output required:
1. Architecture assessment
2. LLM agent selection table
3. Provider strategy
4. Prompt contracts
5. Structured output schemas
6. Exact file changes
7. Endpoint/mode details
8. Validation and fallback logic
9. UI/demo update
10. Evidence checklist
11. Completion report draft
</pre>
