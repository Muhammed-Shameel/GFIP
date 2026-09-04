import { useState } from "react";
import { Layout } from "./components/Layout";
import { DashboardPage } from "./pages/DashboardPage";
import { MemberDetailPage } from "./pages/MemberDetailPage";
import { AgentWorkflowConsolePage } from "./pages/AgentWorkflowConsolePage";

export default function App() {
  const [view, setView] = useState<
    { type: 'dashboard' } | 
    { type: 'memberDetail', id: string } | 
    { type: 'workflowConsole', id: string }
  >({ type: 'dashboard' });

  const [activeSection, setActiveSection] = useState<'dashboard' | 'members' | 'limitations' | 'other'>('dashboard');

  const handleNavigate = (section: 'dashboard' | 'members' | 'limitations') => {
    setActiveSection(section);
    setView({ type: 'dashboard' });
    
    setTimeout(() => {
      if (section === 'dashboard') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(section);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 50);
  };

  return (
    <Layout activeSection={view.type === 'dashboard' ? activeSection : 'other'} onNavigate={handleNavigate}>
      {view.type === 'dashboard' && (
        <DashboardPage 
          onMemberSelect={(id) => {
            setActiveSection('other');
            setView({ type: 'memberDetail', id });
          }} 
        />
      )}
      {view.type === 'memberDetail' && (
        <MemberDetailPage 
          memberId={view.id} 
          onBack={() => {
            setActiveSection('dashboard');
            setView({ type: 'dashboard' });
          }} 
          onStartWorkflow={() => {
            setActiveSection('other');
            setView({ type: 'workflowConsole', id: view.id });
          }} 
        />
      )}
      {view.type === 'workflowConsole' && (
        <AgentWorkflowConsolePage memberId={view.id} />
      )}
    </Layout>
  );
}
