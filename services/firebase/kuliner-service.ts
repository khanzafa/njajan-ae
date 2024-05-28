// service/firebase/kuliner-service.ts
import firebase from 'firebase/app';
import 'firebase/firestore';
import { db, auth, storage } from '@/firebase/client';
import { addDoc, setDoc, getDoc, getDocs, deleteDoc, doc, collection } from 'firebase/firestore';
import { set } from 'firebase/database';

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
import { addNewCulinary } from '@/services/firebase/auth-service';

const firestore = db;

export type Kuliner = {
    id?: string;
    nama?: string;
    jenis?: string;
    berdiri?: number;
    alamat?: string;
    pemilik?: string;
    waktu?: string;
    foto?: string;
    gmaps?: string;
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
            console.log('Updated data: ', updatedData)
            const kulinerRef = doc(firestore, 'kuliner', kulinerId);
            const recentData = await getDoc(kulinerRef);
            
            if (updatedData.foto) {
                const storageRef = ref(storage, `kuliner/${kulinerId}/${updatedData.foto.name}`);
                await uploadBytes(storageRef, updatedData.foto);
                const url = await getDownloadURL(storageRef);
                updatedData.foto = url;
            }
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
    },

    // Dummy
    
    async createAndPopulateDummyData() {
        const dataKuliner = [
            {
              "nama": "Warung Makan Sederhana",
              "jenis": "Masakan Padang",
              "berdiri": 2003,
              "alamat": "Jalan Pahlawan No. 123, Jakarta",
              "pemilik": "Yanto",
              "waktu": "08:00 - 21:00",
              "foto": "dummy.jpg",
              "gmaps": "https://goo.gl/maps/example"
            },
            {
              "nama": "Bang Oya Sop Kaki Kambing",
              "jenis": "Indonesia",
              "berdiri": 2010,
              "alamat": "Jl. Arief Rahman Hakim No. 207, Sukolilo, Surabaya",
              "pemilik": "Bang Oya",
              "waktu": "18:00 - 24:00",
              "foto": "dummy.jpg",
              "gmaps": "https://goo.gl/maps/example"
            },
            {
              "nama": "Pisang Ribut",
              "jenis": "Snack",
              "berdiri": 2015,
              "alamat": "Jl. Kejawan Gebang No. 7, Sukolilo, Surabaya",
              "pemilik": "Budi",
              "waktu": "09:00 - 21:00",
              "foto": "dummy.jpg",
              "gmaps": "https://goo.gl/maps/example"
            },
            {
              "nama": "Foremore",
              "jenis": "Kafe",
              "berdiri": 2018,
              "alamat": "Jl. Dr. Ir. H. Soekarno No. 256, Sukolilo, Surabaya",
              "pemilik": "Foremore Group",
              "waktu": "11:00 - 23:00",
              "foto": "dummy.jpg",
              "gmaps": "https://goo.gl/maps/example"
            },
            {
              "nama": "Soto Ayam Lamongan Cak Har",
              "jenis": "Indonesia",
              "berdiri": 2012,
              "alamat": "Jl. Dr. Ir. H. Soekarno No. 220, Sukolilo, Surabaya",
              "pemilik": "Cak Har",
              "waktu": "10:00 - 22:00",
              "foto": "dummy.jpg",
              "gmaps": "https://goo.gl/maps/example"
            },
            {
              "nama": "Bakso Pak Djo",
              "jenis": "Indonesia",
              "berdiri": 2000,
              "alamat": "Jl. Manyar Tirtoasri XII No. 2, Sukolilo, Surabaya",
              "pemilik": "Pak Djo",
              "waktu": "10:00 - 22:00",
              "foto": "dummy.jpg",
              "gmaps": "https://goo.gl/maps/example"
            },
            {
              "nama": "Gogogi Korean Grill",
              "jenis": "Korea",
              "berdiri": 2020,
              "alamat": "Ruko Icon 21, Blok R No. 8, Jl. Dr. Ir. H. Soekarno, Sukolilo, Surabaya",
              "pemilik": "Gogogi Group",
              "waktu": "11:00 - 23:00",
              "foto": "dummy.jpg",
              "gmaps": "https://goo.gl/maps/example"
            },
            {
              "nama": "Tropikal Coffee",
              "jenis": "Kafe",
              "berdiri": 2016,
              "alamat": "Jl. Keputih Timur Jaya No. 20A, Sukolilo, Surabaya",
              "pemilik": "Tropikal Group",
              "waktu": "08:00 - 22:00",
              "foto": "dummy.jpg",
              "gmaps": "https://goo.gl/maps/example"
            },
            {
              "nama": "Bakso Boedjangan",
              "jenis": "Indonesia",
              "berdiri": 2014,
              "alamat": "Jl. Raya Manyar No. 85 - 87 (Seberang Terminal Bratang), Sukolilo, Surabaya",
              "pemilik": "Pak Boedjangan",
              "waktu": "09:00 - 21:00",
              "foto": "dummy.jpg",
              "gmaps": "https://goo.gl/maps/example"
            },
            {
              "nama": "Kampoeng Steak",
              "jenis": "Barat",
              "berdiri": 2011,
              "alamat": "Jl. Nginden Intan No. 22, Sukolilo, Surabaya",
              "pemilik": "Kampoeng Group",
              "waktu": "10:00 - 22:00",
              "foto": "dummy.jpg",
              "gmaps": "https://goo.gl/maps/example"
            }
          ]

        try {            
            // Iterate over the ranking array to add new culinary accounts and update details
            for (const kuliner of dataKuliner) {
                const { nama, jenis, berdiri, alamat, pemilik, waktu, foto, gmaps } = kuliner;

                // Step 1: Create a new culinary account (assuming email and password are generated)
                const email = `${nama.replace(/\s+/g, '').toLowerCase()}@example.com`;
                const password = "password123";
                const result = await addNewCulinary(nama, email, password);

                if (result) {
                    console.log('New culinary account created successfully:', result);
                }

                const uid = result?.id; // Adjust based on your implementation

                // Step 2: Update the culinary details
                const updatedCulinaryDetails = {
                    id: uid, // make sure you use the correct id
                    nama,
                    jenis,
                    berdiri,
                    alamat,
                    pemilik,
                    waktu,
                    // foto: new File([""], foto), // This should be a File object
                    gmaps
                };

                await kulinerService.updateKuliner(uid, updatedCulinaryDetails);
                console.log('Culinary details updated successfully');
            }
        } catch (error) {
            console.error('Error creating and populating dummy data:', error);
        }
    }
};

export default kulinerService;
