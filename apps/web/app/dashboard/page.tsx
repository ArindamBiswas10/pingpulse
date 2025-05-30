'use client';

import { useState } from 'react';

type MonitoredURL = {
  address: string;
  history: string[];
};

export default function Dashboard() {
  const [url, setUrl] = useState('');
  const [urls, setUrls] = useState<MonitoredURL[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!url.trim()) return;

    try {
      setLoading(true);
      const res = await fetch('/api/add-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await res.json();

      if (data.success) {
        const newURL: MonitoredURL = {
          address: url.trim(),
          history: ['✅'], // Temporary dummy status
        };
        setUrls((prev) => [...prev, newURL]);
        setUrl('');
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (err) {
      console.error('Failed to send URL:', err);
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>📡 PingPulse Dashboard</h1>

      <form onSubmit={handleSubmit} style={{ display: 'flex', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Enter URL to monitor"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{
            flex: 1,
            padding: '0.5rem',
            marginRight: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {loading ? 'Adding...' : 'Add'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {urls.map((item, i) => (
          <li
            key={i}
            style={{
              marginBottom: '1rem',
              padding: '0.75rem',
              border: '1px solid #eee',
              borderRadius: '6px',
              backgroundColor: '#f9f9f9',
            }}
          >
            <strong>{item.address}</strong> —{' '}
            {item.history[0] === '✅' ? '🟢 Up' : '🔴 Down'}
            <div style={{ fontSize: '0.9rem', marginTop: '0.25rem', color: '#666' }}>
              Uptime Log: {item.history.join(' ')}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
