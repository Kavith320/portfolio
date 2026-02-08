import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Portfolio from '@/models/Portfolio';
import fallbackData from '@/data/portfolioData.json';

export async function GET() {
    try {
        await dbConnect();
        const portfolio = await Portfolio.findOne({});

        if (!portfolio) {
            // If no data in DB yet, return the local JSON data as default
            return NextResponse.json(fallbackData);
        }

        return NextResponse.json(portfolio.data);
    } catch (error) {
        console.error('Fetch failed:', error);
        return NextResponse.json(fallbackData); // Fallback to local on error
    }
}
