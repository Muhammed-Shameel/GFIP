import { useEffect, useState } from "react";
import { api } from "../api/client";

export function MemberDetailPage({ memberId, onBack }: { memberId: string; onBack: () => void }) {
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
      <button onClick={onBack}>&larr; Back to Dashboard</button>
      <h2>{member.full_name}</h2>
      <p><strong>Code:</strong> {member.member_code}</p>
      <p><strong>Status:</strong> {member.status}</p>
    </section>
  );
}
