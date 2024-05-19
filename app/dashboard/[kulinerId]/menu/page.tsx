'use client'

import { Kuliner } from '@/services/firebase/kuliner-service';
import { Menu } from '@/services/firebase/menu-service';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function MenuList() {
    // Data dummy
    const initialMenuList = [
        {
            id: '1',
            nama: 'Nasi Goreng Spesial',
            harga: 25000,
            kategori: 'Makanan Utama',
            deskripsi: 'Nasi goreng spesial dengan tambahan telur, ayam, dan sayuran.',
            foto: 'https://via.placeholder.com/150'
        },
        {
            id: '2',
            nama: 'Es Teh Manis',
            harga: 5000,
            kategori: 'Minuman',
            deskripsi: 'Es teh manis segar dengan tambahan es batu.',
            foto: 'https://via.placeholder.com/150'
        },
        // Tambahkan data menu lainnya sesuai kebutuhan
        {
            id: '3',
            nama: 'Ayam Goreng Spesial',
            harga: 30000,
            kategori: 'Makanan Utama',
            deskripsi: 'Ayam goreng spesial dengan bumbu rahasia.',
            foto: 'https://via.placeholder.com/150'
        },
        {
            id: '4',
            nama: 'Es Jeruk Manis',
            harga: 7000,
            kategori: 'Minuman',
            deskripsi: 'Es jeruk manis segar dengan tambahan es batu.',
            foto: 'https://via.placeholder.com/150',
        },
        {
            id: '5',
            nama: 'Mie Goreng Spesial',
            harga: 20000,
            kategori: 'Makanan Utama',
            deskripsi: 'Mie goreng spesial dengan tambahan telur, ayam, dan sayuran.',
            foto: 'https://via.placeholder.com/150'
        },
        {
            id: '6',
            nama: 'Es Kopi Hitam',
            harga: 10000,
            kategori: 'Minuman',
            deskripsi: 'Es kopi hitam segar dengan tambahan es batu.',
            foto: 'https://via.placeholder.com/150'
        }

    ];

    // const id = 'xC96zsuHoQIutgfkE5Iy';
    const { kulinerId } = useParams();

    const [daftarMenu, setDaftarMenu] = useState<Menu[]>([]);
    
    async function fetchData() {
        const data = await fetch(`/api/kuliner/${kulinerId}/menu`).then(res => res.json());
        setDaftarMenu(data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    // const [menuList, setMenuList] = useState(daftarMenu);

    const router = useRouter();

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

    console.log("Data: ", daftarMenu)

    return (
        <div className="p-4 sm:ml-64">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                <div className='flex justify-between mb-4'>
                    <h1 className="text-xl flex items-center">Daftar Menu</h1>
                    <div className="flex">
                        <button onClick={handleAddClick} className="bg-blue-500 hover:bg-blue-600 text-white font-bold mx-4 py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out">
                            Tambah Menu
                        </button>

                        <form className="flex items-center max-w-sm">
                            <label htmlFor="simple-search" className="sr-only">Search</label>
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2" />
                                    </svg>
                                </div>
                                <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-[#1B262C] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." required />
                            </div>
                            <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                                <span className="sr-only">Search</span>
                            </button>
                        </form>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    {daftarMenu.map((menu) => (
                        <div key={menu.id} className="bg-white rounded shadow-md dark:bg-[#1B262C] dark:text-white flex flex-col justify-between">
                            {/* Detail */}
                            <div className="p-6">
                                <div className="flex justify-end mb-2">
                                    <button onClick={() => handleEditClick(menu.id!)} className="mx-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600">
                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
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
                                <h2 className="mb-2 text-lg font-medium flex items-center">{menu.nama}</h2>
                                <p className="text-gray-500 mb-2">{menu.harga?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
                                <p className="text-gray-600 mb-4">{menu.kategori}</p>
                                <p>{menu.deskripsi}</p>
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
