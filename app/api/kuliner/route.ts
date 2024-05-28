import kulinerService from "@/services/firebase/kuliner-service";
import { addNewCulinary } from "@/services/firebase/auth-service";

export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: Request) {
    const data = await kulinerService.getDaftarKuliner();
    return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
}

export async function POST(request: Request) {
    const body = await request.formData();
    const name = body.get('name') as string;
    const email = body.get('email') as string;
    const password = body.get('password') as string;
    await addNewCulinary(name, email, password);
    return new Response('Data berhasil ditambahkan!', { status: 201 });
}