import Link from 'next/link';

export default function Home(){
  return(
    <main style = {{ padding: '2rem'}}>
      <h1>PingPulse</h1>
      <p>Building industry-grade infra with AWS and Serverless</p>
      <Link href='/about'>Go to About Page</Link>
    </main>
  );
}