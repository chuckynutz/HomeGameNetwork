import { NextRequest, NextResponse } from 'next/server';
import { loginWithEmailPassword } from '../../../../backend/authentication/emailPassword';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }
    const result = await loginWithEmailPassword(email, password);
    if (result.success) {
      return NextResponse.json({ success: true, token: result.token, user: result.user }, { status: 200 });
    } else {
      return NextResponse.json({ error: result.error }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
} 