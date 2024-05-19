import kulinerService from "@/services/firebase/kuliner-service";
import ulasanService from "@/services/firebase/ulasan-service";

export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: Request) {
    const data = await ulasanService.getKulinerRanking()
    return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
}