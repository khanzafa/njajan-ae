'use client'

import { Kuliner } from '@/services/firebase/kuliner-service';
import { set } from 'firebase/database';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditKulinerProfile() {
    const router = useRouter();
    // const { kulinerId } = router.query;

    // Data dummy
    // const initialData = {
    //     id: '1',
    //     nama: 'Restoran ABC',
    //     jenis: 'Masakan Italia',
    //     berdiri: 1998,
    //     alamat: 'Jalan Pahlawan No. 123, Jakarta',
    //     pemilik: 'John Doe',
    //     waktu: '10:00 - 22:00',
    //     foto: 'https://via.placeholder.com/150' // URL foto profil awal
    // };

    // const id = 'xC96zsuHoQIutgfkE5Iy';
    const { kulinerId } = useParams();
    const id = kulinerId;
    const [kulinerData, setKulinerData] = useState<Kuliner | null>(null);
    const [newKulinerData, setNewKulinerData] = useState<Kuliner | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            const data = await fetch(`/api/kuliner/${id}`).then(res => res.json());
            setKulinerData(data);
            setPreviewImage(data.foto);
            setNewKulinerData(data);
        }
        if (id) {
            fetchData();
        }
    }, [id]);

    if (!kulinerData) {
        return <div>Loading...</div>;
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setNewKulinerData({
            ...newKulinerData,
            [name]: value,
        });
    };


    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            setNewKulinerData({
                ...kulinerData,
                foto: URL.createObjectURL(file)
            });
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    async function handleSubmit(e: any){
        e.preventDefault();
        // Add your submit logic here
        await fetch(`/api/kuliner/${id}`, {
            method: 'PUT',
            body: JSON.stringify(newKulinerData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        router.push(`/dashboard/${kulinerId}/profile`);

        console.log('Form data submitted:', newKulinerData);
    };

    return (
        <div className="p-4 sm:ml-64">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                <div className="mb-4 flex justify-start">
                    <h1 className="text-xl">Edit Profil Kuliner</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-4 mb-4">
                        <div className="bg-white rounded shadow-md p-6 dark:bg-[#1B262C] dark:text-white">
                            <div className="mb-4 flex flex-col items-center">
                                <label htmlFor="foto" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Foto Profil</label>
                                <img src={previewImage!} alt="Foto Profil" className="w-24 h-24 rounded-full object-cover mb-4" />
                                <input
                                    type="file"
                                    id="foto"
                                    name="foto"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="mt-1 p-2 w-full border rounded-md bg-gray-50 dark:bg-[#1B262C] dark:border-gray-600 dark:text-white"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="nama" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama</label>
                                <input
                                    type="text"
                                    id="nama"
                                    name="nama"
                                    value={newKulinerData?.nama}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border rounded-md bg-gray-50 dark:bg-[#1B262C] dark:border-gray-600 dark:text-white"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="jenis" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Jenis Kuliner</label>
                                <input
                                    type="text"
                                    id="jenis"
                                    name="jenis"
                                    value={newKulinerData?.jenis}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border rounded-md bg-gray-50 dark:bg-[#1B262C] dark:border-gray-600 dark:text-white"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="berdiri" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tahun Berdiri</label>
                                <input
                                    type="number"
                                    id="berdiri"
                                    name="berdiri"
                                    value={newKulinerData?.berdiri}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border rounded-md bg-gray-50 dark:bg-[#1B262C] dark:border-gray-600 dark:text-white"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="alamat" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Alamat</label>
                                <input
                                    type="text"
                                    id="alamat"
                                    name="alamat"
                                    value={newKulinerData?.alamat}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border rounded-md bg-gray-50 dark:bg-[#1B262C] dark:border-gray-600 dark:text-white"
                                />
                            </div>
                            {/* Gmaps */}
                            <div className="mb-4">
                                <label htmlFor="gmaps" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Google Maps</label>
                                <input
                                    type="text"
                                    id="gmaps"
                                    name="gmaps"
                                    value={newKulinerData?.gmaps}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border rounded-md bg-gray-50 dark:bg-[#1B262C] dark:border-gray-600 dark:text-white"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="pemilik" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Pemilik</label>
                                <input
                                    type="text"
                                    id="pemilik"
                                    name="pemilik"
                                    value={newKulinerData?.pemilik}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border rounded-md bg-gray-50 dark:bg-[#1B262C] dark:border-gray-600 dark:text-white"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="waktu" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Jam Operasional</label>
                                <input
                                    type="text"
                                    id="waktu"
                                    name="waktu"
                                    value={newKulinerData?.waktu}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border rounded-md bg-gray-50 dark:bg-[#1B262C] dark:border-gray-600 dark:text-white"
                                />
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
