import { useEffect, useState } from "react";
import { api } from "../api/client";

export function MemberDetailPage({ memberId, onBack, onStartWorkflow }: { memberId: string; onBack: () => void; onStartWorkflow: () => void }) {
  const [member, setMember] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.memberById(memberId)
      .then(setMember)
      .catch((err) => setError(err.message));
  }, [memberId]);

  if (error) return <p className="error">Error: {error}</p>;
  if (!member) return <p>Loading…</p>;

  return (
    <section className="panel">
      <h2 style={{marginTop: 0}}>{member.full_name}</h2>
      <div className="kpi-grid" style={{gridTemplateColumns: '1fr 1fr'}}>
        <article>
            <span>Member Code</span>
            <strong>{member.member_code}</strong>
        </article>
        <article>
            <span>Status</span>
            <strong className={`status-badge ${member.status === 'active' ? 'active' : ''}`}>{member.status}</strong>
        </article>
      </div>
      <div style={{marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #d8e0e8'}}>
        <button 
            onClick={onStartWorkflow} 
            style={{background: '#173b6c', color: 'white', padding: '12px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold'}}
        >
            Run Agentic Workflow Analysis
        </button>
      </div>
    </section>
  );
}
