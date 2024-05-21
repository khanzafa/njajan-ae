'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { useUserSession } from '@/hooks/use-user-session';
import { signInWithGoogle, signOut } from '@/services/firebase/auth';
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
        <header className="fixed w-full bg-white dark:bg-[#1B262C] dark:text-white shadow-md p-4 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold">
                    Njajan AE
                </Link>
                <nav className="space-x-4">
                    <Link href="/kuliner" className="hover:text-blue-500">Kuliner</Link>
                    <Link href="/about" className="hover:text-blue-500">About</Link>
                    <Link href="/mitra" className="hover:text-blue-500">Mitra</Link>
                </nav>
                <div>
                    {userSessionId ? (
                        <button
                            onClick={handleSignOut}
                            className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link href="/login" className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
