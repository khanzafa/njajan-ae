'use client'

import { Kuliner } from "@/services/firebase/kuliner-service";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { kulinerId: string } }) {
    // const id = 'xC96zsuHoQIutgfkE5Iy';
    const id = params.kulinerId;
    const [kuliner, setKuliner] = useState<Kuliner | null>(null);
    const [jumlahUlasan, setJumlahUlasan] = useState<number>(0);
    const [jumlahMenu, setJumlahMenu] = useState<number>(0);
    const [jumlahGaleri, setJumlahGaleri] = useState<number>(0);
    const [rataRating, setRataRating] = useState<number>(0);
    const [leaderboardKuliner, setLeaderboardKuliner] = useState<{
        kulinerData: Kuliner,
        totalUlasan: number,
        rating: number
    }[]>([]);

    useEffect(() => {
        // Fetch data kuliner
        fetch(`/api/kuliner/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setKuliner(data);
            });

        // Fetch jumlah ulasan
        fetch(`/api/kuliner/${id}/ulasan`)
            .then((res) => res.json())
            .then((data) => {
                setJumlahUlasan(data.length);
            });

        // Fetch jumlah menu
        fetch(`/api/kuliner/${id}/menu`)
            .then((res) => res.json())
            .then((data) => {
                setJumlahMenu(data.length);
            });

        // Fetch jumlah galeri
        fetch(`/api/kuliner/${id}/galeri`)
            .then((res) => res.json())
            .then((data) => {
                setJumlahGaleri(data.length);
            });

        // Fetch rata-rata rating
        fetch(`/api/kuliner/${id}/ulasan`)
            .then((res) => res.json())
            .then((data) => {
                const totalRating = data.reduce((acc: number, curr: any) => acc + curr.rating, 0);
                setRataRating(totalRating / data.length);
            });

        // Fetch leaderboard kuliner
        fetch(`/api/kuliner/leaderboard`)
            .then((res) => res.json())
            .then((data) => {
                setLeaderboardKuliner(data);
            });
    }, [id]);

    if (!kuliner) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4 sm:ml-64">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                <div className="mb-4 flex justify-start">
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
                <div className="mb-4 flex justify-start">
                    <h1 className="text-xl">
                        Dashboard - {kuliner.nama}
                    </h1>
                </div>
                {/* Ringkasan Kuliner */}
                <div className="grid grid-cols-4 gap-4 mb-4">
                    {/* Rata-rata Rating */}
                    <div className="flex flex-col justify-center items-center bg-white rounded shadow-md px-4 py-6 dark:bg-[#1B262C] dark:text-white">
                        <svg className="w-8 h-8 mb-2 text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.042 8.042l-1.414-1.414a8 8 0 111.414 1.414zM9 4v7h3a1 1 0 000-2H9V4zM14 9a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Average Rating</h3>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {rataRating.toFixed(1)}
                        </p>
                    </div>
                    {/* Jumlah Ulasan */}
                    <div className="flex flex-col justify-center items-center bg-white rounded shadow-md px-4 py-6 dark:bg-[#1B262C] dark:text-white">
                        <svg className="w-8 h-8 mb-2 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5v14a1 1 0 000 2h8a1 1 0 100-2V5a1 1 0 00-1-1H8zm0 11a1 1 0 110-2 1 1 0 010 2zM11 8a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Jumlah Ulasan</h3>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {jumlahUlasan}
                        </p>
                    </div>

                    {/* Jumlah Menu */}
                    <div className="flex flex-col justify-center items-center bg-white rounded shadow-md px-4 py-6 dark:bg-[#1B262C] dark:text-white">
                        <svg className="w-8 h-8 mb-2 text-orange-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17a2 2 0 100-4zM4 6v14a2 2 0 002 2h14a2 2 0 002-2V6zM16 11H8M16 16H8" />
                        </svg>
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Jumlah Menu</h3>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {jumlahMenu}
                        </p>
                    </div>

                    {/* Jumlah Galeri */}
                    <div className="flex flex-col justify-center items-center bg-white rounded shadow-md px-4 py-6 dark:bg-[#1B262C] dark:text-white">
                        <svg className="w-8 h-8 mb-2 text-purple-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l10 5H4zM14 8l10 5H4z" />
                        </svg>
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Jumlah Foto</h3>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {jumlahGaleri}
                        </p>
                    </div>

                </div>
                {/* Leaderboard Kuliner */}
                <div className="mb-4">
                    <h1 className="text-xl">
                        Peringkat Kuliner
                    </h1>
                </div>
                <div className="overflow-x-auto rounded shadow-md dark:bg-[#1B262C]">
                    <table className="w-full text-left text-gray-500 dark:text-gray-400">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th className="px-4 py-3 text-sm font-medium">Nama & Ikon</th>
                                <th className="px-4 py-3 text-sm font-medium">Jenis Kuliner</th>
                                <th className="px-4 py-3 text-sm font-medium">Jumlah Ulasan</th>
                                <th className="px-4 py-3 text-sm font-medium">Rata-rata Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Add your data rows here */}
                            {/* <tr>
                                <td className="px-4 py-3 flex items-center">
                                    <img src="https://source.unsplash.com/200x200/?restaurant" alt="avatar" className="w-8 h-8 rounded-full" />                                    
                                    <span className="mx-2">Restoran ABC</span>
                                </td>
                                <td className="px-4 py-3">Masakan Italia</td>
                                <td className="px-4 py-3">250</td>
                                <td className="px-4 py-3">4.8</td>
                            </tr> */}
                            {/* Add more data rows for other rankings */}
                            {/* Show leaderboard */}
                            {
                                leaderboardKuliner.map((kuliner, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-3 flex items-center">
                                            <img src="https://source.unsplash.com/200x200/?restaurant" alt="avatar" className="w-8 h-8 rounded-full" />
                                            <span className="mx-2">{kuliner.kulinerData.nama}</span>
                                        </td>
                                        <td className="px-4 py-3">{kuliner.kulinerData.jenis}</td>
                                        <td className="px-4 py-3">{kuliner.totalUlasan}</td>
                                        <td className="px-4 py-3">{kuliner.rating}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                {/* <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                        <p className="text-2xl text-gray-400 dark:text-gray-500">
                            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                            </svg>
                        </p>
                    </div>
                    <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                        <p className="text-2xl text-gray-400 dark:text-gray-500">
                            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                            </svg>
                        </p>
                    </div>
                    <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                        <p className="text-2xl text-gray-400 dark:text-gray-500">
                            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                            </svg>
                        </p>
                    </div>
                    <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                        <p className="text-2xl text-gray-400 dark:text-gray-500">
                            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                            </svg>
                        </p>
                    </div>
                </div> */}
                {/* <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
                    <p className="text-2xl text-gray-400 dark:text-gray-500">
                        <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                        </svg>
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                        <p className="text-2xl text-gray-400 dark:text-gray-500">
                            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                            </svg>
                        </p>
                    </div>
                    <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                        <p className="text-2xl text-gray-400 dark:text-gray-500">
                            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                            </svg>
                        </p>
                    </div>
                    <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                        <p className="text-2xl text-gray-400 dark:text-gray-500">
                            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                            </svg>
                        </p>
                    </div>
                    <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                        <p className="text-2xl text-gray-400 dark:text-gray-500">
                            <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                            </svg>
                        </p>
                    </div>
                </div> */}
            </div>
        </div>
    )
}