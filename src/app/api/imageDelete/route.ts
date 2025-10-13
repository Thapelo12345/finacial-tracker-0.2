import ImageKit from "imagekit";
import { NextRequest } from "next/server";

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
    urlEndpoint: process.env.IMAGEKIT_PUBLIC_URL_END_POINT as string,
});

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fieldId = searchParams.get('fieldId');
    
    if (!fieldId) {return new Response('Missing fieldId parameter', { status: 400 });}

    // Add your ImageKit deletion logic here
    const response = await imagekit.deleteFile(fieldId);
    console.log(response)
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Deletion failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}