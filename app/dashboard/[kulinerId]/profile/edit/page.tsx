'use client'

import { Kuliner } from '@/services/firebase/kuliner-service';
import { set } from 'firebase/database';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditKulinerProfile() {
    const router = useRouter();
    const { kulinerId } = useParams();
    const id = kulinerId;
    const [kulinerData, setKulinerData] = useState<Kuliner | null>(null);
    const [newKulinerData, setNewKulinerData] = useState<any | null>(null);
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
                ...newKulinerData,
                foto: file
            });
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    async function handleSubmit(e: any) {
        e.preventDefault();
        // Add your submit logic here

        // await fetch(`/api/kuliner/${id}`, {
        //     method: 'PUT',
        //     body: JSON.stringify(newKulinerData),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // });
        const formData = new FormData();
        for (const key in newKulinerData) {
            formData.append(key, newKulinerData[key]);
        }

        await fetch(`/api/kuliner/${id}`, {
            method: 'PUT',
            body: formData,
        });
        router.push(`/dashboard/${kulinerId}/profile`);

        console.log('Form data submitted:', newKulinerData);
    };

    return (
        <div className="p-4 sm:ml-64 bg-[#DBE2EF] dark:bg-[#1B262C] min-h-screen">
            <div className="p-4 border-2 border-[#B2BABB] border-dashed rounded-lg dark:border-[#DBE2EF]">
                <div className="mb-4 flex justify-start">
                    <h1 className="text-xl font-bold text-[#112D4E] dark:text-[#F9F7F7]">Edit Profil Kuliner</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-4 mb-4">
                        <div className="bg-[#F9F7F7] dark:bg-[#112D4E] rounded shadow-md p-6">
                            <div className="mb-4 flex flex-col items-center">
                                <label htmlFor="foto" className="block text-sm font-medium text-[#112D4E] dark:text-[#F9F7F7] mb-2">Foto Profil</label>
                                <img src={previewImage!} alt="Foto Profil" className="w-24 h-24 rounded-full object-cover mb-4" />
                                <input
                                    type="file"
                                    id="foto"
                                    name="foto"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="mt-1 p-2 w-full border rounded-md bg-[#DBE2EF] dark:bg-[#1B262C] dark:border-[#DBE2EF] dark:text-[#F9F7F7]"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="nama" className="block text-sm font-medium text-[#112D4E] dark:text-[#F9F7F7]">Nama</label>
                                <input
                                    type="text"
                                    id="nama"
                                    name="nama"
                                    value={newKulinerData?.nama}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border rounded-md bg-[#DBE2EF] dark:bg-[#1B262C] dark:border-[#DBE2EF] dark:text-[#F9F7F7]"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="jenis" className="block text-sm font-medium text-[#112D4E] dark:text-[#F9F7F7]">Jenis Kuliner</label>
                                <input
                                    type="text"
                                    id="jenis"
                                    name="jenis"
                                    value={newKulinerData?.jenis}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border rounded-md bg-[#DBE2EF] dark:bg-[#1B262C] dark:border-[#DBE2EF] dark:text-[#F9F7F7]"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="berdiri" className="block text-sm font-medium text-[#112D4E] dark:text-[#F9F7F7]">Tahun Berdiri</label>
                                <input
                                    type="number"
                                    id="berdiri"
                                    name="berdiri"
                                    value={newKulinerData?.berdiri}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border rounded-md bg-[#DBE2EF] dark:bg-[#1B262C] dark:border-[#DBE2EF] dark:text-[#F9F7F7]"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="alamat" className="block text-sm font-medium text-[#112D4E] dark:text-[#F9F7F7]">Alamat</label>
                                <input
                                    type="text"
                                    id="alamat"
                                    name="alamat"
                                    value={newKulinerData?.alamat}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border rounded-md bg-[#DBE2EF] dark:bg-[#1B262C] dark:border-[#DBE2EF] dark:text-[#F9F7F7]"
                                />
                            </div>
                            {/* Gmaps */}
                            <div className="mb-4">
                                <label htmlFor="gmaps" className="block text-sm font-medium text-[#112D4E] dark:text-[#F9F7F7]">Google Maps</label>
                                <input
                                    type="text"
                                    id="gmaps"
                                    name="gmaps"
                                    value={newKulinerData?.gmaps}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border rounded-md bg-[#DBE2EF] dark:bg-[#1B262C] dark:border-[#DBE2EF] dark:text-[#F9F7F7]"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="pemilik" className="block text-sm font-medium text-[#112D4E] dark:text-[#F9F7F7]">Pemilik</label>
                                <input
                                    type="text"
                                    id="pemilik"
                                    name="pemilik"
                                    value={newKulinerData?.pemilik}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border rounded-md bg-[#DBE2EF] dark:bg-[#1B262C] dark:border-[#DBE2EF] dark:text-[#F9F7F7]"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="waktu" className="block text-sm font-medium text-[#112D4E] dark:text-[#F9F7F7]">Jam Operasional</label>
                                <input
                                    type="text"
                                    id="waktu"
                                    name="waktu"
                                    value={newKulinerData?.waktu}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border rounded-md bg-[#DBE2EF] dark:bg-[#1B262C] dark:border-[#DBE2EF] dark:text-[#F9F7F7]"
                                />
                            </div>
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
