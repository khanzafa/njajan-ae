import ulasanService from "@/services/firebase/ulasan-service";

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request: Request, { params }: { params: { kulinerId: string, ulasanId: string } }) {
    const ulasanId = params.ulasanId;
    const kulinerId = params.kulinerId;
    const data = await ulasanService.getUlasan(kulinerId, ulasanId);
    return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
}

export async function PUT(request: Request, { params }: { params: { kulinerId: string, ulasanId: string } }) {
    const ulasanId = params.ulasanId;
    const kulinerId = params.kulinerId;
    const data = await request.json();
    await ulasanService.updateUlasan(kulinerId, ulasanId, data);
    return new Response('Data berhasil diupdate!', { status: 200 });
}

export async function DELETE(request: Request, { params }: { params: { kulinerId: string, ulasanId: string } }) {
    const ulasanId = params.ulasanId;
    const kulinerId = params.kulinerId;
    await ulasanService.deleteUlasan(kulinerId, ulasanId);
    return new Response('Data berhasil dihapus!', { status: 200 });
}