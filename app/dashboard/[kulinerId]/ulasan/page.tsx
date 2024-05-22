'use client';

import { Balasan, Ulasan } from '@/services/firebase/ulasan-service';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import DetailUlasanModal from '@/components/Dashboard/DetailUlasanModal';

export default function UlasanPage() {
    const { kulinerId } = useParams();
    const [daftarUlasan, setDaftarUlasan] = useState<any[]>([]);
    const [selectedUlasan, setSelectedUlasan] = useState<Ulasan | null>(null);

    async function fetchUlasan() {
        const data = await fetch(`/api/kuliner/${kulinerId}/ulasan`).then(res => res.json());
        setDaftarUlasan(data);
    }

    useEffect(() => {
        fetchUlasan();
    }, []);

    const openModal = (ulasan: Ulasan) => {
        setSelectedUlasan(ulasan);
    };

    const closeModal = () => {
        setSelectedUlasan(null);
    };

    return (
        <div className="p-4 sm:ml-64">
            {!selectedUlasan ? (
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    <div className="mb-4">
                        <h1 className="text-xl">Ulasan Pelanggan</h1>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        {daftarUlasan?.map((ulasan) => (
                            <div key={ulasan.id} onClick={() => openModal(ulasan)} className="bg-white rounded shadow-md dark:bg-[#1B262C] dark:text-white p-4 cursor-pointer">
                                <div className="flex justify-between">
                                    <h2 className="text-lg font-medium">{ulasan.nama}</h2>
                                    <p className="text-gray-500">{new Date(ulasan.waktu.seconds * 1000).toLocaleString()}</p>
                                </div>
                                <p className="text-gray-600 mb-2">{ulasan.ulasan}</p>
                                <div className="flex items-center">
                                    <span className={`inline-block rounded-full px-2 py-1 text-sm font-semibold bg-${ulasan.rating >= 4 ? 'green' : 'red'}-500 text-white mr-2`}>
                                        {ulasan.rating}
                                    </span>
                                    <p className="text-gray-500">Rating</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )
                :
                (
                    <DetailUlasanModal isOpen={!!selectedUlasan} onRequestClose={closeModal} ulasan={selectedUlasan} />
                )
            }
        </div>
    );
}
