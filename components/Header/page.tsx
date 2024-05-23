'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { useUserSession } from '@/hooks/use-user-session';
import { signInWithGoogle, signOut } from '@/services/firebase/auth-service';
import { createSession, removeSession } from '@/actions/auth-action';


export default function Header({ session }: { session: string | null }) {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    }, []);


    return (
        <header className="fixed w-full bg-[#DBE2EF] dark:bg-[#112D4E] dark:text-[#F9F7F7] shadow-md p-4 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-[#112D4E] dark:text-[#F9F7F7]">
                    Njajan AE
                </Link>
                <nav className="space-x-4">
                    <Link href="/kuliner" className="hover:text-[#3F72AF] dark:hover:text-[#DBE2EF]">Kuliner</Link>
                    <Link href="/about" className="hover:text-[#3F72AF] dark:hover:text-[#DBE2EF]">About</Link>
                    <Link href="/mitra" className="hover:text-[#3F72AF] dark:hover:text-[#DBE2EF]">Mitra</Link>
                </nav>
                <div>
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
        </header>


    );
}
