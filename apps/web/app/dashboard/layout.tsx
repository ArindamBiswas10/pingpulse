export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside style={{ width: '220px', background: '#111', color: '#fff', padding: '1rem' }}>
        <h2>PingPulse</h2>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><a href="/dashboard" style={{ color: '#fff' }}>Overview</a></li>
            <li><a href="/dashboard/logs" style={{ color: '#fff' }}>Logs</a></li>
            <li><a href="/dashboard/settings" style={{ color: '#fff' }}>Settings</a></li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div style={{ flex: 1, padding: '2rem' }}>
        {children}
      </div>
    </div>
  );
}
