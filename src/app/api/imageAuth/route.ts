import { getUploadAuthParams } from "@imagekit/next/server"

export async function GET() {
    const { token, expire, signature } = getUploadAuthParams({
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string, // Never expose this on client side
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
    })

    return Response.json({ token, expire, signature, publicKey: process.env.IMAGEKIT_PUBLIC_KEY })
}
   /*
import { getUploadAuthParams } from "@imagekit/next/server";

export async function GET(): Promise<Response> {
  // Validate environment variables
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;

  if (!privateKey) {
    return Response.json(
      { error: "IMAGEKIT_PRIVATE_KEY environment variable is not set" },
      { status: 500 }
    );
  }

  if (!publicKey) {
    return Response.json(
      { error: "IMAGEKIT_PUBLIC_KEY environment variable is not set" },
      { status: 500 }
    );
  }

  try {
    const { token, expire, signature } = getUploadAuthParams({
      privateKey: privateKey,
      publicKey: publicKey,
    });

    return Response.json({
      token,
      expire,
      signature,
      publicKey: publicKey,
    });
  } catch (error) {
    console.error("ImageKit authentication error:", error);
    return Response.json(
      { error: "Failed to generate upload authentication" },
      { status: 500 }
    );
  }
}
  */