import { getCurrentUser } from "@/services/firebase/auth-service"
import { useRouter } from "next/navigation"

export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: Request) {
    const uid = await getCurrentUser().then(user => user?.uid)
    console.log('uid', uid)
    if (uid) {
        return new Response('Redirecting...', {
            status: 302,
            headers: {
                'Location': `/dashboard/${uid}`
            }
        })
    } else {
        return new Response('Unauthorized', {
            status: 401,
            headers : {
                'Location': '/kuliner'
            }
        })
    }
}