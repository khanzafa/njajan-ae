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

// Realtime Database
import { set } from 'firebase/database';


export type Foto = {
    id: string;
    url: string;
    description: string;
    time: string;
}

const galeriService = {
    // Read: Mengambil semua data foto dari storage
    async getDaftarFoto(kulinerId: string) {
        try {
            const storageRef = ref(storage, `galeriKuliner/${kulinerId}`);
            const listResult = await list(storageRef);
            const items = listResult.items;
            const fotoList = await Promise.all(items.map(async item => {
                const url = await getDownloadURL(item);
                const metadata = await getMetadata(item);
                return { 
                    id: item.name, 
                    url, 
                    description: metadata.customMetadata?.description, 
                    time: metadata.timeCreated 
                } as Foto;
            }));
            return fotoList;
        } catch (error) {
            console.error('Error getting foto: ', error);
            return [];
        }
    },

    // Create: Menambahkan foto baru ke dalam storage
    async addFoto(kulinerId: string, file: File, description: string) {
        try {
            const filename = new Date().getTime().toString();
            const storageRef = ref(storage, `galeriKuliner/${kulinerId}/${filename}`);
            const metadata = {
                customMetadata: {
                    filename: file.name,
                    description: description,
                }
            };
            await uploadBytes(storageRef, file, metadata);
        } catch (error) {
            console.error('Error adding foto: ', error);
        }
    },

    // Delete: Menghapus foto dari storage
    async deleteFoto(kulinerId: string, fotoId: string) {
        try {
            const storageRef = ref(storage, `galeriKuliner/${kulinerId}/${fotoId}`);
            await deleteObject(storageRef);
        } catch (error) {
            console.error('Error deleting foto: ', error);
        }
    },

    // Read: Mengambil data foto dari storage berdasarkan ID
    async getFoto(kulinerId: string, fotoId: string) {
        try {
            const storageRef = ref(storage, `galeriKuliner/${kulinerId}/${fotoId}`);
            const url = await getDownloadURL(storageRef);
            return { id: fotoId, url } as Foto;
        } catch (error) {
            console.error('Error getting foto: ', error);
            return null;
        }
    }
}

export default galeriService;