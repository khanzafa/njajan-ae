'use client'

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Kuliner } from '@/services/firebase/kuliner-service';

export default function KulinerDetailPage({ params }: { params: { id: string } }) {
    const id = params.id;
    const [kuliner, setKuliner] = useState<Kuliner | null>(null);

    useEffect(() => {
        async function fetchData() {
            const data = await fetch(`/api/kuliner/${id}`).then(res => res.json());
            setKuliner(data);
        }
        if (id) {
            fetchData();
        }
    }, [id]);

    if (!kuliner) {
        return <div>Loading...</div>;
    }

    console.log('kuliner', kuliner);

    return (
        <div>
            <h1>{kuliner.nama}</h1>
            <p>Jenis: {kuliner.jenis}</p>
            <p>Berdiri: {kuliner.berdiri}</p>
            <p>Alamat: {kuliner.alamat}</p>
            <p>Pemilik: {kuliner.pemilik}</p>
            <p>Waktu: {kuliner.waktu}</p>
            {/* Tambahkan tampilan untuk fitur-fitur lainnya seperti galeri dan menu */}
        </div>
    );
}
