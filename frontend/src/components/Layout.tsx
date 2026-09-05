import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  activeSection: 'dashboard' | 'showcase' | 'members' | 'limitations' | 'other';
  onNavigate: (section: 'dashboard' | 'showcase' | 'members' | 'limitations') => void;
}

export function Layout({ children, activeSection, onNavigate }: LayoutProps) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span style={{ background: '#2563eb', color: '#ffffff', fontSize: '0.65rem', padding: '3px 8px', borderRadius: '8px', fontWeight: '700', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              ACTIVE INTELLIGENCE
            </span>
          </div>
          <h1 style={{ cursor: 'pointer' }} onClick={() => onNavigate('dashboard')}>GFIP</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.825rem', margin: '4px 0 0 0', fontWeight: '400' }}>Gym Member Intelligence</p>
        </div>

        <nav style={{ marginTop: '32px' }}>
          <a 
            href="#" 
            className={activeSection === 'dashboard' ? 'nav-item active' : 'nav-item'} 
            onClick={(e) => { e.preventDefault(); onNavigate('dashboard'); }}
          >
            Dashboard
          </a>
          <a 
            href="/internship-showcase" 
            className={activeSection === 'showcase' ? 'nav-item active' : 'nav-item'} 
            onClick={(e) => { e.preventDefault(); onNavigate('showcase'); }}
          >
            Developer Showcase
          </a>
          <a 
            href="#members" 
            className={activeSection === 'members' ? 'nav-item active' : 'nav-item'} 
            onClick={(e) => { e.preventDefault(); onNavigate('members'); }}
          >
            Members
          </a>
          <a 
            href="#limitations" 
            className={activeSection === 'limitations' ? 'nav-item active' : 'nav-item'} 
            onClick={(e) => { e.preventDefault(); onNavigate('limitations'); }}
          >
            System Status
          </a>
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.08)', fontSize: '0.75rem', color: '#64748b' }}>
          Internship build notes available in Showcase
        </div>
      </aside>

      <main>{children}</main>
    </div>
  );
}
