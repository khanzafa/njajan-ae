'use client';

import { Balasan, Ulasan } from '@/services/firebase/ulasan-service';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

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
    }, [kulinerId]);

    const openDetail = (ulasan: any) => {
        setSelectedUlasan(ulasan);
    };

    const closeModal = () => {
        setSelectedUlasan(null);
    };

    return (
        <div className="p-4 sm:ml-64 bg-[#DBE2EF] dark:bg-[#1B262C] min-h-screen">
            <div className="p-4 border-2 border-[#B2BABB] border-dashed rounded-lg dark:border-[#DBE2EF]">
                {selectedUlasan ? (
                    <DetailUlasan ulasan={selectedUlasan} closeModal={closeModal} />
                ) : (
                    <>
                        <div className="mb-4">
                            <h1 className="text-xl font-bold">Ulasan Pelanggan</h1>
                        </div>
                        <div className="grid grid-cols-1 gap-4 z-0">
                            {daftarUlasan.map((ulasan) => (
                                <div
                                    key={ulasan.id}
                                    onClick={() => openDetail(ulasan)}
                                    className="bg-[#FFFFFF] dark:bg-[#112D4E] dark:text-white rounded shadow-md p-4 cursor-pointer"
                                >
                                    <div className="flex justify-between">
                                        <h2 className="text-lg font-medium text-gray-300">{ulasan.nama}</h2>
                                        <p className="text-gray-500">{new Date(ulasan.waktu.seconds * 1000).toLocaleString()}</p>
                                    </div>
                                    <p className="text-white mb-2">{ulasan.ulasan}</p>
                                    <div className="flex items-center">
                                        <span className={`inline-block rounded-full px-2 py-1 text-sm font-semibold ${ulasan.rating >= 4 ? 'bg-green-500' : 'bg-red-500'} text-white mr-2`}>
                                            {ulasan.rating}
                                        </span>
                                        <p className="text-gray-500">Rating</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export function DetailUlasan({ ulasan, closeModal }: { ulasan: any, closeModal: () => void }) {
    const [balasanList, setBalasanList] = useState<any[]>([]);
    const [newBalasan, setNewBalasan] = useState<string>('');

    const router = useRouter();
    const { kulinerId } = useParams();

    async function fetchBalasan() {
        const data = await fetch(`/api/kuliner/${kulinerId}/ulasan/${ulasan.id}/balasan`).then(res => res.json());
        setBalasanList(data);
    }

    useEffect(() => {
        fetchBalasan();
    }, [ulasan, kulinerId]);

    const handleBalasanChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewBalasan(e.target.value);
    };

    const handleBalasanSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newBalasanObj = {
            nama: 'Admin',
            balasan: newBalasan,
            waktu: new Date(),
        };

        await fetch(`/api/kuliner/${kulinerId}/ulasan/${ulasan.id}/balasan`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBalasanObj),
        });

        fetchBalasan();
        setNewBalasan('');
    };

    return (
        <>
            <div className="p-4 mb-4 bg-[#FFFFFF] dark:bg-[#112D4E] dark:text-white rounded-md">
                <div className="flex justify-between mb-2">
                    <h2 id="modal-title" className="text-xl font-medium text-[#112D4E] dark:text-[#F9F7F7]">{ulasan.nama}</h2>
                    <button
                        onClick={closeModal}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                        </svg>
                    </button>
                </div>
                <p id="modal-description" className="text-gray-600 mb-2 dark:text-gray-300">{ulasan.ulasan}</p>
                <p className="text-gray-500 mb-4 dark:text-gray-400">{new Date(ulasan.waktu.seconds * 1000).toLocaleString()}</p>
                <div className="flex items-center mb-4">                
                {Array.from({ length: 5 }, (v, i) => (
                    <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        fill={i < Math.floor(ulasan.rating) ? "currentColor" : "none"}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className={`mx-1 w-5 h-5 ${i < Math.floor(ulasan.rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.017 6.158a1 1 0 00.95.69h6.462c.97 0 1.371 1.24.588 1.81l-5.22 3.73a1 1 0 00-.364 1.118l2.017 6.158c.3.921-.755 1.688-1.538 1.118l-5.22-3.73a1 1 0 00-1.176 0l-5.22 3.73c-.783.57-1.838-.197-1.538-1.118l2.017-6.158a1 1 0 00-.364-1.118l-5.22-3.73c-.783-.57-.383-1.81.588-1.81h6.462a1 1 0 00.95-.69l2.017-6.158z"
                        />
                    </svg>
                ))}                
            </div>
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-medium text-[#112D4E] dark:text-[#F9F7F7]">Balasan</h3>
                <div className="space-y-2 mt-2">
                    {balasanList.map((balasan) => (
                        <div key={balasan.id} className="bg-[#FFFFFF] dark:bg-[#112D4E] dark:text-white p-3 rounded-md">
                            <p className="text-gray-800 dark:text-gray-200"><strong>{balasan.nama}:</strong> {balasan.balasan}</p>
                            <p className="text-gray-500 text-sm dark:text-gray-400">{new Date(balasan.waktu.seconds * 1000).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            </div>
            <form onSubmit={handleBalasanSubmit}>
                <div className="mb-4">
                    <textarea
                        id="balasan"
                        name="balasan"
                        value={newBalasan}
                        onChange={handleBalasanChange}
                        className="w-full p-2 border rounded-md bg-[#DBE2EF] dark:bg-[#1B262C] dark:border-gray-600 dark:text-white"
                        placeholder="Tulis balasan..."
                        rows={3}
                        required
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-[#3F72AF] text-white px-4 py-2 rounded-md hover:bg-[#112D4E] focus:outline-none focus:ring-2 focus:ring-[#3F72AF] dark:bg-[#3F72AF] dark:hover:bg-[#112D4E] dark:focus:ring-[#3F72AF]"
                    >
                        Kirim Balasan
                    </button>
                </div>
            </form>
        </>
    );
    
}
