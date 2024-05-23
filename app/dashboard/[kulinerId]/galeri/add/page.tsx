'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function AddGaleriPage() {
    const [file, setFile] = useState<File | null>(null);
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { kulinerId } = useParams();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!file) {
            alert('Please select a file');
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('description', description);

        try {
            // Fetch api storage
            const response = await fetch(`/api/kuliner/${kulinerId}/galeri`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                router.push(`/dashboard/${kulinerId}/galeri`);
            } else {
                console.error('Error adding document:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding document: ', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 sm:ml-64 bg-[#DBE2EF] dark:bg-[#1B262C] min-h-screen">
            <div className="p-4 border-2 border-[#B2BABB] border-dashed rounded-lg dark:border-[#DBE2EF]">
                <div className="mb-4">
                    <h1 className="text-xl font-bold">Tambah Foto ke Galeri</h1>
                </div>
                <form onSubmit={handleSubmit} className='bg-[#F9F7F7] dark:bg-[#112D4E] rounded shadow-md p-6'>
                    <div className="mb-4">
                        <label htmlFor="file" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Upload Foto</label>
                        <input
                            type="file"
                            id="file"
                            name="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="mt-1 p-2 w-full border rounded-md bg-gray-50 dark:bg-[#1B262C] dark:border-gray-600 dark:text-white"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Deskripsi</label>
                        <textarea
                            id="description"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md bg-gray-50 dark:bg-[#1B262C] dark:border-gray-600 dark:text-white"
                            rows={4}
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-[#3F72AF] text-white px-4 py-2 rounded-md hover:bg-[#112D4E] focus:outline-none focus:ring-2 focus:ring-[#3F72AF] dark:bg-[#3F72AF] dark:hover:bg-[#112D4E] dark:focus:ring-[#3F72AF]"
                            disabled={loading}
                        >
                            {loading ? 'Mengunggah...' : 'Unggah Foto'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
