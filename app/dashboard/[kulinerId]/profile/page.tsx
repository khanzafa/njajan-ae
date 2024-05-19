'use client'

import { Kuliner } from '@/services/firebase/kuliner-service';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function KulinerProfile() {
    // const kulinerData = {
    //     id: '1',
    //     nama: 'Restoran ABC',
    //     jenis: 'Masakan Italia',
    //     berdiri: 1998,
    //     alamat: 'Jalan Pahlawan No. 123, Jakarta',
    //     pemilik: 'John Doe',
    //     waktu: '10:00 - 22:00',
    //     foto: 'https://source.unsplash.com/200x200/?restaurant',
    //     gmaps: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.073013073073!2d106.822242314769!3d-6.175392995527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5b6b7b7b7b7%3A0x2e69f5b6b7b7b7b7!2sMonumen%20Nasional!5e0!3m2!1sid!2sid!4v1633663666824!5m2!1sid!2sid'
    // };

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

    const router = useRouter();
    // const { kulinerId } = router.query;

    const handleEditClick = () => {
        router.push(`/dashboard/${kulinerId}/profile/edit`);
    };

    return (
        <div className="p-4 sm:ml-64">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                <div className="mb-4 flex justify-start">
                    <h1 className="text-xl">Profil Kuliner</h1>
                </div>
                <div className="mb-4">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{kulinerData.nama}</h2>
                </div>
                <div className="grid grid-cols-1 gap-4 mb-4">
                    {/* Informasi Utama */}
                    <div className="bg-white rounded shadow-md p-6 dark:bg-[#1B262C] dark:text-white">
                    <div className="mb-4 flex justify-between">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Informasi Utama</h3>
                        <button onClick={handleEditClick} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600">
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex items-center mb-4">
                        <img src={kulinerData.foto} alt="Foto Profil" className="w-24 h-24 rounded-full object-cover mr-4" />
                        <div>
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">{kulinerData.nama}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{kulinerData.jenis}</p>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <p><span className="font-semibold">Jenis Kuliner:</span> {kulinerData.jenis}</p>
                        <p><span className="font-semibold">Berdiri Sejak:</span> {kulinerData.berdiri}</p>
                        <p><span className="font-semibold">Alamat:</span> {kulinerData.alamat}</p>
                        <p><span className="font-semibold">Pemilik:</span> {kulinerData.pemilik}</p>
                        <p><span className="font-semibold">Waktu Operasional:</span> {kulinerData.waktu}</p>
                    </div>
                </div>
                    {/* Statistik */}
                    {/* <div className="bg-white rounded shadow-md p-6 dark:bg-[#1B262C] dark:text-white">
                        <div className="mb-4">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Statistik</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            
                            <div className="flex flex-col justify-center items-center bg-gray-100 rounded p-4 dark:bg-gray-800">
                                <svg className="w-8 h-8 mb-2 text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.042 8.042l-1.414-1.414a8 8 0 111.414 1.414zM9 4v7h3a1 1 0 000-2H9V4zM14 9a1 1 0 110-2 1 1 0 010 2z" />
                                </svg>
                                <p className="text-xl font-medium text-gray-900 dark:text-white">Rating</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">4.5</p>
                            </div>
                            
                            <div className="flex flex-col justify-center items-center bg-gray-100 rounded p-4 dark:bg-gray-800">
                                <svg className="w-8 h-8 mb-2 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5v14a1 1 0 000 2h8a1 1 0 100-2V5a1 1 0 00-1-1H8zm0 11a1 1 0 110-2 1 1 0 010 2zM11 8a1 1 0 110-2 1 1 0 010 2z" />
                                </svg>
                                <p className="text-xl font-medium text-gray-900 dark:text-white">Ulasan</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">125</p>
                            </div>
                        </div>
                    </div> */}
                    {/* Lokasi */}
                    <div className="bg-white rounded shadow-md p-6 dark:bg-[#1B262C] dark:text-white">
                        <div className="mb-4">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Lokasi</h3>
                        </div>
                        <div className="h-64 w-full rounded bg-gray-100 dark:bg-gray-800">
                            {/* Integrasi Peta (misalnya Google Maps) bisa ditambahkan di sini */}
                            <iframe src={kulinerData.gmaps} className="h-full w-full rounded" loading="lazy"></iframe>
                            {/* <p className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500">Peta Lokasi</p> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
