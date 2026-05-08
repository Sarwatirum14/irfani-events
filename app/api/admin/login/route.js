import { connectToDatabase } from '@/lib/mongodb';
import Admin from '@/models/admin';
import bcrypt from 'bcryptjs';

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return new Response(JSON.stringify({ error: 'Email and password are required' }), { status: 400 });
        }

        await connectToDatabase();

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
        }

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error('Admin login error:', error);
        return new Response(JSON.stringify({ error: 'Login failed' }), { status: 500 });
    }
}
