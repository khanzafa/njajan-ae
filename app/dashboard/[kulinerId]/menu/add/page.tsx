'use client'
import { Menu } from '@/services/firebase/menu-service';
import { useRouter, useParams } from 'next/navigation';

import { useState } from 'react';

export default function AddMenu() {
    // const id = 'xC96zsuHoQIutgfkE5Iy';
    const { kulinerId } = useParams();
    const [menuData, setMenuData] = useState<any | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setMenuData({
            ...menuData,
            [name]: value,
        });
    };

    // const handleImageChange = (e: any) => {
    //     const file = e.target.files[0];
    //     const reader = new FileReader();

    //     reader.onloadend = () => {
    //         if (typeof reader.result === 'string') {
    //             setMenuData({
    //                 ...menuData,
    //                 foto: reader.result,
    //             });
    //         }
    //     };

    //     if (file) {
    //         reader.readAsDataURL(file);
    //     }
    // };

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            setMenuData({
                ...menuData,
                foto: file
            });
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const router = useRouter();

    async function handleCreate() {
        const formData = new FormData();
        for (const key in menuData) {
            formData.append(key, menuData[key]);
        }
        await fetch(`/api/kuliner/${kulinerId}/menu`, {
            method: 'POST',
            body: formData
        });
        // await fetch(`/api/kuliner/${kulinerId}/menu`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(postMenuData),
        // });
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
        console.log("Menu data submitted:", menuData)
    }

    return (
        <div className="p-4 sm:ml-64 bg-[#DBE2EF] dark:bg-[#1B262C] min-h-screen">
            <div className="p-4 border-2 border-[#B2BABB] border-dashed rounded-lg dark:border-[#DBE2EF]">
                <h1 className="text-xl font-bold mb-4 flex items-center justify-between text-[#112D4E] dark:text-[#F9F7F7]">Tambah Menu</h1>
                <form onSubmit={(e) => { e.preventDefault(); handleCreate(); }}>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="bg-[#F9F7F7] dark:bg-[#112D4E] rounded shadow-md p-6">
                            <div className="mb-4">
                                <label htmlFor="nama" className="block text-sm font-medium text-[#112D4E] dark:text-[#F9F7F7]">Nama</label>
                                <input
                                    type="text"
                                    id="nama"
                                    name="nama"
                                    value={menuData?.nama}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border rounded-md bg-[#DBE2EF] dark:bg-[#1B262C] dark:border-[#DBE2EF] dark:text-[#F9F7F7]"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="harga" className="block text-sm font-medium text-[#112D4E] dark:text-[#F9F7F7]">Harga</label>
                                <input
                                    type="number"
                                    id="harga"
                                    name="harga"
                                    value={menuData?.harga}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border rounded-md bg-[#DBE2EF] dark:bg-[#1B262C] dark:border-[#DBE2EF] dark:text-[#F9F7F7]"
                                />
                            </div>
                            {/* Dropdown kategori */}
                            <div className='mb-4'>
                                <label htmlFor="kategori" className="block text-sm font-medium text-[#112D4E] dark:text-[#F9F7F7]">Kategori</label>
                                <select
                                    id="kategori"
                                    name="kategori"
                                    value={menuData?.kategori}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border rounded-md bg-[#DBE2EF] dark:bg-[#1B262C] dark:border-[#DBE2EF] dark:text-[#F9F7F7]"
                                >
                                    <option value="Makanan">Makanan</option>
                                    <option value="Minuman">Minuman</option>
                                    <option value="Cemilan">Cemilan</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="deskripsi" className="block text-sm font-medium text-[#112D4E] dark:text-[#F9F7F7]">Deskripsi</label>
                                <textarea
                                    id="deskripsi"
                                    name="deskripsi"
                                    value={menuData?.deskripsi}
                                    onChange={handleChange}
                                    rows={3}
                                    className="mt-1 p-2 w-full border rounded-md bg-[#DBE2EF] dark:bg-[#1B262C] dark:border-[#DBE2EF] dark:text-[#F9F7F7]"
                                ></textarea>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="foto" className="block text-sm font-medium text-[#112D4E] dark:text-[#F9F7F7]">Foto</label>
                                <input
                                    type="file"
                                    id="foto"
                                    name="foto"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="mt-1 p-2 w-full border rounded-md bg-[#DBE2EF] dark:bg-[#1B262C] dark:border-[#DBE2EF] dark:text-[#F9F7F7]"
                                />
                            </div>
                            {menuData?.foto && (
                                <div className="mb-4">
                                    <img src={previewImage!} alt="Menu Preview" className="max-w-full h-auto" />
                                </div>
                            )}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-[#3F72AF] text-white px-4 py-2 rounded-md hover:bg-[#112D4E] focus:outline-none focus:ring-2 focus:ring-[#3F72AF] dark:bg-[#3F72AF] dark:hover:bg-[#112D4E] dark:focus:ring-[#3F72AF]"
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
