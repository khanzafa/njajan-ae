'use client'

import { Menu } from '@/services/firebase/menu-service';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditMenu() {
    const router = useRouter();
    const { kulinerId, menuId } = useParams();
    const [menuData, setMenuData] = useState<Menu | null>(null);
    const [newMenuData, setNewMenuData] = useState<Menu | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            const data = await fetch(`/api/kuliner/${kulinerId}/menu/${menuId}`).then(res => res.json());
            setMenuData(data);
            setPreviewImage(data.foto);
            setNewMenuData(data);
        }
        if (menuId) {
            fetchData();
        }
    }, [menuId]);

    if (!menuData) {
        return <div>Loading...</div>;
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setNewMenuData({
            ...newMenuData,
            [name]: value,
        });
    };


    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            setNewMenuData({
                ...menuData,
                foto: URL.createObjectURL(file)
            });
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    async function handleSubmit(e: any) {
        e.preventDefault();
        // Add your submit logic here
        await fetch(`/api/kuliner/${kulinerId}/menu/${menuId}`, {
            method: 'PUT',
            body: JSON.stringify(newMenuData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        router.push(`/dashboard/${kulinerId}/menu`);

        console.log('Form data submitted:', newMenuData);
    };


    return (
        <div className="p-4 sm:ml-64">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                <div className="mb-4">
                    <h1 className="text-xl">Edit Menu</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="bg-white rounded shadow-md p-6 dark:bg-[#1B262C] dark:text-white">
                            <div className="mb-4">
                                <label htmlFor="nama" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama</label>
                                <input
                                    type="text"
                                    id="nama"
                                    name="nama"
                                    value={newMenuData?.nama}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border rounded-md bg-gray-50 dark:bg-[#1B262C] dark:border-gray-600 dark:text-white"
                                />
                            </div>
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
                            {/* <div className="mb-4">
                                <label htmlFor="kategori" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Kategori</label>
                                <input
                                    type="text"
                                    id="kategori"
                                    name="kategori"
                                    value={newMenuData?.kategori}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border rounded-md bg-gray-50 dark:bg-[#1B262C] dark:border-gray-600 dark:text-white"
                                />
                            </div> */}
                            <div className="mb-4">
                                <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Deskripsi</label>
                                <textarea
                                    id="deskripsi"
                                    name="deskripsi"
                                    value={newMenuData?.deskripsi}
                                    onChange={handleChange}
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
                            {/* Preview Image */}
                            <div className="mb-4">
                                <img src={previewImage ? previewImage : 'https://source.unsplash.com/200x200/?food'} alt="Foto Menu" />
                            </div>
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
