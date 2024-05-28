import kulinerService from "@/services/firebase/kuliner-service";

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request: Request) {
    return new Response('Hello, world!')
}

export async function POST(request: Request) {
    await kulinerService.createAndPopulateDummyData()
    return new Response('Dummy data created and populated successfully!')
}