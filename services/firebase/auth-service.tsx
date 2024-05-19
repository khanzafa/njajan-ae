// Firebase
import firebase from 'firebase/app';
import { db, auth, storage } from '@/firebase/config';

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

// Realtime Database
import { set } from 'firebase/database';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const authService = {
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

}