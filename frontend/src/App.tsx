import { useState, useEffect } from "react";
import { Layout } from "./components/Layout";
import { DashboardPage } from "./pages/DashboardPage";
import { MemberDetailPage } from "./pages/MemberDetailPage";
import { AgentWorkflowConsolePage } from "./pages/AgentWorkflowConsolePage";
import { ShowcasePage } from "./pages/ShowcasePage";

export default function App() {
  const [view, setView] = useState<
    { type: 'dashboard' } | 
    { type: 'showcase' } |
    { type: 'memberDetail', id: string } | 
    { type: 'workflowConsole', id: string }
  >(() => {
    if (window.location.pathname === '/internship-showcase' || window.location.hash === '#showcase') {
      return { type: 'showcase' };
    }
    return { type: 'dashboard' };
  });

  const [activeSection, setActiveSection] = useState<'dashboard' | 'showcase' | 'members' | 'limitations' | 'other'>(
    view.type === 'showcase' ? 'showcase' : 'dashboard'
  );

  const handleNavigate = (section: 'dashboard' | 'showcase' | 'members' | 'limitations') => {
    setActiveSection(section);
    if (section === 'showcase') {
      window.history.pushState({}, '', '/internship-showcase');
      setView({ type: 'showcase' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.history.pushState({}, '', '/');
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
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname === '/internship-showcase') {
        setView({ type: 'showcase' });
        setActiveSection('showcase');
      } else {
        setView({ type: 'dashboard' });
        setActiveSection('dashboard');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <Layout activeSection={view.type === 'showcase' ? 'showcase' : (view.type === 'dashboard' ? activeSection : 'other')} onNavigate={handleNavigate}>
      {view.type === 'showcase' && (
        <ShowcasePage 
          onOpenDashboard={() => handleNavigate('dashboard')}
          onOpenConsole={() => {
            setActiveSection('other');
            setView({ type: 'workflowConsole', id: '3d242868-ecd3-4592-a37f-1cccc67b78d9' });
          }}
        />
      )}
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
