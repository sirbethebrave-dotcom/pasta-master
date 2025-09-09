import { NextRequest, NextResponse } from 'next/server';

export async function GET(_req: NextRequest) {
  return NextResponse.json({ 
    error: 'NextAuth not configured',
    message: 'Please configure OAuth providers in .env.local'
  }, { status: 501 });
}

export async function POST(_req: NextRequest) {
  return NextResponse.json({ 
    error: 'NextAuth not configured',
    message: 'Please configure OAuth providers in .env.local'
  }, { status: 501 });
}
