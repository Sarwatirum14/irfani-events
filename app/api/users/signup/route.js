import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/user';
import bcrypt from 'bcryptjs';

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return new Response(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
        }

        await connectToDatabase();

        const existing = await User.findOne({ email });
        if (existing) {
            return new Response(JSON.stringify({ error: 'User already exists' }), { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ name, email, password: hashedPassword });

        return new Response(JSON.stringify({ success: true }), { status: 201 });
    } catch (error) {
        console.error('Signup error:', error);
        return new Response(JSON.stringify({ error: 'Signup failed' }), { status: 500 });
    }
}
