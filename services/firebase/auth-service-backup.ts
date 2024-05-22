// Firebase
import firebase from 'firebase/app';
import auth, { db, storage } from '@/firebase/client';

// Firestore
import 'firebase/firestore';
import { addDoc, setDoc, getDoc, getDocs, deleteDoc, doc, collection } from 'firebase/firestore';

// Storage
import {
    ref,
    uploadString,
    uploadBytes,
    deleteObject,
    uploadBytesResumable,
    getMetadata,
    updateMetadata,
    getDownloadURL,
    list,
} from 'firebase/storage';

import {
    onAuthStateChanged as _onAuthStateChanged,
} from "firebase/auth";
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

const authService = {

    onAuthStateChanged(cb: any) {
        return _onAuthStateChanged(auth, cb);
    },


    // Register: Mendaftarkan user baru
    async register(email: string, password: string) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            return userCredential;
        } catch (error) {
            console.error('Error registering user: ', error);
            throw error;
        }
    },

    // Login: Melakukan login user
    async login(email: string, password: string) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential;
        } catch (error) {
            console.error('Error logging in user: ', error);
            throw error;
        }
    },

    async loginGoogle() {
        try {
            const provider = new GoogleAuthProvider();
            const userCredential = await signInWithPopup(auth, provider);
            return userCredential;
        } catch (error) {
            console.error('Error logging in user with Google: ', error);
            throw error;
        }
    },

    async logout() {
        try {
            await auth.signOut();
        } catch (error) {
            console.error('Error logging out user: ', error);
            throw error;
        }
    },

    async getUser() {
        const user = auth.currentUser;
        return user;
    }
}