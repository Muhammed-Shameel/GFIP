import { useEffect, useState } from "react";
import { api } from "../api/client";

export function AgentWorkflowConsolePage({ memberId }: { memberId: string }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    api.reviewMember(memberId)
      .then((data) => setData(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [memberId]);

  if (loading) return <div className="panel"><p>Running workflow…</p></div>;
  if (error) return <div className="panel"><p className="error">Error: {error}</p></div>;

  const renderValue = (val: any) => (val === null || val === undefined || (typeof val === 'object' && Object.keys(val).length === 0) ? "N/A" : <pre style={{fontSize: '0.75rem', background: '#eef2f6', padding: '8px', borderRadius: '4px', overflowX: 'auto'}}>{JSON.stringify(val, null, 2)}</pre>);

  return (
    <div className="workflow-console">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
        <section className="hero-card" style={{margin: 0, flex: 1}}>
          <h1>Agent Workflow Console</h1>
          <p className="eyebrow">Session ID: {data.workflow_session_id}</p>
        </section>
        <button className="status-badge" style={{cursor: 'pointer', border: 'none', padding: '8px 16px'}} onClick={() => setShowDebug(!showDebug)}>
          {showDebug ? 'Hide Debug Data' : 'View Debug Data'}
        </button>
      </div>

      <section className="panel">
        <h2>Agent Sequence Timeline</h2>
        <div className="timeline-wrapper">
          {data.trace_log.map((log: any, i: number) => (
            <div key={i} className="step-item">
              <div className="step-badge">{i + 1}</div>
              <h3>{log.agent} <span className="status-badge">Completed</span></h3>
              <p style={{fontSize: '0.8rem', color: '#667386', marginBottom: '10px'}}>Duration: {new Date(log.completed_at).getTime() - new Date(log.started_at).getTime()}ms</p>
              
              {showDebug && (
                  <div className="data-card">
                    <div style={{display: 'flex', gap: '20px'}}>
                        <div style={{flex: 1}}><strong>Input Snapshot</strong>{renderValue(log.input)}</div>
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
              {Object.entries(data.context).map(([key, value]) => (
                  <div key={key} className="context-section">
                      <h3 style={{fontSize: '0.9rem', marginBottom: '5px', textTransform: 'capitalize'}}>{key.replace('_', ' ')}</h3>
                      {renderValue(value)}
                  </div>
              ))}
          </div>
        </section>
      )}

      <section className="insight-card">
        <span className="confidence-badge">High Confidence</span>
        <h2>Final Decision Support</h2>
        <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '15px', color: '#173b6c' }}>
            {data.final_recommendation || "N/A"}
        </p>
        <p style={{marginBottom: '10px'}}><strong>Explanation:</strong> <em>{data.context.explanation || "No explanation provided."}</em></p>
        <p style={{fontSize: '0.85rem', color: '#667386'}}><strong>Audit Reference:</strong> {data.audit_reference || "N/A"}</p>
      </section>
    </div>
  );
}
