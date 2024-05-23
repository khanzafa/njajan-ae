'use client'

import { Kuliner } from '@/services/firebase/kuliner-service';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function KulinerProfile() {
    const router = useRouter();
    const { kulinerId } = useParams();
    // const id = 'xC96zsuHoQIutgfkE5Iy';
    const id = kulinerId;
    const [kulinerData, setKulinerData] = useState<Kuliner | null>(null);

    useEffect(() => {
        async function fetchData() {
            const data = await fetch(`/api/kuliner/${id}`).then(res => res.json());
            setKulinerData(data);
        }
        if (id) {
            fetchData();
        }
    }, [id]);

    if (!kulinerData) {
        return <div>Loading...</div>;
    }    
    // const { kulinerId } = router.query;

    const handleEditClick = () => {
        router.push(`/dashboard/${kulinerId}/profile/edit`);
    };

    return (
<div className="p-4 sm:ml-64 bg-[#DBE2EF] dark:bg-[#1B262C] min-h-screen">
<div className="p-4 border-2 border-[#B2BABB] border-dashed rounded-lg dark:border-[#DBE2EF]">
        <div className="mb-4 flex justify-start">
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">Profil Kuliner</h1>
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4">
            {/* Informasi Utama */}
            <div className="bg-[#FFFFFF] dark:bg-[#112D4E] rounded shadow-md p-6">
                <div className="mb-4 flex justify-between">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white">Informasi Utama</h3>
                    <button onClick={handleEditClick} className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-500">
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.304 4.844 16.852 7.696M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                        </svg>
                    </button>
                </div>
                <div className="flex items-center mb-4">
                    <img src={kulinerData.foto} alt="Foto Profil" className="w-24 h-24 rounded-full object-cover mr-4" />
                    <div>
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">{kulinerData.nama}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{kulinerData.jenis}</p>
                    </div>
                </div>
                <div className="flex flex-col space-y-2 text-gray-800 dark:text-white">
                    <p><span className="font-semibold">Jenis Kuliner:</span> {kulinerData.jenis}</p>
                    <p><span className="font-semibold">Berdiri Sejak:</span> {kulinerData.berdiri}</p>
                    <p><span className="font-semibold">Alamat:</span> {kulinerData.alamat}</p>
                    <p><span className="font-semibold">Pemilik:</span> {kulinerData.pemilik}</p>
                    <p><span className="font-semibold">Waktu Operasional:</span> {kulinerData.waktu}</p>
                </div>
            </div>
            {/* Lokasi */}
            <div className="bg-[#FFFFFF] dark:bg-[#112D4E] rounded shadow-md p-6">
                <div className="mb-4">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white">Lokasi</h3>
                </div>
                <div className="h-64 w-full rounded bg-[#F9F7F7] dark:bg-[#112D4E]">
                    <iframe src={kulinerData.gmaps} className="h-full w-full rounded" loading="lazy"></iframe>
                </div>
            </div>
        </div>
    </div>
</div>

    );
}
