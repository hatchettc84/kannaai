import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  // TODO: Authenticate via Clerk JWT, fetch user from DB
  return NextResponse.json({
    id: 'mock-user',
    name: 'Cannabis Enthusiast',
    email: 'user@kannaai.com',
    toleranceLevel: 'medium',
    preferredTypes: ['sativa', 'hybrid'],
    ageVerified: true,
  });
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    // TODO: Validate with Zod, update user in DB
    return NextResponse.json({ success: true, updated: body });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
