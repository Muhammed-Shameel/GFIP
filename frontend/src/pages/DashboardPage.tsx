import { useEffect, useState } from "react";
import { api } from "../api/client";
import type { Member } from "../types";

export function DashboardPage({ onMemberSelect }: { onMemberSelect: (id: string) => void }) {
  const [members, setMembers] = useState<Member[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.members()
      .then((data) => setMembers(data.items))
      .catch((reason: unknown) => setError(reason instanceof Error ? reason.message : "Unable to load members"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section id="dashboard" className="hero-card">
        <p className="eyebrow">Phase 1 Starter Foundation</p>
        <h2>Operational member engagement intelligence</h2>
        <p>
          This starter provides the application and domain-data foundation.
          Context, agents, deterministic rules, orchestration, recommendation,
          audit, and final visualization must be implemented through Posts #1.3–#1.6.
        </p>
      </section>

      <section className="kpi-grid">
        <article><span>Total demo members</span><strong>{members.length}</strong></article>
        <article><span>Intelligence status</span><strong>Not implemented</strong></article>
        <article><span>Current phase</span><strong>Foundation</strong></article>
      </section>

      <section id="members" className="panel">
        <h2>Members</h2>
        {loading && <p>Loading members…</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && members.length === 0 && <p>No members loaded. Run the seed script.</p>}
        <div className="member-grid">
          {members.map((member) => (
            <article key={member.id} className="member-card" onClick={() => onMemberSelect(member.id)} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <span className="eyebrow" style={{fontFamily: 'monospace', color: '#173b6c', fontSize: '0.9rem', fontWeight: 'bold', background: '#eef2f6', padding: '2px 6px', borderRadius: '4px'}}>{member.member_code}</span>
                <span className={`status-badge ${member.status === 'active' ? 'active' : ''}`}>{member.status}</span>
              </div>
              <h3 style={{margin: 0}}>{member.full_name}</h3>
              <p style={{margin: 0, color: '#667386', fontSize: '0.85rem'}}>
                <strong>Tags:</strong> {member.preferred_training_tags.join(", ") || "None"}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="limitations" className="panel">
        <h2>Starter Boundary</h2>
        <ul>
          <li>No agents or deterministic recommendation are completed.</li>
          <li>No LangGraph or LLM is included.</li>
          <li>No medical or sensitive health intelligence is permitted.</li>
          <li>PostgreSQL is the target; SQLite is available as a local fallback.</li>
        </ul>
      </section>
    </>
  );
}
