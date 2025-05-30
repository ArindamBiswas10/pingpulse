// apps/web/app/api/add-url/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { url } = body;

    // Basic validation
    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Invalid or missing URL' },
        { status: 400 }
      );
    }

    // Simulate saving to a database or logging
    console.log('[ADD URL] New URL received:', url);

    // In real-world: save to DB here
    // e.g., await db.collection('monitoredUrls').insertOne({ url, createdAt: new Date() });

    return NextResponse.json(
      { success: true, message: 'URL added successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API ERROR] /api/add-url:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
