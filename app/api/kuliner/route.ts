import kulinerService from "@/services/firebase/kuliner-service";

export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: Request) {
    const data = await kulinerService.getDaftarKuliner();
    return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
}

export async function POST(request: Request) {
    const data = await request.json();
    await kulinerService.addKuliner(data);
    return new Response('Data berhasil ditambahkan!', { status: 201 });
}