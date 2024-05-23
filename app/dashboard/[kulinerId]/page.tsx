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
        // <div className="p-4 sm:ml-64">
        //     <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        //         <div className="mb-4 flex justify-start">
        //             <form className="flex items-center max-w-sm">
        //                 <label htmlFor="simple-search" className="sr-only">Search</label>
        //                 <div className="relative w-full">
        //                     <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        //                         <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
        //                             <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2" />
        //                         </svg>
        //                     </div>
        //                     <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-[#1B262C] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." required />
        //                 </div>
        //                 <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        //                     <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        //                         <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
        //                     </svg>
        //                     <span className="sr-only">Search</span>
        //                 </button>
        //             </form>
        //         </div>
        //         <div className="mb-4 flex justify-start">
        //             <h1 className="text-xl">
        //                 Dashboard - {kuliner.nama}
        //             </h1>
        //         </div>
        //         {/* Ringkasan Kuliner */}
        //         <div className="grid grid-cols-4 gap-4 mb-4">
        //             {/* Rata-rata Rating */}
        //             <div className="flex flex-col justify-center items-center bg-white rounded shadow-md px-4 py-6 dark:bg-[#1B262C] dark:text-white">
        //                 <svg className="w-8 h-8 mb-2 text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        //                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.042 8.042l-1.414-1.414a8 8 0 111.414 1.414zM9 4v7h3a1 1 0 000-2H9V4zM14 9a1 1 0 110-2 1 1 0 010 2z" />
        //                 </svg>
        //                 <h3 className="text-xl font-medium text-gray-900 dark:text-white">Average Rating</h3>
        //                 <p className="text-2xl font-bold text-gray-900 dark:text-white">
        //                     {rataRating.toFixed(1)}
        //                 </p>
        //             </div>
        //             {/* Jumlah Ulasan */}
        //             <div className="flex flex-col justify-center items-center bg-white rounded shadow-md px-4 py-6 dark:bg-[#1B262C] dark:text-white">
        //                 <svg className="w-8 h-8 mb-2 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        //                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5v14a1 1 0 000 2h8a1 1 0 100-2V5a1 1 0 00-1-1H8zm0 11a1 1 0 110-2 1 1 0 010 2zM11 8a1 1 0 110-2 1 1 0 010 2z" />
        //                 </svg>
        //                 <h3 className="text-xl font-medium text-gray-900 dark:text-white">Jumlah Ulasan</h3>
        //                 <p className="text-2xl font-bold text-gray-900 dark:text-white">
        //                     {jumlahUlasan}
        //                 </p>
        //             </div>

        //             {/* Jumlah Menu */}
        //             <div className="flex flex-col justify-center items-center bg-white rounded shadow-md px-4 py-6 dark:bg-[#1B262C] dark:text-white">
        //                 <svg className="w-8 h-8 mb-2 text-orange-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        //                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17a2 2 0 100-4zM4 6v14a2 2 0 002 2h14a2 2 0 002-2V6zM16 11H8M16 16H8" />
        //                 </svg>
        //                 <h3 className="text-xl font-medium text-gray-900 dark:text-white">Jumlah Menu</h3>
        //                 <p className="text-2xl font-bold text-gray-900 dark:text-white">
        //                     {jumlahMenu}
        //                 </p>
        //             </div>

        //             {/* Jumlah Galeri */}
        //             <div className="flex flex-col justify-center items-center bg-white rounded shadow-md px-4 py-6 dark:bg-[#1B262C] dark:text-white">
        //                 <svg className="w-8 h-8 mb-2 text-purple-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        //                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l10 5H4zM14 8l10 5H4z" />
        //                 </svg>
        //                 <h3 className="text-xl font-medium text-gray-900 dark:text-white">Jumlah Foto</h3>
        //                 <p className="text-2xl font-bold text-gray-900 dark:text-white">
        //                     {jumlahGaleri}
        //                 </p>
        //             </div>

        //         </div>
        //         {/* Leaderboard Kuliner */}
        //         <div className="mb-4">
        //             <h1 className="text-xl">
        //                 Peringkat Kuliner
        //             </h1>
        //         </div>
        //         <div className="overflow-x-auto rounded shadow-md dark:bg-[#1B262C]">
        //             <table className="w-full text-left text-gray-500 dark:text-gray-400">
        //                 <thead>
        //                     <tr className="border-b border-gray-200 dark:border-gray-700">
        //                         <th className="px-4 py-3 text-sm font-medium">Nama & Ikon</th>
        //                         <th className="px-4 py-3 text-sm font-medium">Jenis Kuliner</th>
        //                         <th className="px-4 py-3 text-sm font-medium">Jumlah Ulasan</th>
        //                         <th className="px-4 py-3 text-sm font-medium">Rata-rata Rating</th>
        //                     </tr>
        //                 </thead>
        //                 <tbody>
        //                     {/* Show leaderboard */}
        //                     {
        //                         leaderboardKuliner.map((kuliner, index) => (
        //                             <tr key={index}>
        //                                 <td className="px-4 py-3 flex items-center">
        //                                     <img src="https://source.unsplash.com/200x200/?restaurant" alt="avatar" className="w-8 h-8 rounded-full" />
        //                                     <span className="mx-2">{kuliner.kulinerData.nama}</span>
        //                                 </td>
        //                                 <td className="px-4 py-3">{kuliner.kulinerData.jenis}</td>
        //                                 <td className="px-4 py-3">{kuliner.totalUlasan}</td>
        //                                 <td className="px-4 py-3">{kuliner.rating}</td>
        //                             </tr>
        //                         ))
        //                     }
        //                 </tbody>
        //             </table>
        //         </div>
        //     </div>
        // </div>

        <div className="p-4 sm:ml-64 bg-[#DBE2EF] dark:bg-[#1B262C] min-h-screen">
            <div className="p-4 border-2 border-[#B2BABB] border-dashed rounded-lg dark:border-[#DBE2EF]">
                {/* <div className="mb-4 flex justify-start">
                    <form className="flex items-center max-w-sm">
                        <label htmlFor="simple-search" className="sr-only">Search</label>
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">

                                </svg>
                            </div>
                            <input type="text" id="simple-search" className="bg-[#F9F7F7] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-[#112D4E] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." required />
                        </div>
                        <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white rounded-lg bg-[#3F72AF] hover:bg-[#112D4E] focus:outline-none focus:ring-2 focus:ring-[#3F72AF] dark:bg-[#3F72AF] dark:hover:bg-[#112D4E] dark:focus:ring-[#3F72AF]">
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">

                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                    </form>
                </div> */}
                <div className="mb-4 flex justify-start">
                    <h1 className="text-xl font-bold">
                        Dashboard - {kuliner.nama}
                    </h1>
                </div>
                {/* Ringkasan Kuliner */}
                <div className="grid grid-cols-4 gap-4 mb-4">
                    {/* Rata-rata Rating */}
                    <div className="flex flex-col justify-center items-center bg-[#F9F7F7] rounded shadow-md px-4 py-6 dark:bg-[#112D4E] dark:text-white">
                        {/* Icon SVG */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Average Rating</h3>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {rataRating.toFixed(1)}
                        </p>
                    </div>
                    {/* Jumlah Ulasan */}
                    <div className="flex flex-col justify-center items-center bg-[#F9F7F7] rounded shadow-md px-4 py-6 dark:bg-[#112D4E] dark:text-white">
                        {/* Icon SVG */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-chat-square-quote" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                            <path d="M7.066 4.76A1.665 1.665 0 0 0 4 5.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 1 0 .6.58c1.486-1.54 1.293-3.214.682-4.112zm4 0A1.665 1.665 0 0 0 8 5.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 1 0 .6.58c1.486-1.54 1.293-3.214.682-4.112z" />
                        </svg>
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Jumlah Ulasan</h3>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {jumlahUlasan}
                        </p>
                    </div>
                    {/* Jumlah Menu */}
                    <div className="flex flex-col justify-center items-center bg-[#F9F7F7] rounded shadow-md px-4 py-6 dark:bg-[#112D4E] dark:text-white">
                        {/* Icon SVG */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-cup-straw" viewBox="0 0 16 16">
                            <path d="M13.902.334a.5.5 0 0 1-.28.65l-2.254.902-.4 1.927c.376.095.715.215.972.367.228.135.56.396.56.82q0 .069-.011.132l-.962 9.068a1.28 1.28 0 0 1-.524.93c-.488.34-1.494.87-3.01.87s-2.522-.53-3.01-.87a1.28 1.28 0 0 1-.524-.93L3.51 5.132A1 1 0 0 1 3.5 5c0-.424.332-.685.56-.82.262-.154.607-.276.99-.372C5.824 3.614 6.867 3.5 8 3.5c.712 0 1.389.045 1.985.127l.464-2.215a.5.5 0 0 1 .303-.356l2.5-1a.5.5 0 0 1 .65.278M9.768 4.607A14 14 0 0 0 8 4.5c-1.076 0-2.033.11-2.707.278A3.3 3.3 0 0 0 4.645 5c.146.073.362.15.648.222C5.967 5.39 6.924 5.5 8 5.5c.571 0 1.109-.03 1.588-.085zm.292 1.756C9.445 6.45 8.742 6.5 8 6.5c-1.133 0-2.176-.114-2.95-.308a6 6 0 0 1-.435-.127l.838 8.03c.013.121.06.186.102.215.357.249 1.168.69 2.438.69s2.081-.441 2.438-.69c.042-.029.09-.094.102-.215l.852-8.03a6 6 0 0 1-.435.127 9 9 0 0 1-.89.17zM4.467 4.884s.003.002.005.006zm7.066 0-.005.006zM11.354 5a3 3 0 0 0-.604-.21l-.099.445.055-.013c.286-.072.502-.149.648-.222" />
                        </svg>
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Jumlah Menu</h3>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {jumlahMenu}
                        </p>
                    </div>
                    {/* Jumlah Galeri */}
                    <div className="flex flex-col justify-center items-center bg-[#F9F7F7] rounded shadow-md px-4 py-6 dark:bg-[#112D4E] dark:text-white">
                        {/* Icon SVG */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-images" viewBox="0 0 16 16">
                            <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                            <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2M14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1M2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1z" />
                        </svg>
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Jumlah Foto</h3>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {jumlahGaleri}
                        </p>
                    </div>
                </div>
                {/* Leaderboard Kuliner */}
                <div className="mb-4">
                    <h1 className="text-xl font-bold">
                        Peringkat Kuliner
                    </h1>
                </div>
                <div className="overflow-x-auto rounded shadow-md dark:bg-[#112D4E]">
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
                            {/* Show leaderboard */}
                            {
                                leaderboardKuliner.map((kuliner, index) => (
                                    <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                                        <td className="px-4 py-3 flex items-center">
                                            <img src={kuliner.kulinerData.foto? kuliner.kulinerData.foto : "https://source.unsplash.com/200x200/?restaurant"} alt="avatar" className="w-8 h-8 rounded-full" />
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
            </div>
        </div>

    )
}