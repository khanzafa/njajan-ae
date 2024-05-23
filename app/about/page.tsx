'use client';

import Header from '@/components/Header/page';

export default function AboutPage() {
    return (
        <div>
            {/* <Header /> */}
            <div className="p-4 pt-20">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    <div className="mb-4">
                        <h1 className="text-2xl font-bold">Tentang Njajan AE</h1>
                    </div>
                    <div className="space-y-4">
                        <p className="text-lg">
                            Njajan AE adalah platform komprehensif yang dirancang untuk menghubungkan para pecinta kuliner dengan pengalaman kuliner terbaik di sekitar mereka. Berikut adalah beberapa fitur unggulan dari Njajan AE:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-lg">
                            <li>
                                <strong>Eksplorasi Kuliner Lokal:</strong> Pengguna dapat dengan mudah menjelajahi berbagai pilihan kuliner di sekitar mereka. Baik Anda mencari restoran populer, makanan jalanan, atau tempat makan tersembunyi, Njajan AE menyediakan informasi detail, ulasan, dan rating untuk membantu Anda membuat keputusan makan yang tepat.
                            </li>
                            <li>
                                <strong>Mendukung Pengusaha Kuliner:</strong> Penjual dapat dengan mudah menambahkan bisnis kuliner mereka ke platform. Dengan membuat profil di Njajan AE, penjual dapat menjangkau audiens yang lebih luas, menampilkan menu mereka, dan menarik lebih banyak pelanggan. Fitur ini bertujuan untuk mendukung pengusaha kuliner lokal dalam mengembangkan bisnis mereka.
                            </li>
                        </ul>
                        <p className='text-lg'>
                        Platform ini dibuat oleh Khanza Fadila Azhara, seorang mahasiswa Teknik Informatika semester 4 di Politeknik Elektronika Negeri Surabaya. Proyek ini menunjukkan hasil dari keterampilan dan pengetahuan yang diperoleh sepanjang perkuliahan, mencerminkan kompetensi teknis serta kecintaan terhadap eksplorasi kuliner.
                        </p>
                        <p className='text-lg'>
                            Njajan AE dikembangkan sebagai bagian dari proyek untuk mata kuliah Workshop Pemrograman Framework. Proyek ini menunjukkan penerapan praktis keterampilan dan pengetahuan pengembangan web dalam konteks dunia nyata.
                        </p>
                        <p className="text-lg">
                            Terima kasih telah memilih Njajan AE sebagai pendamping terpercaya Anda untuk semua hal terkait kuliner. Kami berharap Anda menikmati menjelajahi dan menemukan pengalaman makan baru bersama kami!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
