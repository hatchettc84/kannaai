import { create } from 'zustand';
import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';
import { auth } from '../firebase';
import { signInWithGoogle, firebaseSignOut } from '../auth/googleSignIn';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthUser {
  uid: string;
  name: string;
  email: string;
  photoURL: string | null;
}

interface AuthState {
  isAuthenticated: boolean;
  isAgeVerified: boolean;
  isLoading: boolean;
  user: AuthUser | null;
  dateOfBirth: string | null;
  initAuth: () => () => void;
  googleSignIn: () => Promise<void>;
  verifyAge: (dateOfBirth: string) => Promise<void>;
  signOut: () => Promise<void>;
  // Dev fallback for when Firebase isn't configured
  devSignIn: (name: string, email: string) => void;
}

function firebaseUserToAuthUser(fbUser: FirebaseUser): AuthUser {
  return {
    uid: fbUser.uid,
    name: fbUser.displayName || fbUser.email?.split('@')[0] || 'User',
    email: fbUser.email || '',
    photoURL: fbUser.photoURL,
  };
}

function calculateAge(dateOfBirth: string): number {
  const dob = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

const AGE_VERIFIED_KEY = 'kannaai_age_verified';
const DOB_KEY = 'kannaai_dob';

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  isAgeVerified: false,
  isLoading: true,
  user: null,
  dateOfBirth: null,

  initAuth: () => {
    // Listen for Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Restore age verification from AsyncStorage
        const storedAgeVerified = await AsyncStorage.getItem(AGE_VERIFIED_KEY).catch(() => null);
        const storedDob = await AsyncStorage.getItem(DOB_KEY).catch(() => null);

        set({
          isAuthenticated: true,
          user: firebaseUserToAuthUser(firebaseUser),
          isAgeVerified: storedAgeVerified === 'true',
          dateOfBirth: storedDob,
          isLoading: false,
        });
      } else {
        set({
          isAuthenticated: false,
          user: null,
          isAgeVerified: false,
          dateOfBirth: null,
          isLoading: false,
        });
      }
    });

    return unsubscribe;
  },

  googleSignIn: async () => {
    try {
      const result = await signInWithGoogle();
      set({
        isAuthenticated: true,
        user: firebaseUserToAuthUser(result.user),
      });
    } catch (error: any) {
      console.error('Google Sign-In failed:', error);
      throw error;
    }
  },

  verifyAge: async (dateOfBirth: string) => {
    const age = calculateAge(dateOfBirth);
    if (age >= 21) {
      await AsyncStorage.setItem(AGE_VERIFIED_KEY, 'true').catch(() => {});
      await AsyncStorage.setItem(DOB_KEY, dateOfBirth).catch(() => {});
      set({ isAgeVerified: true, dateOfBirth });
    } else {
      throw new Error('You must be 21 or older to use KannaAI');
    }
  },

  signOut: async () => {
    await firebaseSignOut();
    await AsyncStorage.removeItem(AGE_VERIFIED_KEY).catch(() => {});
    await AsyncStorage.removeItem(DOB_KEY).catch(() => {});
    set({
      isAuthenticated: false,
      isAgeVerified: false,
      user: null,
      dateOfBirth: null,
    });
  },

  // Dev fallback — use when Firebase isn't configured yet
  devSignIn: (name: string, email: string) => {
    set({
      isAuthenticated: true,
      isAgeVerified: false,
      user: { uid: 'dev-user', name, email, photoURL: null },
      isLoading: false,
    });
  },
}));
