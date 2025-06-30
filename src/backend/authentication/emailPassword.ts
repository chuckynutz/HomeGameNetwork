import { adminAuth, adminDb } from '../../lib/firebaseAdmin';

/**
 * Registers a new user with email and password using Firebase Admin SDK.
 * @param email User's email
 * @param password User's password
 * @param displayName Optional display name
 */
export async function registerWithEmailPassword(email: string, password: string, displayName?: string) {
  try {
    const userRecord = await adminAuth.createUser({
      email,
      password,
      displayName,
    });
    // Create user profile in Firestore
    await adminDb.collection('users').doc(userRecord.uid).set({
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName || '',
      createdAt: new Date().toISOString(),
    });
    return { success: true, user: userRecord };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Verifies a user's email and password using Firebase Auth REST API (since Admin SDK does not support sign-in).
 * Returns a Firebase ID token if successful.
 */
export async function loginWithEmailPassword(email: string, password: string) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, returnSecureToken: true }),
      }
    );
    const data = await response.json();
    if (response.ok) {
      return { success: true, token: data.idToken, user: data };
    } else {
      return { success: false, error: data.error?.message || 'Login failed' };
    }
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
} 