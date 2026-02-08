import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        const adminUser = process.env.ADMIN_USERNAME || 'admin';
        const adminPass = process.env.ADMIN_PASSWORD || 'password123';

        if (username === adminUser && password === adminPass) {
            // In a real app, you'd set a secure cookie/JWT here.
            // For a simple portfolio protection, we'll return success.
            return NextResponse.json({ success: true, token: 'admin-logged-in' });
        }

        return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Login failed' }, { status: 500 });
    }
}
