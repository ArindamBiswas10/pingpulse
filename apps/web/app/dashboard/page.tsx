'use client';

import { useState } from 'react';

export default function Dashboard() {
  const [url, setUrl] = useState('');
  const [urls, setUrls] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      setUrls((prev) => [...prev, url]);
      setUrl('');
    }
  };

  const getStatus = () => (Math.random() > 0.5 ? '✅ Up' : '❌ Down');

  return (
    <main style={{ padding: '2rem' }}>
      <h1>📡 PingPulse Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter URL to monitor"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ marginRight: '1rem', padding: '0.5rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>Add</button>
      </form>

      <ul style={{ marginTop: '1.5rem', listStyle: 'none', padding: 0 }}>
        {urls.map((u, i) => (
          <li key={i} style={{ marginBottom: '0.75rem' }}>
            <strong>{u}</strong> — <span>{getStatus()}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
