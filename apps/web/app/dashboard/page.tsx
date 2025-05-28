'use client';

import { useState } from 'react';

type MonitoredURL = {
  address: string;
  history: string[];
};

export default function Dashboard() {
  const [url, setUrl] = useState('');
  const [urls, setUrls] = useState<MonitoredURL[]>([]);

  const generateHistory = () =>
    Array.from({ length: 5 }, () => (Math.random() > 0.5 ? '✅' : '❌'));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      const newURL: MonitoredURL = {
        address: url.trim(),
        history: generateHistory(),
      };
      setUrls((prev) => [...prev, newURL]);
      setUrl('');
    }
  };

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
        {urls.map((item, i) => (
          <li key={i} style={{ marginBottom: '1rem' }}>
            <strong>{item.address}</strong> — {item.history[0] === '✅' ? '🟢 Up' : '🔴 Down'}
            <div style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Uptime Log: {item.history.join(' ')}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
