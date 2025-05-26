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

  return (
    <main style={{ padding: '2rem' }}>
      <h1>📡 PingPulse Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter URL to monitor"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ marginRight: '1rem' }}
        />
        <button type="submit">Add</button>
      </form>

      <ul style={{ marginTop: '1rem' }}>
        {urls.map((u, i) => (
          <li key={i}>{u}</li>
        ))}
      </ul>
    </main>
  );
}
