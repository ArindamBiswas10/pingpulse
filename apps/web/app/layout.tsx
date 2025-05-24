// apps/web/app/layout.tsx

import Link from 'next/link';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'sans-serif', padding: '1rem' }}>
        <nav style={{ marginBottom: '2rem' }}>
          <Link href="/" style={{ marginRight: '1rem' }}>Home</Link>
          <Link href="/about">About</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
