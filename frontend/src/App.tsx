import { useState } from "react";
import { Layout } from "./components/Layout";
import { DashboardPage } from "./pages/DashboardPage";
import { MemberDetailPage } from "./pages/MemberDetailPage";

export default function App() {
  const [memberId, setMemberId] = useState<string | null>(null);

  return (
    <Layout>
      {memberId ? (
        <MemberDetailPage memberId={memberId} onBack={() => setMemberId(null)} />
      ) : (
        <DashboardPage onMemberSelect={setMemberId} />
      )}
    </Layout>
  );
}
