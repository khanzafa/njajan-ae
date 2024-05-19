'use client'
import { Menu } from '@/services/firebase/menu-service';
import { useRouter, useParams } from 'next/navigation';

import { useState } from 'react';

export default function AddMenu() {
    // const id = 'xC96zsuHoQIutgfkE5Iy';
    const { kulinerId } = useParams();
    const [menuData, setMenuData] = useState<Menu>({
        id: '',
        nama: '',
        harga: 0,
        kategori: '',
        deskripsi: '',
        foto: ''
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setMenuData({
            ...menuData,
            [name]: value,
        });
    };

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                setMenuData({
                    ...menuData,
                    foto: reader.result,
                });
            }
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const router = useRouter();

    async function handleCreate() {
        const postMenuData = {
            nama: menuData.nama,
            harga: menuData.harga,
            kategori: menuData.kategori,
            deskripsi: menuData.deskripsi,
            foto: menuData.foto
        }
        await fetch(`/api/kuliner/${kulinerId}/menu`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postMenuData),
        });
        setMenuData({
            id: '',
            nama: '',
            harga: 0,
            kategori: '',
            deskripsi: '',
            foto: ''
        });
        // navigate to kuliner page
        router.push(`/dashboard/${kulinerId}/menu`);
    }

    return (
        <div className="p-4 sm:ml-64">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                <h1 className="text-xl mb-4 flex items-center justify-between">Tambah Menu</h1>
                <form onSubmit={(e) => { e.preventDefault(); handleCreate(); }}>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="bg-white rounded shadow-md dark:bg-[#1B262C] dark:text-white p-6">
                            <div className="mb-4">
                                <label htmlFor="nama" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama</label>
                                <input
                                    type="text"
                                    id="nama"
                                    name="nama"
                                    value={menuData.nama}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border rounded-md bg-gray-50 dark:bg-[#1B262C] dark:border-gray-600 dark:text-white"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="harga" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Harga</label>
                                <input
                                    type="number"
                                    id="harga"
                                    name="harga"
                                    value={menuData.harga}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border rounded-md bg-gray-50 dark:bg-[#1B262C] dark:border-gray-600 dark:text-white"
                                />
                            </div>
                            {/* Dropdown kategori */}
                            <div className='mb-4'>
                                <label htmlFor="kategori" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Kategori</label>
                                <select
                                    id="kategori"
                                    name="kategori"
                                    value={menuData.kategori}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border rounded-md bg-gray-50 dark:bg-[#1B262C] dark:border-gray-600 dark:text-white"
                                >
                                    <option value="Makanan">Makanan</option>
                                    <option value="Minuman">Minuman</option>
                                    <option value="Cemilan">Cemilan</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Deskripsi</label>
                                <textarea
                                    id="deskripsi"
                                    name="deskripsi"
                                    value={menuData.deskripsi}
                                    onChange={handleChange}
                                    rows={3}
                                    className="mt-1 p-2 w-full border rounded-md bg-gray-50 dark:bg-[#1B262C] dark:border-gray-600 dark:text-white"
                                ></textarea>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="foto" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Foto</label>
                                <input
                                    type="file"
                                    id="foto"
                                    name="foto"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="mt-1 p-2 w-full border rounded-md bg-gray-50 dark:bg-[#1B262C] dark:border-gray-600 dark:text-white"
                                />
                            </div>
                            {menuData.foto && (
                                <div className="mb-4">
                                    <img src={menuData.foto} alt="Menu Preview" className="max-w-full h-auto" />
                                </div>
                            )}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Simpan
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
