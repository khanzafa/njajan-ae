'use client';

import { useState, useEffect } from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { useParams } from 'next/navigation';
import { Kuliner } from '@/services/firebase/kuliner-service';
import { Foto } from '@/services/firebase/galeri-service';
import { Menu } from '@/services/firebase/menu-service';
import { Ulasan, Balasan } from '@/services/firebase/ulasan-service';
import Header from '@/components/Header/page';
// import ReactStars from "react-rating-stars-component";
import { Rating } from 'react-simple-star-rating'
import Link from 'next/link';
import { checkSession } from '@/actions/auth-action';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { getCurrentUser } from '@/services/firebase/auth';
import { User } from 'next-auth';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export default function DetailKulinerPage({ params }: { params: { kulinerId: string } }) {
    const [session, setSession] = useState<RequestCookie | null>(null);
    const kulinerId = params.kulinerId;
    const [kuliner, setKuliner] = useState<Kuliner | null>(null);
    const [ulasanList, setUlasanList] = useState<Ulasan[]>([]);
    const [menuList, setMenuList] = useState<Menu[]>([]);
    const [galeriList, setGaleriList] = useState<Foto[]>([]);
    const [rating, setRating] = useState<number>(0);
    const [balasanList, setBalasanList] = useState<Balasan[]>([]);
    const [newUlasan, setNewUlasan] = useState('');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    async function fetchUlasan() {
        const response = await fetch(`/api/kuliner/${kulinerId}/ulasan`);
        const data = await response.json();
        setUlasanList(data);
        console.log("Ulasan Data: ", data)
        // Count rating
        let totalRating = 0;
        data.forEach((ulasan: Ulasan) => {
            totalRating += ulasan.rating;
        });
        setRating(totalRating / data.length);
    }

    useEffect(() => {
        async function checkUserSession() {
            const session = await checkSession();
            setSession(session);
            const user = await getCurrentUser();
            setUser(user);
        }

        async function fetchKuliner() {
            const response = await fetch(`/api/kuliner/${kulinerId}`);
            const data = await response.json();
            setKuliner(data);
            console.log("Kuliner Data: ", data)
        }

        async function fetchMenu() {
            const response = await fetch(`/api/kuliner/${kulinerId}/menu`);
            const data = await response.json();
            setMenuList(data);
            console.log("Menu Data: ", data)
        }

        async function fetchGaleri() {
            const response = await fetch(`/api/kuliner/${kulinerId}/galeri`);
            const data = await response.json();
            setGaleriList(data);
            console.log("Galeri Data: ", data)
        }

        checkUserSession();
        fetchKuliner();
        fetchUlasan();
        fetchMenu();
        fetchGaleri();
    }, [kulinerId]);

    async function fetchBalasan(ulasanId: string) {
        const response = await fetch(`/api/kuliner/${kulinerId}/ulasan/${ulasanId}/balasan`);
        const data = await response.json();
        console.log("Balasan Data: ", data)
        return data;
    }

    // Handle load balasan
    async function handleLoadBalasan(ulasanId: string) {
        const data = await fetchBalasan(ulasanId);
        setBalasanList(data);
    }

    const handleUlasanSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`/api/kuliner/${kulinerId}/ulasan`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nama: user?.email, ulasan: newUlasan, rating }),
            });
            console.log("Response: ", response.status)

            if (response.status === 201) {
                // const newUlasanData = await response.json();
                // setUlasanList(prev => [...prev, newUlasanData]);
                fetchUlasan();
                setNewUlasan('');
                setRating(0);
            } else {
                console.error('Error adding ulasan:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding ulasan:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* <Header /> */}
            <div className="p-4 pt-20">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    <div className='flex-col items-center mb-4'>
                        <h1 className="text-2xl font-bold">{kuliner?.nama}</h1>
                        <p className="text-gray-600 dark:text-gray-400">{kuliner?.jenis}</p>
                    </div>
                    <TabGroup>
                        <TabList className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
                            <Tab
                                className={({ selected }) =>
                                    classNames(
                                        'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
                                        'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                                        selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                    )
                                }
                            >
                                Profil
                            </Tab>
                            <Tab
                                className={({ selected }) =>
                                    classNames(
                                        'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
                                        'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                                        selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                    )
                                }
                            >
                                Menu
                            </Tab>
                            <Tab
                                className={({ selected }) =>
                                    classNames(
                                        'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
                                        'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                                        selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                    )
                                }
                            >
                                Ulasan
                            </Tab>
                            <Tab
                                className={({ selected }) =>
                                    classNames(
                                        'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
                                        'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                                        selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                    )
                                }
                            >
                                Galeri
                            </Tab>
                        </TabList>
                        <TabPanels className="mt-2">
                            <TabPanel className={classNames('rounded-xl p-3', 'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60')}>
                                {/* Profil Content */}
                                <div>
                                    <div className="mb-4">
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Informasi Kuliner</h2>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4 mb-4">
                                        {/* Informasi Utama */}
                                        <div className="flex justify-start bg-white rounded shadow-md p-6 dark:bg-[#1B262C] dark:text-white">
                                            <img src={kuliner?.foto ? kuliner.foto : `https://source.unsplash.com/200x200/?${kuliner?.nama}`} alt="Foto Profil" className="w-50 h-50 rounded-md object-cover mr-4" />
                                            <div className="flex flex-col space-y-2">
                                                <p><span className="font-semibold">Alamat:</span> {kuliner?.alamat}</p>
                                                <p><span className="font-semibold">Waktu Operasional:</span> {kuliner?.waktu}</p>
                                                <p><span className="font-semibold">Pemilik:</span> {kuliner?.pemilik}</p>
                                                <p><span className="font-semibold">Berdiri Sejak:</span> {kuliner?.berdiri}</p>
                                                <p><span className="font-semibold">Rating:</span>
                                                    {rating ?
                                                        <span className="flex space-x-1">
                                                            {[1, 2, 3, 4, 5].map((star) => (
                                                                <svg key={star} className="w-4 h-4 text-yellow-400" fill={rating >= star ? 'currentColor' : 'none'} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M12 2 L15.09 8.26 L22 9.27 L17 14.14 L18.18 21.02 L12 17.77 L5.82 21.02 L7 14.14 L2 9.27 L8.91 8.26 z"></path>
                                                                </svg>
                                                            ))}

                                                        </span>
                                                        : ' Belum ada rating'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Lokasi</h2>
                                </div>
                                <div className="bg-white rounded shadow-md p-6 dark:bg-[#1B262C] dark:text-white">
                                    <div className="h-64 w-full rounded bg-gray-100 dark:bg-gray-800">
                                        {/* Integrasi Peta (misalnya Google Maps) bisa ditambahkan di sini */}
                                        <iframe src={kuliner?.gmaps} className="h-full w-full rounded" loading="lazy"></iframe>
                                        {/* <p className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500">Peta Lokasi</p> */}
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel className={classNames('rounded-xl p-3', 'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60')}>
                                {/* Menu Content */}
                                <div className="grid grid-cols-3 gap-4">
                                    {menuList.map((menu) => (
                                        <div key={menu.id} className="bg-white rounded shadow-md dark:bg-[#1B262C] dark:text-white flex flex-col justify-between">
                                            {/* Detail */}
                                            <div className="p-6">
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
                            </TabPanel>
                            <TabPanel className={classNames('rounded-xl p-3', 'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60')}>
                                {/* Ulasan Content */}
                                <div className="space-y-2">
                                    {ulasanList.map(ulasan => (
                                        <div key={ulasan.id} className="border-b border-gray-200 pb-2">
                                            <p><strong>{ulasan.nama}:</strong> {ulasan.ulasan}</p>
                                            <p><strong>Rating:</strong> {ulasan.rating}</p>
                                        </div>
                                    ))}
                                    {
                                        session ? (
                                            <form onSubmit={handleUlasanSubmit} className="mt-4">
                                                <div className="mb-4">
                                                    <label htmlFor="ulasan" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Ulasan</label>
                                                    <textarea
                                                        id="ulasan"
                                                        name="ulasan"
                                                        value={newUlasan}
                                                        onChange={(e) => setNewUlasan(e.target.value)}
                                                        className="mt-1 p-2 w-full border rounded-md bg-gray-50 dark:bg-[#1B262C] dark:border-gray-600 dark:text-white"
                                                        rows={4}
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <label htmlFor="rating" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Rating</label>
                                                    {/* <ReactStars
                                                        name="rating"
                                                        count={5}
                                                        onChange={(newRating: any) => {
                                                            setRating(newRating);
                                                        }}
                                                        size={24}
                                                        activeColor="#ffd700"
                                                    /> */}
                                                    <Rating
                                                        onClick={(rate: number) => {
                                                            setRating(rate)
                                                        }}
                                                    // onPointerEnter={onPointerEnter}
                                                    // onPointerLeave={onPointerLeave}
                                                    // onPointerMove={onPointerMove}
                                                    /* Available Props */
                                                    />
                                                </div>
                                                <div className="flex justify-end">
                                                    <button
                                                        type="submit"
                                                        className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                        disabled={loading}
                                                    >
                                                        {loading ? 'Mengirim...' : 'Kirim Ulasan'}
                                                    </button>
                                                </div>
                                            </form>
                                        ) : (
                                            <div className="bg-red-100 text-red-700 p-4 rounded-md">
                                                <p>Silakan <span>
                                                    <Link href="/login" className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                        login
                                                    </Link>
                                                </span> untuk memberikan ulasan.</p>
                                            </div>
                                        )
                                    }
                                </div>
                            </TabPanel>
                            <TabPanel className={classNames('rounded-xl p-3', 'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60')}>
                                {/* Galeri Content */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {galeriList.map(foto => (
                                        <div key={foto.id} className="flex flex-col items-center">
                                            <img src={foto.url} alt={foto.description} className="w-full h-48 object-cover rounded-md mb-2" />
                                            <p>{foto.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </TabPanel>
                        </TabPanels>
                    </TabGroup>
                </div>
            </div>
        </div >
    );
}
