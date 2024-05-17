import firebase from 'firebase/app';
import 'firebase/firestore';
import { db, auth, storage } from '@/firebase/config';
import { addDoc, setDoc, getDoc, getDocs, deleteDoc, doc, collection } from 'firebase/firestore';
import { set } from 'firebase/database';

const firestore = db;

export type Kuliner = {
    id: string;
    nama: string;
    jenis: string;
    berdiri: number;
    alamat: string;
    pemilik: string;
    waktu: string;
}

const kulinerService = {
    // Read: Mengambil semua data profil kuliner dari Firestore
    async getDaftarKuliner() {
        try {
            const kulinerCollection = collection(firestore, 'kuliner');
            const kulinerSnapshot = await getDocs(kulinerCollection);
            const kulinerList = kulinerSnapshot.docs.map(doc => {return {id: doc.id, ...doc.data()} as Kuliner});
            return kulinerList;
        } catch (error) {
            console.error('Error getting kuliner: ', error);
            return [];
        }
    },

    // Create: Menambahkan profil kuliner baru ke dalam Firestore
    async addKuliner(kulinerData: any) {
        try {
            await addDoc(collection(firestore, 'kuliner'), kulinerData);
        } catch (error) {
            console.error('Error adding kuliner: ', error);
        }
    },



    // Read: Mengambil data profil kuliner dari Firestore berdasarkan ID
    async getKuliner(kulinerId: any) {
        try {
            const kulinerRef = doc(firestore, 'kuliner', kulinerId);
            const kulinerDoc = await getDoc(kulinerRef);
            const kulinerData = {id: kulinerDoc.id, ...kulinerDoc.data()} as Kuliner;            
            if (kulinerDoc.exists()) {
                return kulinerData;
            } else {
                console.error('No such document!');
                return null;
            }
        } catch (error) {
            console.error('Error getting kuliner: ', error);
            return null;
        }
    },

    // Update: Memperbarui data profil kuliner yang sudah ada di Firestore
    async updateKuliner(kulinerId: any, updatedData: any) {
        try {
            const kulinerRef = doc(firestore, 'kuliner', kulinerId);
            const recentData = await getDoc(kulinerRef);
            // Merge recent data with updated data
            updatedData = {...recentData.data(), ...updatedData};
            await setDoc(kulinerRef, updatedData);
        } catch (error) {
            console.error('Error updating kuliner: ', error);
        }
    },

    // Delete: Menghapus data profil kuliner dari Firestore
    async deleteKuliner(kulinerId: any) {
        try {
            const kulinerRef = doc(firestore, 'kuliner', kulinerId);
            const data = await getDoc(kulinerRef);
            if (!data.exists()) {
                console.error('No such document!');
                return;
            }
            console.log("Document data:", data.data());
            await deleteDoc(kulinerRef);
        } catch (error) {
            console.error('Error deleting kuliner: ', error);
        }
    }
};

export default kulinerService;
