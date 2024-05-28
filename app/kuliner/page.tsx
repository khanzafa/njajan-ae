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
        <div className="p-4 pt-20 bg-[#DBE2EF] dark:bg-[#1B262C] min-h-screen min-w-screen">
            <div className="p-4 border-2 border-[#B2BABB] border-dashed rounded-lg dark:border-[#DBE2EF]">
                <div className="mb-4 flex flex-col md:flex-row justify-between items-center">
                    <h1 className="text-xl text-[#112D4E] dark:text-[#F9F7F7] mb-4 md:mb-0">
                        Jelajahi Kuliner di Sekitarmu
                    </h1>
                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                        <input
                            type="text"
                            placeholder="Cari kuliner..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="p-2 border rounded-md bg-[#DBE2EF] dark:bg-[#1B262C] dark:border-[#DBE2EF] dark:text-[#F9F7F7] w-full md:w-auto"
                        />
                        {/* <select
                    title="sorting"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="p-2 border rounded-md bg-[#DBE2EF] dark:bg-[#1B262C] dark:border-[#DBE2EF] dark:text-[#F9F7F7] w-full md:w-auto"
                >
                    <option value="nama">Sort by Nama</option>
                    <option value="rating">Sort by Rating</option>
                </select> */}
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredKuliner.map(kuliner => (
                        <div key={kuliner.id} className="bg-[#F9F7F7] rounded shadow-md dark:bg-[#112D4E] dark:text-[#F9F7F7] p-4">
                            <Link href={`/kuliner/${kuliner.id}`} className="flex justify-between">
                                <h2 className="text-lg font-medium">{kuliner.nama}</h2>
                            </Link>
                            <p className="text-[#3F72AF] mb-2">{kuliner.jenis}</p>
                            <p className="text-[#3F72AF] mb-2">{kuliner.alamat}</p>
                            <img src={kuliner.foto ? kuliner.foto : `https://source.unsplash.com/200x200/?${kuliner.jenis}`} alt={kuliner.nama} className="w-full h-48 object-cover rounded-md mb-4" />
                            <div className="flex justify-between items-center">
                                <a href={`${kuliner.gmaps}`} target="_blank" rel="noopener noreferrer" className="text-[#3F72AF] hover:underline">Lihat di Google Maps</a>
                                <p className="text-[#3F72AF]">Pemilik: {kuliner.pemilik}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>


    );
}
