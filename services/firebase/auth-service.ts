import {
  type User,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { db, auth, storage } from '@/firebase/client';
import { addDoc, setDoc, getDoc, getDocs, deleteDoc, doc, collection } from 'firebase/firestore';
import { sign } from 'crypto';

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

export async function addNewCulinary(
  name: string,
  email: string,
  password: string,
) {
  try {
    const uid = await signUpWithEmail(email, password);
    const culinaryRef = doc(db, 'kuliner', uid? uid : '');
    const result = await setDoc(culinaryRef, {
      nama: name,
    });
    const culinaryDoc = await getDoc(culinaryRef);
    const culinaryData = { id: culinaryDoc.id, ...culinaryDoc.data() };

    return culinaryData;
  } catch (error) {
    console.error('Error adding new culinary', error);
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

export async function checkCulinaryExist(uid: string) {
  try {
    const culinaryRef = doc(db, 'kuliner', uid);
    const culinaryDoc = await getDoc(culinaryRef);

    return culinaryDoc.exists();
  } catch (error) {
    console.error('Error checking culinary exist', error);
    return false;
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