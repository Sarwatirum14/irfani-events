import { connectToDatabase } from '@/lib/mongodb';
import Admin from '@/models/admin';
import bcrypt from 'bcryptjs';

export async function GET() {
    try {
        await connectToDatabase();

        const existing = await Admin.findOne({ email: 'admin@event.com' });
        if (existing) {
            return new Response(JSON.stringify({ message: 'Admin already exists' }), { status: 200 });
        }

        const hashedPassword = await bcrypt.hash('sz', 10);
        await Admin.create({ email: 'admin@event.com', password: hashedPassword });

        return new Response(JSON.stringify({ message: 'Admin created successfully' }), { status: 201 });
    } catch (error) {
        console.error('Seed error:', error);
        return new Response(JSON.stringify({ error: 'Seed failed' }), { status: 500 });
    }
}
