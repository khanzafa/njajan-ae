'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Kuliner } from "@/services/firebase/kuliner-service";
import { useRouter } from "next/navigation";
import Header from "@/components/Header/page";

export default function DaftarKulinerPage() {
    const [daftarKuliner, setDaftarKuliner] = useState<Kuliner[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('nama');
    const [filteredKuliner, setFilteredKuliner] = useState<Kuliner[]>([]);

    useEffect(() => {
        async function fetchKuliner() {
            const response = await fetch('/api/kuliner');
            const data = await response.json();
            setDaftarKuliner(data);
        }
        fetchKuliner();
    }, []);

    useEffect(() => {
        let sortedAndFiltered = daftarKuliner
            .filter(kuliner => kuliner.nama?.toLowerCase().includes(searchTerm.toLowerCase()))
            .sort((a, b) => {
                if (sortOption === 'nama') {
                    return (a.nama?.localeCompare(b.nama || '') || 0);
                }
                return 0;
            });

        setFilteredKuliner(sortedAndFiltered);
    }, [searchTerm, sortOption, daftarKuliner]);

    const router = useRouter();

    function handleSelectKuliner(kulinerId: string) {
        // Handle select kuliner logic
        router.push(`/kuliner/${kulinerId}`)
    };

    return (
        <div>
            <div className="p-4 pt-20">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    <div className="mb-4 flex justify-between items-center">
                        <h1 className="text-xl">Daftar Kuliner</h1>
                        <div className="flex space-x-4">
                            <input
                                type="text"
                                placeholder="Cari kuliner..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="p-2 border rounded-md bg-gray-50 dark:bg-[#1B262C] dark:border-gray-600 dark:text-white"
                            />
                            <select
                                title="sorting"
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                                className="p-2 border rounded-md bg-gray-50 dark:bg-[#1B262C] dark:border-gray-600 dark:text-white"
                            >
                                <option value="nama">Sort by Nama</option>
                                <option value="rating">Sort by Rating</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredKuliner.map(kuliner => (
                            <div key={kuliner.id} className="bg-white rounded shadow-md dark:bg-[#1B262C] dark:text-white p-4">
                                <Link href={`/kuliner/${kuliner.id}`} className="flex justify-between">
                                    <h2 className="text-lg font-medium">{kuliner.nama}</h2>
                                </Link>
                                <p className="text-gray-600 mb-2">{kuliner.jenis}</p>
                                <p className="text-gray-600 mb-2">{kuliner.alamat}</p>
                                <img src={kuliner.foto? kuliner.foto : `https://source.unsplash.com/200x200/?${kuliner.jenis}`} alt={kuliner.nama} className="w-full h-48 object-cover rounded-md mb-4" />
                                <div className="flex justify-between items-center">
                                    <a href={`${kuliner.gmaps}`} target="_blank" rel="noopener noreferrer" className="text-blue-500">Lihat di Google Maps</a>
                                    <p className="text-gray-500">Pemilik: {kuliner.pemilik}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
