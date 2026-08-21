import type { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <p className="eyebrow">RealRails Agentic AI</p>
          <h1>GFIP</h1>
          <p>Gym & Fitness Intelligence Platform</p>
        </div>
        <nav>
          <a href="#dashboard">Dashboard</a>
          <a href="#members">Members</a>
          <a href="#limitations">Limitations</a>
        </nav>
      </aside>
      <main>{children}</main>
    </div>
  );
}
