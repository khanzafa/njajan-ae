import galeriService from "@/services/firebase/galeri-service";

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request: Request, { params }: { params: { kulinerId: string, fotoId: string } }) {
    const data = await galeriService.getFoto(params.kulinerId, params.fotoId);
    return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
}

export async function DELETE(request: Request, { params }: { params: { kulinerId: string, fotoId: string } }) {
    await galeriService.deleteFoto(params.kulinerId, params.fotoId);
    return new Response('Foto berhasil dihapus!', { status: 200 });
}

export async function PUT(request: Request, { params }: { params: { kulinerId: string, fotoId: string } }) {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const description = formData.get('description') as string;
    await galeriService.addFoto(params.kulinerId, file, description);
    return new Response('Foto berhasil ditambahkan!', { status: 201 });
}