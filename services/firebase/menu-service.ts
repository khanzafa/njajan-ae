import firebase from 'firebase/app';
import 'firebase/firestore';
import auth, { db, storage } from '@/firebase/client';
import { addDoc, setDoc, getDoc, getDocs, deleteDoc, doc, collection } from 'firebase/firestore';
import { set } from 'firebase/database';

const firestore = db;

export type Menu = {
    id?: string;
    nama?: string;
    harga?: number;
    kategori?: string;
    deskripsi?: string;
    foto?: string;
}

const menuService = {
    // Read: Mengambil semua data profil kuliner dari Firestore
    async getDaftarMenu(kulinerId: string) {
        try {
            const kulinerRef = doc(firestore, 'menuKuliner', kulinerId);
            const menuCollection = collection(kulinerRef, 'menu');
            const menuSnapshot = await getDocs(menuCollection);
            const menuList = menuSnapshot.docs.map(doc => {return {id: doc.id, ...doc.data()} as Menu});
            return menuList;
        } catch (error) {
            console.error('Error getting menu: ', error);
            return [];
        }
    },

    // Create: Menambahkan profil kuliner baru ke dalam Firestore
    async addMenu(kulinerId: string, menuData: any) {
        try {
            const kulinerRef = doc(firestore, 'menuKuliner', kulinerId);
            await addDoc(collection(kulinerRef, 'menu'), menuData);
        } catch (error) {
            console.error('Error adding menu: ', error);
        }
    },

    // Read: Mengambil data profil kuliner dari Firestore berdasarkan ID
    async getMenu(kulinerId: string, menuId: string) {
        try {
            const kulinerRef = doc(firestore, 'menuKuliner', kulinerId);
            const menuRef = doc(kulinerRef, 'menu', menuId);
            const menuDoc = await getDoc(menuRef);
            const menuData = {id: menuDoc.id, ...menuDoc.data()} as Menu;            
            if (menuDoc.exists()) {
                return menuData;
            } else {
                console.error('No such document!');
                return null;
            }
        } catch (error) {
            console.error('Error getting menu: ', error);
            return null;
        }
    },

    // Update: Mengupdate data profil kuliner di Firestore berdasarkan ID
    async updateMenu(kulinerId: string, menuId: string, updatedMenuData: any) {
        try {
            const kulinerRef = doc(firestore, 'menuKuliner', kulinerId);
            const menuRef = doc(kulinerRef, 'menu', menuId);
            const recentMenu = await getDoc(menuRef);
            updatedMenuData = {...recentMenu.data(), ...updatedMenuData};
            await setDoc(menuRef, updatedMenuData);
        } catch (error) {
            console.error('Error updating menu: ', error);
        }
    },

    // Delete: Menghapus data profil kuliner di Firestore berdasarkan ID
    async deleteMenu(kulinerId: string, menuId: string) {
        try {
            const kulinerRef = doc(firestore, 'menuKuliner', kulinerId);
            const menuRef = doc(kulinerRef, 'menu', menuId);
            await deleteDoc(menuRef);
        } catch (error) {
            console.error('Error deleting menu: ', error);
        }
    }
}

export default menuService;