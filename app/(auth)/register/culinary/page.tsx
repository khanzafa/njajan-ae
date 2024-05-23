'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { signUpWithEmail, addNewCulinary } from '@/services/firebase/auth-service';

export default function RestaurantOwnerRegisterPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError(null);

        try {
            const userCredential = await addNewCulinary(name, email, password);
            // Jika berhasil register, arahkan ke halaman login            
            router.push('/login');
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
<div className="min-h-screen bg-[#DBE2EF] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-[#112D4E]">Register as Restaurant Owner</h2>
        {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}
    </div>

    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Restaurant Name
                    </label>
                    <div className="mt-1">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#3F72AF] focus:border-[#3F72AF] sm:text-sm"
                            placeholder="Restaurant Name"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                    </label>
                    <div className="mt-1">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#3F72AF] focus:border-[#3F72AF] sm:text-sm"
                            placeholder="you@example.com"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <div className="mt-1">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#3F72AF] focus:border-[#3F72AF] sm:text-sm"
                            placeholder="Password"
                        />
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#3F72AF] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3F72AF]"
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

    );
}
