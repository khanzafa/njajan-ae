'use client'

// import { Kuliner } from '@/services/firebase/kuliner-service';
// import { Menu } from '@/services/firebase/menu-service';
import { Foto } from '@/services/firebase/galeri-service';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function GaleriPage() {
    const [fotos, setFotos] = useState<Foto[]>([]);
    const router = useRouter();
    const { kulinerId } = useParams();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        async function fetchFotos() {
            const data = await fetch(`/api/kuliner/${kulinerId}/galeri`).then(res => res.json());
            setFotos(data);
        }

        fetchFotos();
    }, []);

    const handleAddClick = () => {
        router.push(`/dashboard/${kulinerId}/galeri/add`);
    };

    const filteredFotos = fotos.filter(foto =>
        foto.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 sm:ml-64 bg-[#DBE2EF] dark:bg-[#1B262C] min-h-screen">
            <div className="p-4 border-2 border-[#B2BABB] border-dashed rounded-lg dark:border-[#DBE2EF]">
                <div className='flex justify-between mb-4'>
                    <h1 className="text-xl font-bold flex items-center text-[#112D4E] dark:text-[#F9F7F7]">Galeri Foto</h1>
                    <div className="flex">
                        <button onClick={handleAddClick} className="bg-[#3F72AF] hover:bg-blue-600 text-white font-bold mx-4 py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out">
                            Tambah Foto
                        </button>

                        <form className="flex items-center max-w-sm">
                            <label htmlFor="simple-search" className="sr-only">Search</label>
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-images" viewBox="0 0 16 16">
                                        <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                                        <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2M14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1M2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="simple-search"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-[#1B262C] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Cari foto..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-[#3F72AF] rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                                <span className="sr-only">Search</span>
                            </button>
                        </form>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredFotos.map(foto => (
                        <div key={foto.id} className="bg-[#FFFFFF] dark:bg-[#112D4E] dark:text-white rounded shadow-md p-4">
                            <img src={foto.url} alt={foto.description} className="w-full h-48 object-cover rounded-md mb-4" />
                            <p className="text-gray-800 dark:text-white">{foto.description}</p>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">{foto.time}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
}
