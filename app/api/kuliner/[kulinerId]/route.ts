import kulinerService from "@/services/firebase/kuliner-service";

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request: Request, { params }: { params: { kulinerId: string } }) {
    const kulinerId = params.kulinerId;
    const data = await kulinerService.getKuliner(kulinerId);
    return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
}

export async function PUT(request: Request, { params }: { params: { kulinerId: string } }) {
    const kulinerId = params.kulinerId;
    const data = await request.json();
    await kulinerService.updateKuliner(kulinerId, data);
    return new Response('Data berhasil diupdate!', { status: 200 });
}

export async function DELETE(request: Request, { params }: { params: { kulinerId: string } }) {
    const kulinerId = params.kulinerId;
    await kulinerService.deleteKuliner(kulinerId);
    return new Response('Data berhasil dihapus!', { status: 200 });
}