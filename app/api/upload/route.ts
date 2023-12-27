import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const filename = new URL(request.url).searchParams.get('filename');
  const body = request.body;

  const blob = body && filename ? await put(filename, body, { access: 'public' }) : null;

  return blob
    ? NextResponse.json(blob)
    : NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
}