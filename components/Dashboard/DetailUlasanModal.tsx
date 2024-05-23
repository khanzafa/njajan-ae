'use client';

import { Balasan, Ulasan } from '@/services/firebase/ulasan-service';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
// import Modal from 'react-modal';
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

// Modal.setAppElement('#__next');

type DetailUlasanModalProps = {
    isOpen: boolean;
    onRequestClose: () => void;
    ulasan: any;
};

const DetailUlasanModal: React.FC<DetailUlasanModalProps> = ({ isOpen, onRequestClose, ulasan }) => {
    const [balasanList, setBalasanList] = useState<any[]>([]);
    const [newBalasan, setNewBalasan] = useState<string>('');

    const router = useRouter();
    const { kulinerId } = useParams();

    // Fetch balasan ulasan
    async function fetchBalasan() {
        const data = await fetch(`/api/kuliner/${kulinerId}/ulasan/${ulasan.id}/balasan`).then(res => res.json());
        setBalasanList(data);
    }

    useEffect(() => {
        if (isOpen) {
            fetchBalasan();
        }
    }, [isOpen, ulasan]);

    const handleBalasanChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewBalasan(e.target.value);
    };

    const handleBalasanSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Proses pengiriman balasan
        const newBalasanObj = {
            nama: 'Admin', // Sesuaikan dengan nama pengguna saat ini
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
<Modal
    isOpen={isOpen}
    onClose={onRequestClose}
    aria-labelledby="modal-title"
    aria-describedby="modal-description"
    className="fixed bg-black bg-opacity-50"
>
    <div className="p-4 sm:ml-64 flex justify-center bg-black bg-opacity-50">
        <div className="bg-white dark:bg-[#1B262C] rounded shadow-md p-6 dark:text-white">
            <div className="mb-4 flex justify-between">
                <h2 id="modal-title" className="text-xl font-medium text-[#112D4E] dark:text-[#F9F7F7]">{ulasan.nama}</h2>
                <button onClick={onRequestClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                    </svg>
                </button>
            </div>
            <p id="modal-description" className="text-gray-600 mb-2 dark:text-gray-300">{ulasan.ulasan}</p>
            <p className="text-gray-500 mb-4 dark:text-gray-400">{new Date(ulasan.waktu.seconds * 1000).toLocaleString()}</p>
            <div className="flex items-center mb-4">
                <span className={`inline-block rounded-full px-2 py-1 text-sm font-semibold ${ulasan.rating >= 4 ? 'bg-green-500' : 'bg-red-500'} text-white mr-2`}>
                    {ulasan.rating}
                </span>
                <p className="text-gray-500 dark:text-gray-400">Rating</p>
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-medium text-[#112D4E] dark:text-[#F9F7F7]">Balasan</h3>
                <div className="space-y-2 mt-2">
                    {balasanList.map((balasan) => (
                        <div key={balasan.id} className="bg-[#DBE2EF] dark:bg-gray-800 p-3 rounded-md">
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
        </div>
    </div>
</Modal>

    );
};

export default DetailUlasanModal;
