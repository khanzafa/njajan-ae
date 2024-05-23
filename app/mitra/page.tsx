'use client';

import Link from 'next/link';
import Header from '@/components/Header/page';

export default function MitraPage() {
    return (
            <div className="p-4 pt-20 bg-[#DBE2EF] dark:bg-[#1B262C] min-h-screen">
                <div className="p-4 border-2 border-[#B2BABB] border-dashed rounded-lg dark:border-[#DBE2EF]">
                    <div className="mb-4">
                        <h1 className="text-2xl font-bold">Bergabunglah Sebagai Mitra Njajan AE</h1>
                    </div>
                    <div className="space-y-4">
                        <p className="text-lg">
                            Apakah Anda pemilik bisnis kuliner yang ingin menjangkau lebih banyak pelanggan? Njajan AE adalah platform yang tepat untuk Anda! Bergabunglah bersama kami dan nikmati berbagai manfaat yang kami tawarkan untuk para mitra bisnis kuliner:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-lg">
                            <li>Jangkauan pelanggan yang lebih luas melalui platform kami yang populer di kalangan pecinta kuliner.</li>
                            <li>Profil bisnis yang dapat diperbarui dengan informasi terbaru, menu, dan promosi spesial.</li>
                            <li>Ulasan dan rating dari pelanggan yang membantu meningkatkan kredibilitas dan popularitas bisnis Anda.</li>
                            <li>Dukungan dan fitur khusus untuk mempromosikan bisnis kuliner Anda secara lebih efektif.</li>
                        </ul>
                        <p className="text-lg">
                            Jangan lewatkan kesempatan ini untuk mengembangkan bisnis kuliner Anda. Daftarkan bisnis Anda sekarang dan mulailah menarik lebih banyak pelanggan dengan Njajan AE!
                        </p>
                        <div className="flex justify-center">
                            <Link href="/register/culinary" className="bg-[#3F72AF] text-white px-4 py-2 rounded-md hover:bg-[#112D4E] focus:outline-none focus:ring-2 focus:ring-[#3F72AF] dark:bg-[#3F72AF] dark:focus:ring-[#3F72AF]">
                                    Daftar Sekarang
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
    );
}
