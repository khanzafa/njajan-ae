import firebase from 'firebase/app';
import 'firebase/firestore';
import auth, { db, storage } from '@/firebase/client';
import { addDoc, setDoc, getDoc, getDocs, deleteDoc, doc, collection } from 'firebase/firestore';
import { set } from 'firebase/database';
import kulinerService, { Kuliner } from './kuliner-service';

const firestore = db;

export type Ulasan = {
    id: string;
    nama: string;
    ulasan: string;
    rating: number;
    waktu: Date;
}

export type Balasan = {
    id: string;
    nama: string;
    balasan: string;
    waktu: Date;
}

const ulasanService = {
    // Read: Mengambil semua data profil kuliner dari Firestore
    async getDaftarUlasan(kulinerId: string) {
        try {
            const kulinerRef = doc(firestore, 'ulasanKuliner', kulinerId);
            const ulasanCollection = collection(kulinerRef, 'ulasan');
            const ulasanSnapshot = await getDocs(ulasanCollection);
            const ulasanList = ulasanSnapshot.docs.map(doc => { return { id: doc.id, ...doc.data() } as Ulasan });
            return ulasanList;
        } catch (error) {
            console.error('Error getting ulasan: ', error);
            return [];
        }
    },

    // Create: Menambahkan profil kuliner baru ke dalam Firestore
    async addUlasan(kulinerId: string, ulasanData: any) {
        try {
            const kulinerRef = doc(firestore, 'ulasanKuliner', kulinerId);
            await addDoc(collection(kulinerRef, 'ulasan'), ulasanData);
        } catch (error) {
            console.error('Error adding ulasan: ', error);
        }
    },

    // Read: Mengambil data profil kuliner dari Firestore berdasarkan ID
    async getUlasan(kulinerId: string, ulasanId: string) {
        try {
            const kulinerRef = doc(firestore, 'ulasanKuliner', kulinerId);
            const ulasanRef = doc(kulinerRef, 'ulasan', ulasanId);
            const ulasanDoc = await getDoc(ulasanRef);
            const ulasanData = { id: ulasanDoc.id, ...ulasanDoc.data() } as Ulasan;
            if (ulasanDoc.exists()) {
                return ulasanData;
            } else {
                console.error('No such document!');
                return null;
            }
        } catch (error) {
            console.error('Error getting ulasan: ', error);
            return null;
        }
    },

    // Update: Mengupdate data profil kuliner di Firestore berdasarkan ID
    async updateUlasan(kulinerId: string, ulasanId: string, updatedUlasanData: any) {
        try {
            const kulinerRef = doc(firestore, 'ulasanKuliner', kulinerId);
            const ulasanRef = doc(kulinerRef, 'ulasan', ulasanId);
            const recentUlasan = await getDoc(ulasanRef);
            updatedUlasanData.waktu = new Date();
            updatedUlasanData = { ...recentUlasan.data(), ...updatedUlasanData };
            await setDoc(ulasanRef, updatedUlasanData);
        } catch (error) {
            console.error('Error updating ulasan: ', error);
        }
    },

    // Delete: Menghapus data profil kuliner di Firestore berdasarkan ID
    async deleteUlasan(kulinerId: string, ulasanId: string) {
        try {
            const kulinerRef = doc(firestore, 'ulasanKuliner', kulinerId);
            const ulasanRef = doc(kulinerRef, 'ulasan', ulasanId);
            await deleteDoc(ulasanRef);
        } catch (error) {
            console.error('Error deleting ulasan: ', error);
        }
    },

    // Create: Menambahkan balasan ulasan ke dalam Firestore
    async addBalasan(kulinerId: string, ulasanId: string, balasanData: any) {
        try {
            const kulinerRef = doc(firestore, 'ulasanKuliner', kulinerId);
            const ulasanRef = doc(kulinerRef, 'ulasan', ulasanId);
            await addDoc(collection(ulasanRef, 'balasan'), balasanData);
        } catch (error) {
            console.error('Error adding balasan ulasan: ', error);
        }
    },

    // Read: Mengambil balasan ulasan dari Firestore berdasarkan ID
    async getDaftarBalasan(kulinerId: string, ulasanId: string) {
        try {
            const kulinerRef = doc(firestore, 'ulasanKuliner', kulinerId);
            const ulasanRef = doc(kulinerRef, 'ulasan', ulasanId);
            const balasanCollection = collection(ulasanRef, 'balasan');
            const balasanSnapshot = await getDocs(balasanCollection);
            const balasanList = balasanSnapshot.docs.map(doc => { return { id: doc.id, ...doc.data() } as Balasan });
            return balasanList;
        } catch (error) {
            console.error('Error getting balasan: ', error);
            return [];
        }
    },

    // Read: Mengambil daftar balasan ulasan dari Firestore berdasarkan ID
    async getBalasan(kulinerId: string, ulasanId: string, balasanId: string) {
        try {
            const kulinerRef = doc(firestore, 'ulasanKuliner', kulinerId);
            const ulasanRef = doc(kulinerRef, 'ulasan', ulasanId);
            const balasanRef = doc(ulasanRef, 'balasan', balasanId);
            const balasanDoc = await getDoc(balasanRef);
            const balasanData = { id: balasanDoc.id, ...balasanDoc.data() } as Balasan;
            if (balasanDoc.exists()) {
                return balasanData;
            } else {
                console.error('No such document!');
                return null;
            }
        } catch (error) {
            console.error('Error getting balasan: ', error);
            return null;
        }
    },

    // Update: Mengupdate balasan ulasan di Firestore berdasarkan ID
    async updateBalasan(kulinerId: string, ulasanId: string, balasanId: string, balasanData: any) {
        try {
            const kulinerRef = doc(firestore, 'ulasanKuliner', kulinerId);
            const ulasanRef = doc(kulinerRef, 'ulasan', ulasanId);
            const balasanRef = doc(ulasanRef, 'balasan', balasanId);
            const balasanDoc = await getDoc(balasanRef);
            balasanData = { ...balasanDoc.data(), ...balasanData };
            await setDoc(balasanRef, balasanData);
        } catch (error) {
            console.error('Error updating balasan ulasan: ', error);
        }
    },

    // Delete: Menghapus balasan ulasan di Firestore berdasarkan ID
    async deleteBalasan(kulinerId: string, ulasanId: string, balasanId: string) {
        try {
            const kulinerRef = doc(firestore, 'ulasanKuliner', kulinerId);
            const ulasanRef = doc(kulinerRef, 'ulasan', ulasanId);
            const balasanRef = doc(ulasanRef, 'balasan', balasanId);
            await deleteDoc(balasanRef);
        } catch (error) {
            console.error('Error deleting balasan ulasan: ', error);
        }
    },

    // Read: Mengambil data semua ulasan dari semua kuliner di Firestore
    async getKulinerRanking() {
        try {
            const kulinerCollection = collection(firestore, 'ulasanKuliner');
            const kulinerSnapshot = await getDocs(kulinerCollection);
            const kulinerList = kulinerSnapshot.docs.map(doc => { return { id: doc.id, ...doc.data() } });
    
            const kulinerRanking = await Promise.all(kulinerList.map(async kuliner => {                
                const kulinerData = await kulinerService.getKuliner(kuliner.id);
                const ulasanList = await this.getDaftarUlasan(kuliner.id);
    
                let totalRating = 0;
                ulasanList.forEach(ulasan => {
                    totalRating += ulasan.rating;
                });
                const totalUlasan = ulasanList.length;
                const rating = totalUlasan > 0 ? totalRating / totalUlasan : 0;
    
                return {
                    kulinerData,
                    totalUlasan,
                    rating
                };
            }));
    
            // Sorting berdasarkan rating tertinggi dan jumlah ulasan terbanyak
            kulinerRanking.sort((a, b) => {
                if (b.rating !== a.rating) {
                    return b.rating - a.rating; // Rating tertinggi terlebih dahulu
                } else {
                    return b.totalUlasan - a.totalUlasan; // Jika rating sama, jumlah ulasan terbanyak terlebih dahulu
                }
            });
    
            return kulinerRanking;
        } catch (error) {
            console.error('Error getting ulasan: ', error);
            return [];
        }
    }

}

export default ulasanService;