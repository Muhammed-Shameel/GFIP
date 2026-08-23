import { useState } from "react";
import { Layout } from "./components/Layout";
import { DashboardPage } from "./pages/DashboardPage";
import { MemberDetailPage } from "./pages/MemberDetailPage";
import { AgentWorkflowConsolePage } from "./pages/AgentWorkflowConsolePage";

export default function App() {
  const [view, setView] = useState<{ type: 'dashboard' } | { type: 'memberDetail', id: string } | { type: 'workflowConsole', id: string }>({ type: 'dashboard' });

  return (
    <Layout onNavigate={() => setView({ type: 'dashboard' })}>
      {view.type === 'dashboard' && <DashboardPage onMemberSelect={(id) => setView({ type: 'memberDetail', id })} />}
      {view.type === 'memberDetail' && <MemberDetailPage memberId={view.id} onBack={() => setView({ type: 'dashboard' })} onStartWorkflow={() => setView({ type: 'workflowConsole', id: view.id })} />}
      {view.type === 'workflowConsole' && <AgentWorkflowConsolePage memberId={view.id} />}
    </Layout>
  );
}
