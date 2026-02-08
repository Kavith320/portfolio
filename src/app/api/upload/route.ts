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
        const response = await utapi.uploadFiles(file);

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

