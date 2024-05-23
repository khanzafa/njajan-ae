import menuService from "@/services/firebase/menu-service";

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request: Request, { params }: { params: { kulinerId: string } }) {
    const kulinerId = params.kulinerId;
    const data = await menuService.getDaftarMenu(kulinerId);
    return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
}

export async function POST(request: Request, { params }: { params: { kulinerId: string } }) {
    // const kulinerId = params.kulinerId;
    // const data = await request.json();
    const kulinerId = params.kulinerId;
    const formData = await request.formData();
    const data: any = {};

    formData.forEach((value, key) => {
        data[key] = value;
    });
    await menuService.addMenu(kulinerId, data);
    return new Response('Data berhasil ditambahkan!', { status: 201 });
}