'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image'; // Import Image component from Next.js

import { useUserSession } from '@/hooks/use-user-session';
import { signInWithGoogle, signOut } from '@/services/firebase/auth-service';
import { createSession, removeSession } from '@/actions/auth-action';

import culinaryIcon from '@/public/images/culinary.png';

export default function Header({ session }: { session: string | null }) {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const userSessionId = useUserSession(session);

    const handleSignOut = async () => {
        await signOut();
        await removeSession();
        router.refresh();
    };

    useEffect(() => {
        if (userSessionId) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [userSessionId]);

    return (
        <header className="fixed w-full bg-[#DBE2EF] dark:bg-[#112D4E] dark:text-[#F9F7F7] shadow-md p-4 z-50">
            <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="flex items-center text-2xl font-bold text-[#112D4E] dark:text-[#F9F7F7]">
                    <Image src={culinaryIcon} alt="Culinary Icon" width={40} height={40} className="mr-2" />
                    Njajan AE
                </Link>
                <div className="hidden md:flex space-x-4">
                    <Link href="/kuliner" className="hover:text-[#3F72AF] dark:hover:text-[#DBE2EF]">Kuliner</Link>
                    <Link href="/about" className="hover:text-[#3F72AF] dark:hover:text-[#DBE2EF]">About</Link>
                    <Link href="/mitra" className="hover:text-[#3F72AF] dark:hover:text-[#DBE2EF]">Mitra</Link>
                </div>
                <div className="hidden md:flex">
                    {userSessionId ? (
                        <button
                            onClick={handleSignOut}
                            className="bg-[#3F72AF] text-white px-4 py-2 rounded-md hover:bg-[#112D4E] focus:outline-none focus:ring-2 focus:ring-[#3F72AF] dark:bg-[#3F72AF] dark:focus:ring-[#3F72AF]"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link 
                        href="/login" 
                        className="bg-[#3F72AF] text-white px-4 py-2 rounded-md hover:bg-[#112D4E] focus:outline-none focus:ring-2 focus:ring-[#3F72AF] dark:bg-[#3F72AF] dark:focus:ring-[#3F72AF]">
                            Login
                        </Link>
                    )}
                </div>
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[#112D4E] dark:text-[#F9F7F7] focus:outline-none">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                        </svg>
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden mt-2">
                    <div className="flex flex-col space-y-2">
                        <Link href="/kuliner" className="hover:text-[#3F72AF] dark:hover:text-[#DBE2EF]">Kuliner</Link>
                        <Link href="/about" className="hover:text-[#3F72AF] dark:hover:text-[#DBE2EF]">About</Link>
                        <Link href="/mitra" className="hover:text-[#3F72AF] dark:hover:text-[#DBE2EF]">Mitra</Link>
                        {userSessionId ? (
                            <button
                                onClick={handleSignOut}
                                className="bg-[#3F72AF] text-white px-4 py-2 rounded-md hover:bg-[#112D4E] focus:outline-none focus:ring-2 focus:ring-[#3F72AF] dark:bg-[#3F72AF] dark:focus:ring-[#3F72AF]"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link 
                            href="/login" 
                            className="bg-[#3F72AF] text-white px-4 py-2 rounded-md hover:bg-[#112D4E] focus:outline-none focus:ring-2 focus:ring-[#3F72AF] dark:bg-[#3F72AF] dark:focus:ring-[#3F72AF]">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
