'use client'

import { Kuliner } from '@/services/firebase/kuliner-service';
import { Menu } from '@/services/firebase/menu-service';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function MenuList() {
    const { kulinerId } = useParams();
    const [daftarMenu, setDaftarMenu] = useState<Menu[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    async function fetchData() {
        const data = await fetch(`/api/kuliner/${kulinerId}/menu`).then(res => res.json());
        setDaftarMenu(data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddClick = () => {
        router.push(`/dashboard/${kulinerId}/menu/add`);
    }

    function handleEditClick(menuId: string) {
        router.push(`/dashboard/${kulinerId}/menu/${menuId}/edit`);
    };

    function handleDeleteClick(menuId: string) {
        async function deleteData() {
            await fetch(`/api/kuliner/${kulinerId}/menu/${menuId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
        deleteData();
        fetchData();
    };

    // Filter daftarMenu berdasarkan searchTerm
    const filteredMenu = daftarMenu.filter(menu =>
        menu.nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        menu.deskripsi?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        menu.kategori?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 sm:ml-64 bg-[#DBE2EF] dark:bg-[#1B262C] min-h-screen">
            <div className="p-4 border-2 border-[#B2BABB] border-dashed rounded-lg dark:border-[#DBE2EF]">
                <div className='flex justify-between mb-4'>
                    <h1 className="text-xl font-bold flex items-center text-[#112D4E] dark:text-[#F9F7F7]">Daftar Menu</h1>
                    <div className="flex">
                        <button onClick={handleAddClick} className="bg-[#3F72AF] hover:bg-blue-600 text-white font-bold mx-4 py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out">
                            Tambah Menu
                        </button>

                        <form className="flex items-center max-w-sm">
                            <label htmlFor="simple-search" className="sr-only">Search</label>
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-cup-straw" viewBox="0 0 16 16">
                                        <path d="M13.902.334a.5.5 0 0 1-.28.65l-2.254.902-.4 1.927c.376.095.715.215.972.367.228.135.56.396.56.82q0 .069-.011.132l-.962 9.068a1.28 1.28 0 0 1-.524.93c-.488.34-1.494.87-3.01.87s-2.522-.53-3.01-.87a1.28 1.28 0 0 1-.524-.93L3.51 5.132A1 1 0 0 1 3.5 5c0-.424.332-.685.56-.82.262-.154.607-.276.99-.372C5.824 3.614 6.867 3.5 8 3.5c.712 0 1.389.045 1.985.127l.464-2.215a.5.5 0 0 1 .303-.356l2.5-1a.5.5 0 0 1 .65.278M9.768 4.607A14 14 0 0 0 8 4.5c-1.076 0-2.033.11-2.707.278A3.3 3.3 0 0 0 4.645 5c.146.073.362.15.648.222C5.967 5.39 6.924 5.5 8 5.5c.571 0 1.109-.03 1.588-.085zm.292 1.756C9.445 6.45 8.742 6.5 8 6.5c-1.133 0-2.176-.114-2.95-.308a6 6 0 0 1-.435-.127l.838 8.03c.013.121.06.186.102.215.357.249 1.168.69 2.438.69s2.081-.441 2.438-.69c.042-.029.09-.094.102-.215l.852-8.03a6 6 0 0 1-.435.127 9 9 0 0 1-.89.17zM4.467 4.884s.003.002.005.006zm7.066 0-.005.006zM11.354 5a3 3 0 0 0-.604-.21l-.099.445.055-.013c.286-.072.502-.149.648-.222" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="simple-search"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-[#1B262C] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Cari menu..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-[#3F72AF] rounded-lg border border-[#3F72AF] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-[#3F72AF] dark:hover:bg-[#112D4E] dark:focus:ring-[#3F72AF]">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                                <span className="sr-only">Search</span>
                            </button>
                        </form>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    {filteredMenu.map((menu) => (
                        <div key={menu.id} className="rounded shadow-md bg-[#FFFFFF] dark:bg-[#112D4E] dark:text-white flex flex-col justify-between">
                            {/* Detail */}
                            <div className="p-6">
                                <div className="flex justify-end mb-2">
                                    <button onClick={() => handleEditClick(menu.id!)} className="mx-2 text-[#3F72AF] hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600">
                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                                        </svg>
                                    </button>
                                    <button onClick={() => {
                                        if (confirm('Are you sure?')) {
                                            handleDeleteClick(menu.id!);
                                        }
                                    }} className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="" height="24" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                        </svg>
                                    </button>
                                </div>
                                <h2 className="mb-2 text-lg font-medium flex items-center text-[#112D4E] dark:text-[#F9F7F7]">{menu.nama}</h2>
                                <p className="text-[#112D4E] dark:text-[#F9F7F7] mb-2">{menu.harga?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
                                <p className="text-[#112D4E] dark:text-[#F9F7F7] mb-4">{menu.kategori}</p>
                                <p className="text-[#112D4E] dark:text-[#F9F7F7]">{menu.deskripsi}</p>
                            </div>
                            {/* Foto */}
                            <div className="flex justify-center mb-2">
                                <img src={menu.foto ? menu.foto : 'https://source.unsplash.com/200x200/?food'} alt={menu.nama} className="w-32 h-32 object-cover rounded-full" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
}
