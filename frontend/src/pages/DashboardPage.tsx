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
        <p className="eyebrow" style={{ color: '#0056b3', letterSpacing: '0.1em' }}>Stage 4 — LLM Agent Integration Completed</p>
        <h2>Gym Fitness Member Engagement & Intervention Platform (GFIP)</h2>
        <p>
          Operational member engagement intelligence featuring deterministic rule processing,
          LangGraph conditional workflow orchestration, and safe LLM-backed summary generation
          with schema validation and deterministic fallback.
        </p>
      </section>

      <section className="kpi-grid">
        <article>
          <span>Total Demo Members</span>
          <strong>{members.length}</strong>
        </article>
        <article>
          <span>Intelligence Status</span>
          <strong style={{ color: '#28a745', fontSize: '1.2rem' }}>Active (Rules + Graph + LLM)</strong>
        </article>
        <article>
          <span>Current Phase</span>
          <strong style={{ color: '#0056b3', fontSize: '1.2rem' }}>Stage 4 Completed</strong>
        </article>
      </section>

      <section id="members" className="panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h2 style={{ margin: 0 }}>Registered Members</h2>
          <span style={{ fontSize: '0.85rem', color: '#667386' }}>Select a member to inspect or trigger workflow</span>
        </div>
        {loading && <p>Loading members…</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && members.length === 0 && <p>No members loaded. Run the seed script.</p>}
        <div className="member-grid">
          {members.map((member) => (
            <article key={member.id} className="member-card" onClick={() => onMemberSelect(member.id)} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <span className="eyebrow" style={{fontFamily: 'monospace', color: '#173b6c', fontSize: '0.85rem', fontWeight: 'bold', background: '#eef2f6', padding: '3px 8px', borderRadius: '6px'}}>{member.member_code}</span>
                <span className={`status-badge ${member.status === 'active' ? 'active' : ''}`}>{member.status}</span>
              </div>
              <h3 style={{margin: '4px 0 0 0', color: '#0f172a'}}>{member.full_name}</h3>
              <p style={{margin: 0, color: '#64748b', fontSize: '0.85rem'}}>
                <strong>Tags:</strong> {member.preferred_training_tags.join(", ") || "None"}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="limitations" className="panel">
        <h2>System Boundary & Status (Stage 4)</h2>
        <ul style={{ lineHeight: '1.8', color: '#334155' }}>
          <li><strong>Deterministic Rules & Context:</strong> Fully operational across attendance, risk scoring, and trainer allocation.</li>
          <li><strong>LangGraph Workflow:</strong> Stateful/stateless graph routing active with dormant, high-risk, and standard paths.</li>
          <li><strong>LLM Agent Integration:</strong> `ExplanationSummaryService` powered by LLM adapter (Mock & Gemini supported) with Pydantic schema validation.</li>
          <li><strong>Deterministic Fallback:</strong> Reverts to deterministic output on provider timeout, API error, or schema invalidity.</li>
          <li><strong>Protected Field Enforcer:</strong> Decision scores, routes, and audit references remain protected against LLM modification.</li>
        </ul>
      </section>
    </>
  );
}
