import ulasanService from "@/services/firebase/ulasan-service";

export const dynamic = 'force-dynamic' // defaults to auto

// Get balasan
export async function GET(request: Request, { params }: { params: { kulinerId: string, ulasanId: string } }) {
    const ulasanId = params.ulasanId;
    const kulinerId = params.kulinerId;
    const data = await ulasanService.getDaftarBalasan(kulinerId, ulasanId);
    return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
}

// Post balasan
export async function POST(request: Request, { params }: { params: { kulinerId: string, ulasanId: string } }) {
    const ulasanId = params.ulasanId;
    const kulinerId = params.kulinerId;
    const data = await request.json();
    data.waktu = new Date();
    await ulasanService.addBalasan(kulinerId, ulasanId, data);
    return new Response('Data berhasil ditambahkan!', { status: 201 });
}