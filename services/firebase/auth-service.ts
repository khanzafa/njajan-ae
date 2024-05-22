import {
  type User,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import auth from '@/firebase/client';

export function onAuthStateChanged(callback: (authUser: User | null) => void) {
  return _onAuthStateChanged(auth, callback);
}

export async function signUpWithEmail(email: string, password: string) {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    if (!result || !result.user) {
      throw new Error('Email sign up failed');
    }

    return result.user.uid;
  } catch (error) {
    console.error('Error signing up with email', error);
  }
}

export async function signInWithEmail(email: string, password: string) {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);

    if (!result || !result.user) {
      throw new Error('Email sign in failed');
    }

    return result.user.uid;
  } catch (error) {
    console.error('Error signing in with email', error);
  }
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);

    if (!result || !result.user) {
      throw new Error('Google sign in failed');
    }
    console.log('result', result);
    return result.user.uid;
  } catch (error) {
    console.error('Error signing in with Google', error);
  }
}

export async function signOut() {
  try {
    await auth.signOut();
  } catch (error) {
    console.error('Error signing out with Google', error);
  }
}

export async function getCurrentUser() {
  return auth.currentUser;
}