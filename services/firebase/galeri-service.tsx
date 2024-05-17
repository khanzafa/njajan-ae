import firebase from 'firebase/app';
import 'firebase/firestore';
import { db, auth, storage } from '@/firebase/config';
import { addDoc, setDoc, getDoc, getDocs, deleteDoc, doc, collection } from 'firebase/firestore';
import { set } from 'firebase/database';


export type Foto = {
    id: string;
    url: string;
}