import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Analytics from '@/models/Analytics';

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const { sessionId, type, path, duration, screenSize } = body;
        
        const userAgent = request.headers.get('user-agent') || 'unknown';

        await Analytics.create({
            sessionId,
            type,
            path,
            duration,
            screenSize,
            userAgent
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Analytics tracking failed:', error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        await dbConnect();
        
        // Aggregate stats for the admin dashboard
        const totalViews = await Analytics.countDocuments({ type: 'page_view' });
        
        // Calculate average session duration
        // We get the max duration for each unique sessionId
        const sessionStats = await Analytics.aggregate([
            { $group: { _id: "$sessionId", maxDuration: { $max: "$duration" } } },
            { $group: { _id: null, avgDuration: { $avg: "$maxDuration" }, totalSessions: { $sum: 1 } } }
        ]);

        const recentActivity = await Analytics.find()
            .sort({ timestamp: -1 })
            .limit(10);

        return NextResponse.json({
            totalViews,
            avgDuration: sessionStats[0]?.avgDuration || 0,
            totalSessions: sessionStats[0]?.totalSessions || 0,
            recentActivity
        });
    } catch (error) {
        console.error('Analytics fetch failed:', error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
