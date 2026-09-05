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
        <p className="eyebrow" style={{ color: '#0056b3', letterSpacing: '0.08em' }}>Gym Member Engagement Intelligence</p>
        <h2>Member Retention & Follow-up Dashboard</h2>
        <p>
          Track member engagement, spot retention risks, and trigger staff-ready follow-up guidance
          using rules, workflow routing, and validated AI summaries.
        </p>
      </section>

      <section className="kpi-grid">
        <article>
          <span>Total Demo Members</span>
          <strong>{members.length}</strong>
        </article>
        <article>
          <span>Intelligence Status</span>
          <strong style={{ color: '#15803d', fontSize: '1.2rem' }}>Active</strong>
        </article>
        <article>
          <span>Engine</span>
          <strong style={{ color: '#0056b3', fontSize: '1.2rem' }}>Rules + Graph + AI Summary</strong>
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
        <h2>System Status</h2>
        <ul style={{ lineHeight: '1.8', color: '#334155' }}>
          <li><strong>Attendance Review:</strong> Flags low or missing recent visits for staff attention.</li>
          <li><strong>Retention Routing:</strong> Routes members through dormant, high-risk, and standard workflows.</li>
          <li><strong>Trainer Allocation:</strong> Separates missing trainer assignments from attendance follow-up decisions.</li>
          <li><strong>AI Summary Validation:</strong> Summaries are checked against business evidence before they are trusted.</li>
          <li><strong>Audit Protection:</strong> Decision routes, scores, and audit references remain protected from AI-generated text.</li>
        </ul>
      </section>
    </>
  );
}
