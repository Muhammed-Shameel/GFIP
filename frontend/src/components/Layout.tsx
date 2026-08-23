import type { ReactNode } from "react";

export function Layout({ children, onNavigate }: { children: ReactNode; onNavigate: (page: 'dashboard') => void }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <p className="eyebrow">RealRails Agentic AI</p>
          <h1>GFIP</h1>
          <p>Gym & Fitness Intelligence Platform</p>
        </div>
        <nav>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('dashboard'); }}>Dashboard</a>
          <a href="#members">Members</a>
          <a href="#limitations">Limitations</a>
        </nav>
      </aside>
      <main>{children}</main>
    </div>
  );
}
