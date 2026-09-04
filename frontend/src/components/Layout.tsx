import type { ReactNode } from "react";

export function Layout({ children, onNavigate }: { children: ReactNode; onNavigate: (page: 'dashboard') => void }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <span style={{ background: '#2563eb', color: '#fff', fontSize: '0.7rem', padding: '3px 8px', borderRadius: '12px', fontWeight: 'bold', letterSpacing: '0.05em' }}>
            STAGE 4 COMPLETED
          </span>
          <h1 style={{ marginTop: '10px' }}>GFIP</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>Gym & Fitness Intelligence Platform</p>
        </div>
        <nav style={{ marginTop: '30px' }}>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('dashboard'); }}>Dashboard</a>
          <a href="#members">Members</a>
          <a href="#limitations">System Status</a>
        </nav>
      </aside>
      <main>{children}</main>
    </div>
  );
}
