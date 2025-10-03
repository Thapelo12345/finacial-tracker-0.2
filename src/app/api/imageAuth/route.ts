import { getUploadAuthParams } from "@imagekit/next/server"

export async function GET() {
    const { token, expire, signature } = getUploadAuthParams({
        privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY as string, // Never expose this on client side
        publicKey: process.env.NEXT_PUBLIC_KEY as string,
    })

    return Response.json({ token, expire, signature, publicKey: process.env.NEXT_PUBLIC_KEY })
}