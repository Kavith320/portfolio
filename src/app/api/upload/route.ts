import { NextResponse } from 'next/server';
import { UTApi } from "uploadthing/server";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
        }

        const utapi = new UTApi();

        // Convert to WebP and resize using sharp
        const sharp = (await import('sharp')).default;
        const buffer = Buffer.from(await file.arrayBuffer());

        // Resize while maintaining aspect ratio and convert to WebP
        const optimizedBuffer = await sharp(buffer)
            .resize(1200, 1200, {
                fit: 'inside',
                withoutEnlargement: true
            })
            .webp({ quality: 80 }) // 80 quality for good balance of size/quality
            .toBuffer();

        // Create a new File object from the optimized buffer
        // Note: We rename the extension to .webp
        const optimizedFile = new File([new Uint8Array(optimizedBuffer)], `${file.name.split('.')[0]}.webp`, {
            type: 'image/webp'
        });

        const response = await utapi.uploadFiles(optimizedFile);

        // Handle both single object and array responses
        const result = Array.isArray(response) ? response[0] : response;

        if (result.error) {
            console.error('UploadThing error:', result.error);
            return NextResponse.json({ success: false, error: 'Failed to upload to UploadThing' }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            url: result.data.url
        });
    } catch (error) {
        console.error('Upload failed:', error);
        return NextResponse.json({ success: false, error: 'Failed to upload image' }, { status: 500 });
    }
}

