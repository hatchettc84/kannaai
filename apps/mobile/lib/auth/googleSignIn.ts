import { Platform } from 'react-native';
import { signInWithPopup, signInWithCredential, GoogleAuthProvider, type UserCredential } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

export async function signInWithGoogle(): Promise<UserCredential> {
  if (Platform.OS === 'web') {
    // Web: use Firebase popup flow directly
    return signInWithPopup(auth, googleProvider);
  }

  // Native: use @react-native-google-signin (requires dev build)
  // This is deferred until native builds are set up
  try {
    const { GoogleSignin } = await import('@react-native-google-signin/google-signin');
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    });
    const response = await GoogleSignin.signIn();
    const idToken = response.data?.idToken;
    if (!idToken) throw new Error('No ID token from Google Sign-In');
    const credential = GoogleAuthProvider.credential(idToken);
    return signInWithCredential(auth, credential);
  } catch {
    throw new Error('Google Sign-In requires a native development build. Use web preview for now.');
  }
}

export async function firebaseSignOut(): Promise<void> {
  await auth.signOut();
}
