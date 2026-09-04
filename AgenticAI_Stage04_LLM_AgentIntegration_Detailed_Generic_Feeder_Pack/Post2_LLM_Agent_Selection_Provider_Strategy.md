<div class="hero">
  <div class="eyebrow">Post 2</div>
  <h1>Select LLM-Powered Agents and Provider Strategy</h1>
  <p>This post decides which agents should use LLM, which should remain deterministic, and which free/low-cost provider or mock mode should be used.</p>
  
<div>
  <span class="badge">LLM Inside Agents</span>
  <span class="badge">Free / Low-Cost First</span>
  <span class="badge">Structured Output</span>
  <span class="badge">Fallback Required</span>
</div>

</div>

<h2>Agent Selection Principle</h2>
<p>
Choose LLM where natural language understanding, summarization, qualitative reasoning or drafting helps.
Do not use LLM for strict calculations, threshold rules or audit integrity.
</p>

<h2>LLM Candidate Selection Table</h2>
<table>
<thead><tr><th>Agent</th><th>Current Role</th><th>LLM Value</th><th>Risk</th><th>LLM Mode</th><th>Fallback</th></tr></thead>
<tbody>
<tr><td>Agent 1</td><td></td><td></td><td>Low / Medium / High</td><td>Enhance / Replace / Explain / Draft</td><td>Deterministic</td></tr>
<tr><td>Agent 2</td><td></td><td></td><td>Low / Medium / High</td><td>Enhance / Replace / Explain / Draft</td><td>Deterministic</td></tr>
<tr><td>Agent 3</td><td></td><td></td><td>Low / Medium / High</td><td>Enhance / Replace / Explain / Draft</td><td>Deterministic</td></tr>
</tbody>
</table>

<h2>LLM Mode Guide</h2>
<table>
<thead><tr><th>Mode</th><th>Meaning</th><th>Best For</th></tr></thead>
<tbody>
<tr><td>Explain</td><td>LLM explains existing output.</td><td>Safe first integration.</td></tr>
<tr><td>Enhance</td><td>LLM adds qualitative observations but protected fields remain fixed.</td><td>Good internship learning.</td></tr>
<tr><td>Replace with validation</td><td>LLM replaces selected agent output, but schema validation and fallback are mandatory.</td><td>Advanced selected agents.</td></tr>
<tr><td>Draft</td><td>LLM drafts support/mentor/customer note.</td><td>Human-facing workflows.</td></tr>
</tbody>
</table>

<h2>Provider Strategy</h2>
<table>
<thead><tr><th>Provider Mode</th><th>Use When</th><th>Notes</th></tr></thead>
<tbody>
<tr><td>Mock LLM</td><td>No key or provider available.</td><td>Mandatory fallback for all projects.</td></tr>
<tr><td>Ollama Local</td><td>Laptop can run local model.</td><td>Good for offline learning.</td></tr>
<tr><td>Gemini API Free Tier</td><td>API key available and free tier suitable.</td><td>Verify current limits before use.</td></tr>
<tr><td>Groq</td><td>Fast hosted inference available.</td><td>Verify rate limits in account.</td></tr>
<tr><td>Hugging Face Inference Providers</td><td>Need hosted open model access.</td><td>Verify model/provider availability.</td></tr>
</tbody>
</table>

<h2>Provider Selection Prompt</h2>
<pre>Act as an LLM Solution Designer and Agentic AI Mentor.

Using the attached feeder documents and latest Repomix, decide the LLM agent strategy.

Return:
1. Agents suitable for LLM
2. Agents that must remain deterministic
3. Recommended LLM mode per agent
4. Recommended provider strategy: mock / Ollama / Gemini / Groq / Hugging Face
5. Environment variables needed
6. Cost/limit considerations
7. Fallback strategy
8. Audit fields to capture

Rules:
- Do not convert all agents blindly.
- Do not make paid provider mandatory.
- Prefer mock-first implementation.
- Use one real free/low-cost provider only if feasible.
- Keep deterministic fallback.
</pre>
