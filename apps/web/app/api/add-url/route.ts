// apps/web/app/api/add-url/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { url } = body;

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ success: false, message: 'Invalid URL' }, { status: 400 });
    }

    // Simulate DB save or processing logic
    console.log('Received URL:', url);

    // Return success
    return NextResponse.json({ success: true, message: 'URL added successfully' });
  } catch (error) {
    console.error('Error in /api/add-url:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
