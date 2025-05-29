'use client';

import { useState } from 'react';

type MonitoredURL = {
  address: string;
  history: string[];
};

export default function Dashboard() {
  const [url, setUrl] = useState('');
  const [urls, setUrls] = useState<MonitoredURL[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    try {
      const res = await fetch('/api/add-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await res.json();

      if (data.success) {
        const newURL: MonitoredURL = {
          address: url.trim(),
          history: ['✅'], // Temporarily adding dummy history
        };
        setUrls((prev) => [...prev, newURL]);
        setUrl('');
      } else {
        console.error('API error:', data.message);
      }
    } catch (err) {
      console.error('Failed to send URL:', err);
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
