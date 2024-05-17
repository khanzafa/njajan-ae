'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { Kuliner } from "@/services/firebase/kuliner-service";

export default function Page() {
    const [daftarKuliner, setDaftarKuliner] = useState<Kuliner[]>([]);

    useEffect(() => {
        async function fetchData() {
            const data = await fetch('/api/kuliner').then(res => res.json());
            setDaftarKuliner(data);
        }
        fetchData();
    }, []);

    return (
        <div>
            <h1>Ini Halaman Kuliner</h1>
            <br />
            <h2>Daftar Kuliner</h2>
            <br />
            <Link href={`/kuliner/tambah`}>
                <button>Tambah Kuliner</button>
            </Link>

            <ul>
                {daftarKuliner.map((kuliner) => (
                    <li key={kuliner.id}>
                        <Link href={`/kuliner/${kuliner.id}`}>

                            <h2>{kuliner.nama}</h2>

                        </Link>
                        <p>ID {kuliner.id}:</p>
                        <p>Jenis: {kuliner.jenis}</p>
                        <p>Berdiri: {kuliner.berdiri}</p>
                        <p>Alamat: {kuliner.alamat}</p>
                        <p>Pemilik: {kuliner.pemilik}</p>
                        <p>Waktu: {kuliner.waktu}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
