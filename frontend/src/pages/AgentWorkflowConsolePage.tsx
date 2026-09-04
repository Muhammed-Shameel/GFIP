import { useEffect, useState } from "react";
import { api } from "../api/client";

type WorkflowMode = "deterministic" | "langgraph" | "llm_assisted";

function RouteInfo({ data }: { data: any }) {
  if (!data || (data.graph_mode !== "langgraph_stateless" && data.graph_mode !== "langgraph_llm_assisted")) return null;

  return (
    <section className="panel" style={{ background: '#f8f9fa', border: '1px solid #dee2e6' }}>
      <h2>Conditional Routing</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        <div><strong>Selected Route:</strong> <span className="status-badge">{data.selected_route}</span></div>
        <div><strong>Route Reason:</strong> {data.route_reason}</div>
        <div style={{ gridColumn: 'span 2' }}>
            <strong>Executed Path:</strong> {data.executed_path ? data.executed_path.join(' -> ') : "N/A"}
        </div>
        {data.skipped_agents && data.skipped_agents.length > 0 && (
          <div style={{ gridColumn: 'span 2' }}>
            <strong>Skipped Agents:</strong>
            <ul>
              {data.skipped_agents.map((sa: any, i: number) => (
                <li key={i}>{sa.agent}: {sa.reason}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

function LLMTracePanel({ data }: { data: any }) {
  if (!data || data.graph_mode !== "langgraph_llm_assisted") return null;

  const modeBadgeColor = data.fallback_used
    ? '#eab308'
    : (data.llm_mode === 'disabled' ? '#64748b' : '#16a34a');

  return (
    <section className="panel" style={{ background: '#f0f9ff', border: '1px solid #bae6fd', marginTop: '15px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h2 style={{ margin: 0, color: '#0369a1', fontSize: '1.2rem' }}>LLM Agent Integration & Audit Trace</h2>
        <span className="status-badge" style={{ background: modeBadgeColor, color: '#fff', padding: '4px 10px', borderRadius: '12px' }}>
          Mode: {data.llm_mode || 'mock'}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', fontSize: '0.875rem' }}>
        <div><strong>Provider:</strong> {data.llm_provider || 'mock'}</div>
        <div><strong>Model:</strong> {data.llm_model || 'mock-agentic-v1'}</div>
        <div><strong>Validation Status:</strong> <span style={{ color: data.llm_validation_status === 'passed' ? '#16a34a' : '#dc2626', fontWeight: 'bold' }}>{data.llm_validation_status || 'passed'}</span></div>

        <div><strong>Fallback Used:</strong> {data.fallback_used ? 'Yes' : 'No'}</div>
        <div style={{ gridColumn: 'span 2' }}><strong>Fallback Reason:</strong> {data.fallback_reason || 'None (LLM validation passed)'}</div>

        <div><strong>Protected Fields Changed:</strong> <span style={{ color: '#16a34a', fontWeight: 'bold' }}>{String(data.protected_fields_changed || false)}</span></div>
        <div style={{ gridColumn: 'span 2' }}><strong>Selected LLM Node:</strong> ExplanationSummaryService (Summary Node)</div>
      </div>
    </section>
  );
}

export function AgentWorkflowConsolePage({ memberId }: { memberId: string }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDebug, setShowDebug] = useState(false);
  const [mode, setMode] = useState<WorkflowMode>("llm_assisted");

  const fetchWorkflow = async () => {
    setLoading(true);
    setError("");
    try {
      let response: any;
      if (mode === "deterministic") {
        response = await api.reviewMember(memberId);
      } else if (mode === "langgraph") {
        response = await api.reviewMemberGraph(memberId);
      } else {
        response = await api.reviewMemberLLM(memberId);
      }
      setData(response);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkflow();
  }, [memberId, mode]);

  if (loading) return <div className="panel"><p>Running {mode.replace('_', ' ')} workflow…</p></div>;
  if (error) return <div className="panel"><p className="error">Error: {error}</p></div>;

  const renderValue = (val: any) => (val === null || val === undefined || (typeof val === 'object' && Object.keys(val).length === 0) ? "N/A" : <pre style={{fontSize: '0.75rem', background: '#f8fafc', padding: '8px', borderRadius: '4px', overflowX: 'auto'}}>{JSON.stringify(val, null, 2)}</pre>);
  
  const isGraphMode = mode === "langgraph" || mode === "llm_assisted";
  const traceLog = (isGraphMode ? data.agent_outputs : data.trace_log) || [];
  const context = (isGraphMode ? data.shared_context : data.context) || {};

  return (
    <div className="workflow-console">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
        <section className="hero-card" style={{margin: 0, flex: 1}}>
          <h1 style={{ fontSize: '1.5rem', margin: '0 0 4px 0' }}>
            Agent Workflow Console 
            <span style={{fontSize: '0.85rem', color: '#64748b', marginLeft: '10px', fontWeight: 'normal'}}>
              ({mode === "deterministic" ? "Deterministic" : mode === "langgraph" ? "LangGraph Baseline" : "LLM-Assisted LangGraph"})
            </span>
          </h1>
          <p className="eyebrow" style={{ color: '#64748b' }}>Session ID: {data.workflow_session_id || data.workflow_id}</p>
        </section>
        <div style={{display: 'flex', gap: '12px', alignItems: 'center'}}>
          <div style={{display: 'flex', gap: '8px', background: '#ffffff', padding: '6px 12px', borderRadius: '8px', border: '1px solid #e2e8f0'}}>
            <label style={{fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px'}}>
              <input type="radio" name="wf_mode" value="deterministic" checked={mode === "deterministic"} onChange={() => setMode("deterministic")} />
              Deterministic
            </label>
            <label style={{fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px'}}>
              <input type="radio" name="wf_mode" value="langgraph" checked={mode === "langgraph"} onChange={() => setMode("langgraph")} />
              LangGraph
            </label>
            <label style={{fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 'bold', color: '#2563eb'}}>
              <input type="radio" name="wf_mode" value="llm_assisted" checked={mode === "llm_assisted"} onChange={() => setMode("llm_assisted")} />
              LLM-Assisted
            </label>
          </div>
          <button className="status-badge" style={{cursor: 'pointer', border: 'none', padding: '8px 16px', background: '#e2e8f0', color: '#334155'}} onClick={() => setShowDebug(!showDebug)}>
            {showDebug ? 'Hide Debug Data' : 'View Debug Data'}
          </button>
        </div>
      </div>

      <RouteInfo data={data} />
      <LLMTracePanel data={data} />

      <section className="panel" style={{ marginTop: '15px' }}>
        <h2>Agent Sequence Timeline</h2>
        <div className="timeline-wrapper">
          {traceLog.map((log: any, i: number) => (
            <div key={i} className="step-item">
              <div className="step-badge">{i + 1}</div>
              <h3 style={{ fontSize: '1rem', margin: '0 0 6px 0' }}>
                {log.agent}{' '}
                {log.agent === 'ExplanationSummaryService' && mode === 'llm_assisted' && (
                  <span className="status-badge" style={{ background: '#2563eb', color: '#fff', marginLeft: '6px' }}>LLM Node</span>
                )}
                <span className="status-badge" style={{ marginLeft: '6px' }}>Completed</span>
              </h3>
              {log.started_at && <p style={{fontSize: '0.8rem', color: '#64748b', marginBottom: '10px'}}>Duration: {new Date(log.completed_at).getTime() - new Date(log.started_at).getTime()}ms</p>}
              
              {showDebug && (
                  <div className="data-card">
                    <div style={{display: 'flex', gap: '20px'}}>
                        <div style={{flex: 1}}><strong>Agent Output</strong>{renderValue(log.output)}</div>
                    </div>
                  </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {showDebug && (
        <section className="panel">
          <h2>Shared Workflow Context</h2>
          <div className="context-grid">
              {Object.entries(context).map(([key, value]) => (
                  <div key={key} className="context-section">
                      <h3 style={{fontSize: '0.85rem', marginBottom: '5px', textTransform: 'capitalize', color: '#334155'}}>{key.replace('_', ' ')}</h3>
                      {renderValue(value)}
                  </div>
              ))}
          </div>
        </section>
      )}

      <section className="insight-card" style={{ marginTop: '15px' }}>
        <span className="confidence-badge">High Confidence</span>
        <h2 style={{ fontSize: '1.2rem', margin: '0 0 8px 0', color: '#0369a1' }}>Final Decision Support</h2>
        <p style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '12px', color: '#0f172a' }}>
            {data.final_recommendation || "N/A"}
        </p>
        <p style={{marginBottom: '8px', color: '#334155', lineHeight: '1.5'}}><strong>Explanation:</strong> <em>{data.explanation || context.explanation || "No explanation provided."}</em></p>
        <p style={{fontSize: '0.8rem', color: '#64748b', margin: 0}}><strong>Audit Reference:</strong> {data.audit_reference || "N/A"}</p>
      </section>
    </div>
  );
}
