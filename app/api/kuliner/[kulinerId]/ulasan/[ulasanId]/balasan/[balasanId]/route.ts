import ulasanService from "@/services/firebase/ulasan-service";

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request: Request, { params }: { params: { kulinerId: string, ulasanId: string, balasanId: string } }) {
    const balasanId = params.balasanId;
    const ulasanId = params.ulasanId;
    const kulinerId = params.kulinerId;
    const data = await ulasanService.getBalasan(kulinerId, ulasanId, balasanId);
    return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
}

export async function PUT(request: Request, { params }: { params: { kulinerId: string, ulasanId: string, balasanId: string } }) {
    const balasanId = params.balasanId;
    const ulasanId = params.ulasanId;
    const kulinerId = params.kulinerId;
    const data = await request.json();
    await ulasanService.updateBalasan(kulinerId, ulasanId, balasanId, data);
    return new Response('Data berhasil diupdate!', { status: 200 });
}

export async function DELETE(request: Request, { params }: { params: { kulinerId: string, ulasanId: string, balasanId: string } }) {
    const balasanId = params.balasanId;
    const ulasanId = params.ulasanId;
    const kulinerId = params.kulinerId;
    await ulasanService.deleteBalasan(kulinerId, ulasanId, balasanId);
    return new Response('Data berhasil dihapus!', { status: 200 });
}