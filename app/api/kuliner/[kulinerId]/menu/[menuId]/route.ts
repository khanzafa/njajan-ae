import menuService from "@/services/firebase/menu-service";

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request: Request, { params }: { params: { kulinerId: string, menuId: string } }) {
    const kulinerId = params.kulinerId;
    const menuId = params.menuId;
    console.log(
        'kulinerId: ', kulinerId,
        'menuId: ', menuId
    )
    const data = await menuService.getMenu(kulinerId, menuId);
    return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
}

export async function PUT(request: Request, { params }: { params: { kulinerId: string, menuId: string } }) {
    const kulinerId = params.kulinerId;
    const menuId = params.menuId;
    const data = await request.json();
    await menuService.updateMenu(kulinerId, menuId, data);
    return new Response('Data berhasil diupdate!', { status: 200 });
}

export async function DELETE(request: Request, { params }: { params: { kulinerId: string, menuId: string } }) {
    const kulinerId = params.kulinerId;
    const menuId = params.menuId;
    await menuService.deleteMenu(kulinerId, menuId);
    return new Response('Data berhasil dihapus!', { status: 200 });
}