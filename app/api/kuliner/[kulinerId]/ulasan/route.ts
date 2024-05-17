import ulasanService from "@/services/firebase/ulasan-service";

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request: Request, { params }: { params: { kulinerId: string } }) {
    const data = await ulasanService.getDaftarUlasan(params.kulinerId);
    return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
}

export async function POST(request: Request, { params }: { params: { kulinerId: string } }) {
    const data = await request.json();
    data.waktu = new Date();
    await ulasanService.addUlasan(params.kulinerId, data);
    return new Response('Data berhasil ditambahkan!', { status: 201 });
}