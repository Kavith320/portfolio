import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Portfolio from '@/models/Portfolio';

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();

        // We use a constant ID or just update the first document found
        // Since it's a single user portfolio, we only need one document
        await Portfolio.findOneAndUpdate(
            {}, // find first document
            { data: body, lastUpdated: new Date() },
            { upsert: true, new: true }
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Save failed:', error);
        return NextResponse.json({ success: false, error: 'Failed to save data' }, { status: 500 });
    }
}
