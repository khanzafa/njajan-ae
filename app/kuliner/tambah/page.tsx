'use client'

import { Kuliner } from "@/services/firebase/kuliner-service";
import { useState } from "react";
import { useRouter } from 'next/navigation'

export default function TambahKulinerBaru() {
    const [kulinerBaru, setKulinerBaru] = useState<Kuliner>({
        id: "",
        nama: "",
        jenis: "",
        berdiri: 0,
        alamat: "",
        pemilik: "",
        waktu: "",
    });

    const router = useRouter();

    async function handleCreate() {
        await fetch('/api/kuliner', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(kulinerBaru),
        });
        const newDaftarKuliner = await fetch('/api/kuliner').then(res => res.json());

        setKulinerBaru({
            id: "",
            nama: "",
            jenis: "",
            berdiri: 0,
            alamat: "",
            pemilik: "",
            waktu: "",
        });
        // navigate to kuliner page
        router.push('/kuliner');
    }


    return (
        <form onSubmit={(e) => { e.preventDefault(); handleCreate(); }}>
            <label htmlFor="nama">Nama Kuliner</label>
            <input type="text" id="nama" name="nama" value={kulinerBaru.nama} onChange={(e) => setKulinerBaru({ ...kulinerBaru, nama: e.target.value })} />
            <label htmlFor="jenis">Jenis Kuliner</label>
            <input type="text" id="jenis" name="jenis" value={kulinerBaru.jenis} onChange={(e) => setKulinerBaru({ ...kulinerBaru, jenis: e.target.value })} />
            <label htmlFor="berdiri">Tahun Berdiri</label>
            <input type="number" id="berdiri" name="berdiri" value={kulinerBaru.berdiri} onChange={(e) => setKulinerBaru({ ...kulinerBaru, berdiri: parseInt(e.target.value) })} />
            <label htmlFor="alamat">Alamat</label>
            <input type="text" id="alamat" name="alamat" value={kulinerBaru.alamat} onChange={(e) => setKulinerBaru({ ...kulinerBaru, alamat: e.target.value })} />
            <label htmlFor="pemilik">Pemilik</label>
            <input type="text" id="pemilik" name="pemilik" value={kulinerBaru.pemilik} onChange={(e) => setKulinerBaru({ ...kulinerBaru, pemilik: e.target.value })} />
            <label htmlFor="waktu">Waktu</label>
            <input type="text" id="waktu" name="waktu" value={kulinerBaru.waktu} onChange={(e) => setKulinerBaru({ ...kulinerBaru, waktu: e.target.value })} />
            <button type="submit">Tambah</button>
        </form>
    );
}