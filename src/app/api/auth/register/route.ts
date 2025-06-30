import { NextRequest, NextResponse } from 'next/server';
import { registerWithEmailPassword } from '../../../../backend/authentication/emailPassword';

export async function POST(request: NextRequest) {
  try {
    const { email, password, displayName } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }
    const result = await registerWithEmailPassword(email, password, displayName);
    if (result.success) {
      return NextResponse.json({ success: true, user: result.user }, { status: 201 });
    } else {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
} 