import galeriService from "@/services/firebase/galeri-service";

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request: Request, { params }: { params: { kulinerId: string } }) {
    const data = await galeriService.getDaftarFoto(params.kulinerId);
    return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
}

export async function POST(request: Request, { params }: { params: { kulinerId: string } }) {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const description = formData.get('description') as string;
    await galeriService.addFoto(params.kulinerId, file, description);
    return new Response('Foto berhasil ditambahkan!', { status: 201 });
}