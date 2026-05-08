"use client";
import { useEffect, useState } from 'react';

export default function AdminPage() {
    const [bookings, setBookings] = useState([]);
    const [adminLoggedIn, setAdminLoggedIn] = useState(false);
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchBookings = async() => {
        setLoading(true);
        try {
            const res = await fetch('/api/bookings');
            if (!res.ok) throw new Error('Failed to fetch');
            const data = await res.json();
            setBookings(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const stored = localStorage.getItem('adminLoggedIn');
        if (stored === 'true') {
            setAdminLoggedIn(true);
            fetchBookings();
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });
            if (res.ok) {
                setAdminLoggedIn(true);
                localStorage.setItem('adminLoggedIn', 'true');
                fetchBookings();
            } else {
                const data = await res.json();
                alert(data.error || 'Invalid admin credentials');
            }
        } catch (err) {
            console.error(err);
            alert('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        setAdminLoggedIn(false);
        localStorage.removeItem('adminLoggedIn');
    };

    const handleDelete = async(id) => {
        if (!confirm('Delete this booking?')) return;
        try {
            const res = await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setBookings((prev) => prev.filter((b) => b._id !== id));
            } else {
                alert('Failed to delete.');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleAccept = (id) => {
        setBookings((prev) => prev.map((b) => (b._id === id ? {...b, accepted: true } : b)));
    };

    const filtered = bookings.filter((b) => {
        const matchFilter =
            filter === 'all' ||
            (filter === 'accepted' && b.accepted) ||
            (filter === 'pending' && !b.accepted);
        const matchSearch = !search ||
            (b.name && b.name.toLowerCase().includes(search.toLowerCase())) ||
            (b.email && b.email.toLowerCase().includes(search.toLowerCase())) ||
            (b.eventType && b.eventType.toLowerCase().includes(search.toLowerCase()));
        return matchFilter && matchSearch;
    });

    const stats = {
        total: bookings.length,
        accepted: bookings.filter((b) => b.accepted).length,
        pending: bookings.filter((b) => !b.accepted).length,
    };

    if (!adminLoggedIn) {
        return ( <
            div className = "min-h-screen bg-cover bg-center flex items-center justify-center px-4"
            style = {
                { backgroundImage: "url('/back13.jpg')" }
            } >
            <
            div className = "fixed inset-0 bg-black/80" / >
            <
            div className = "relative z-10 w-full max-w-sm" >
            <
            div className = "bg-gradient-to-r from-pink-700 to-pink-500 rounded-t-2xl px-8 py-6 text-center" >
            <
            p className = "text-pink-200 text-xs uppercase tracking-widest mb-1" > IRFANI Events < /p> <
            h2 className = "text-white text-3xl font-bold font-serif" > Admin Portal < /h2> < /
            div > <
            form onSubmit = { handleLogin }
            className = "bg-[#0d0d0d] border border-gray-800 border-t-0 rounded-b-2xl px-8 py-8 space-y-5 shadow-2xl" >
            <
            div >
            <
            label className = "text-gray-500 text-xs uppercase tracking-widest block mb-2" > Email < /label> <
            input type = "email"
            required placeholder = "admin@event.com"
            value = { credentials.email }
            onChange = {
                (e) => setCredentials({...credentials, email: e.target.value })
            }
            className = "w-full bg-[#111] border border-gray-800 focus:border-pink-500 text-white px-4 py-3 rounded-xl outline-none transition-colors placeholder-gray-600 text-sm" /
            >
            <
            /div> <
            div >
            <
            label className = "text-gray-500 text-xs uppercase tracking-widest block mb-2" > Password < /label> <
            input type = "password"
            required placeholder = "••••••••"
            value = { credentials.password }
            onChange = {
                (e) => setCredentials({...credentials, password: e.target.value })
            }
            className = "w-full bg-[#111] border border-gray-800 focus:border-pink-500 text-white px-4 py-3 rounded-xl outline-none transition-colors placeholder-gray-600 text-sm" /
            >
            <
            /div> <
            button type = "submit"
            className = "w-full bg-pink-600 hover:bg-pink-500 text-white py-3 rounded-xl font-medium transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-pink-600/30" >
            Login to Admin <
            /button> < /
            form > <
            /div> < /
            div >
        );
    }

    return ( <
            div className = "min-h-screen bg-[#070707] text-white pt-24 pb-16 px-4 md:px-10" >
            <
            div className = "max-w-6xl mx-auto" >
            <
            div className = "flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10" >
            <
            div >
            <
            p className = "text-pink-500 text-xs uppercase tracking-widest mb-1" > Admin Dashboard < /p> <
            h1 className = "text-4xl font-bold text-white font-serif" > All Bookings < /h1> < /
            div > <
            div className = "flex items-center gap-3" >
            <
            button onClick = { fetchBookings }
            className = "bg-[#1a1a1a] border border-gray-700 hover:border-gray-500 text-white px-4 py-2 rounded-xl text-sm transition-colors" > ↺Refresh <
            /button> <
            button onClick = { handleLogout }
            className = "bg-red-600/20 hover:bg-red-600/40 border border-red-500/30 text-red-400 px-4 py-2 rounded-xl text-sm transition-colors" >
            Logout <
            /button> < /
            div > <
            /div>

            <
            div className = "grid grid-cols-3 gap-4 mb-8" > {
                [
                    { label: 'Total', value: stats.total, color: 'text-white' },
                    { label: 'Pending', value: stats.pending, color: 'text-yellow-400' },
                    { label: 'Accepted', value: stats.accepted, color: 'text-green-400' },
                ].map((s) => ( <
                    div key = { s.label }
                    className = "bg-[#111] border border-gray-800 rounded-2xl px-5 py-4 text-center" >
                    <
                    p className = { `text-3xl font-bold mb-1 ${s.color} font-serif` } > { s.value } < /p> <
                    p className = "text-gray-500 text-xs uppercase tracking-widest" > { s.label } < /p> < /
                    div >
                ))
            } <
            /div>

            <
            div className = "flex flex-col sm:flex-row gap-3 mb-6" >
            <
            input value = { search }
            onChange = {
                (e) => setSearch(e.target.value)
            }
            placeholder = "Search by name, email, or event..."
            className = "flex-1 bg-[#111] border border-gray-800 focus:border-pink-500 text-white px-4 py-2.5 rounded-xl outline-none transition-colors placeholder-gray-600 text-sm" /
            >
            <
            div className = "flex gap-2" > {
                ['all', 'pending', 'accepted'].map((f) => ( <
                    button key = { f }
                    onClick = {
                        () => setFilter(f)
                    }
                    className = { `px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
                  filter === f
                    ? 'bg-pink-600 text-white'
                    : 'bg-[#111] border border-gray-800 text-gray-400 hover:border-gray-600'
                }` } > { f } <
                    /button>
                ))
            } <
            /div> < /
            div >

            {
                loading ? ( <
                    div className = "text-center py-20 text-gray-500" > Loading bookings... < /div>
                ) : filtered.length === 0 ? ( <
                        div className = "text-center py-20" >
                        <
                        p className = "text-4xl mb-4" > 📭 < /p> <
                        p className = "text-gray-500" > No bookings found. < /p> < /
                        div >
                    ) : ( <
                        div className = "space-y-4" > {
                            filtered.map((booking) => ( <
                                    div key = { booking._id }
                                    className = { `bg-[#111] border rounded-2xl p-6 transition-all ${
                  booking.accepted ? 'border-green-500/20' : 'border-gray-800'
                }` } >
                                    <
                                    div className = "flex flex-col sm:flex-row sm:items-start justify-between gap-4" >
                                    <
                                    div className = "flex-1" >
                                    <
                                    div className = "flex items-center gap-3 mb-3 flex-wrap" >
                                    <
                                    span className = "text-white font-semibold text-lg font-serif" > { booking.name } < /span> <
                                    span className = "bg-pink-600/20 text-pink-400 text-xs px-3 py-1 rounded-full border border-pink-500/20" > { booking.eventType } <
                                    /span> {
                                    booking.accepted ? ( <
                                        span className = "bg-green-500/20 text-green-400 text-xs px-3 py-1 rounded-full border border-green-500/20" > ✓Accepted <
                                        /span>
                                    ) : ( <
                                        span className = "bg-yellow-500/10 text-yellow-400 text-xs px-3 py-1 rounded-full border border-yellow-500/20" >
                                        Pending <
                                        /span>
                                    )
                                } <
                                /div>

                                <
                                div className = "grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-400" >
                                <
                                span > 📅{ booking.date } < /span> <
                                span > 👥{ booking.guests }
                                guests < /span> <
                                span > 📍{ booking.location } < /span> <
                                span > 📞{ booking.phone } < /span> < /
                                div > <
                                div className = "mt-2 text-xs text-gray-500 flex gap-4" >
                                <span>✉️{ booking.email }</span> {
                                booking.createdAt && (<span>Submitted: {new Date(booking.createdAt).toLocaleDateString()}</span>)} </div> {
                                    booking.description && (<p className="mt-3 text-sm text-gray-400 bg-[#1a1a1a] rounded-xl px-4 py-2 border border-gray-800">{ booking.description }</p>)
                                } <
                                /div> <
                                div className = "flex gap-2 sm:flex-col sm:items-end" > {!booking.accepted && ( <
                                        button onClick = {
                                            () => handleAccept(booking._id)
                                        }
                                        className = "bg-green-600/20 hover:bg-green-600/40 border border-green-500/30 text-green-400 px-4 py-2 rounded-xl text-sm transition-colors" >
                                        Accept <
                                        /button>
                                    )
                                } <
                                button onClick = {
                                    () => handleDelete(booking._id)
                                }
                                className = "bg-red-600/20 hover:bg-red-600/40 border border-red-500/30 text-red-400 px-4 py-2 rounded-xl text-sm transition-colors" >
                                Delete <
                                /button> < /
                                div > <
                                /div> < /
                                div >
                            ))
                    } <
                    /div>
            )
        } <
        /div> < /
        div >
);
}