"use client";
import { useState, useEffect } from 'react';

const inputClass =
  "w-full bg-[#111] border border-gray-800 focus:border-pink-500 text-white px-4 py-3 rounded-xl outline-none transition-colors placeholder-gray-600 text-sm";
const selectClass =
  "w-full bg-[#111] border border-gray-800 focus:border-pink-500 text-white px-4 py-3 rounded-xl outline-none transition-colors text-sm";

export default function BookingSystem() {
  const [view, setView] = useState('login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    date: '',
    guests: '',
    eventType: '',
    location: '',
    description: '',
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      const user = JSON.parse(stored);
      setCurrentUser(user);
      setView('dashboard');
      fetchUserBookings(user.email);
    }
  }, []);

  const fetchUserBookings = async (email) => {
    try {
      const res = await fetch('/api/bookings');
      if (!res.ok) return;
      const data = await res.json();
      setBookings(data.filter((b) => b.email === email));
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSignup = async () => {
    if (!formData.name || !formData.email || !formData.password) return alert('All fields required.');
    if (!/^[A-Za-z\s]+$/.test(formData.name)) return alert('Name should contain only letters.');
    setLoading(true);
    try {
      const res = await fetch('/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name, email: formData.email, password: formData.password }),
      });
      const data = await res.json();
      if (!res.ok) return alert(data.error || 'Signup failed.');
      resetForm();
      setView('login');
    } catch (err) {
      alert('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });
      const data = await res.json();
      if (!res.ok) return alert(data.error || 'Invalid credentials.');
      setCurrentUser(data.user);
      localStorage.setItem('currentUser', JSON.stringify(data.user));
      resetForm();
      fetchUserBookings(data.user.email);
      setView('dashboard');
    } catch (err) {
      alert('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setBookings([]);
    localStorage.removeItem('currentUser');
    setView('login');
  };

  const handleBookingSubmit = async () => {
    const required = ['name', 'phone', 'date', 'guests', 'eventType', 'location'];
    if (required.some((f) => !formData[f])) return alert('Please fill all required fields.');
    if (!/^\d+$/.test(formData.phone)) return alert('Phone must be digits only.');

    const today = new Date().toISOString().split('T')[0];
    if (formData.date <= today) return alert('Please select a future date.');

    setLoading(true);
    const { _id, id, ...clean } = formData;
    const booking = { ...clean, email: currentUser.email, createdAt: new Date().toISOString() };

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking),
      });

      if (!res.ok) throw new Error((await res.json()).message || 'Failed');

      await fetchUserBookings(currentUser.email);
      resetForm();
      setView('viewBookings');
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () =>
    setFormData({ name: '', email: '', password: '', phone: '', date: '', guests: '', eventType: '', location: '', description: '' });

  const userBookings = bookings;

  const views = {
    login: 'Login',
    signup: 'Create Account',
    dashboard: 'Dashboard',
    booking: 'Book an Event',
    viewBookings: 'My Bookings',
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-24"
      style={{ backgroundImage: "url('/back7.webp')" }}
    >
      <div className="absolute inset-0 bg-black/70" style={{ position: 'fixed' }} />

      <div className="relative z-10 w-full max-w-lg">
        {/* Card Header */}
        <div className="bg-gradient-to-r from-pink-700 to-pink-500 rounded-t-2xl px-8 py-5 flex items-center justify-between">
          <div>
            <p className="text-pink-200 text-xs uppercase tracking-widest">IRFANI Events</p>
            <h2 className="text-white text-2xl font-bold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {views[view]}
            </h2>
          </div>
          {currentUser && (
            <button
              onClick={handleLogout}
              className="text-pink-200 hover:text-white text-xs border border-pink-300/30 px-3 py-1.5 rounded-full transition-colors"
            >
              Logout
            </button>
          )}
        </div>

        {/* Card Body */}
        <div className="bg-[#0d0d0d] border border-gray-800 border-t-0 rounded-b-2xl px-8 py-8 space-y-5 shadow-2xl">
          {/* LOGIN */}
          {view === 'login' && (
            <>
              <div>
                <label className="text-gray-500 text-xs uppercase tracking-widest block mb-2">Email</label>
                <input
                  name="email"
                  placeholder="you@example.com"
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-gray-500 text-xs uppercase tracking-widest block mb-2">Password</label>
                <input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-pink-600 hover:bg-pink-500 disabled:opacity-50 text-white py-3 rounded-xl font-medium transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-pink-600/30"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
              <p className="text-center text-gray-500 text-sm">
                No account?{' '}
                <button
                  onClick={() => setView('signup')}
                  className="text-pink-400 hover:text-pink-300 underline"
                >
                  Create one
                </button>
              </p>
            </>
          )}

          {/* SIGNUP */}
          {view === 'signup' && (
            <>
              <div>
                <label className="text-gray-500 text-xs uppercase tracking-widest block mb-2">Full Name</label>
                <input
                  name="name"
                  placeholder="Your Name"
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-gray-500 text-xs uppercase tracking-widest block mb-2">Email</label>
                <input
                  name="email"
                  placeholder="you@example.com"
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-gray-500 text-xs uppercase tracking-widest block mb-2">Password</label>
                <input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <button
                onClick={handleSignup}
                disabled={loading}
                className="w-full bg-pink-600 hover:bg-pink-500 disabled:opacity-50 text-white py-3 rounded-xl font-medium transition-all hover:-translate-y-0.5"
              >
                {loading ? 'Creating...' : 'Create Account'}
              </button>
              <p className="text-center text-gray-500 text-sm">
                Have an account?{' '}
                <button
                  onClick={() => setView('login')}
                  className="text-pink-400 hover:text-pink-300 underline"
                >
                  Login
                </button>
              </p>
            </>
          )}

          {/* DASHBOARD */}
          {view === 'dashboard' && (
            <div className="space-y-3">
              <p className="text-gray-400 text-sm text-center mb-6">
                Welcome back, <span className="text-white font-medium">{currentUser?.name}</span> 👋
              </p>
              <button
                onClick={() => setView('booking')}
                className="w-full bg-pink-600 hover:bg-pink-500 text-white py-3 rounded-xl font-medium transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <span>✨</span> Book an Event
              </button>
              <button
                onClick={() => setView('viewBookings')}
                className="w-full bg-[#1a1a1a] hover:bg-[#222] border border-gray-700 text-white py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
              >
                <span>📋</span> My Bookings
                {userBookings.length > 0 && (
                  <span className="ml-auto bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {userBookings.length}
                  </span>
                )}
              </button>
            </div>
          )}

          {/* BOOKING FORM */}
          {view === 'booking' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-gray-500 text-xs uppercase tracking-widest block mb-2">Full Name</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-gray-500 text-xs uppercase tracking-widest block mb-2">Phone</label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="03XXXXXXXXX"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-gray-500 text-xs uppercase tracking-widest block mb-2">Guests</label>
                  <input
                    name="guests"
                    type="number"
                    value={formData.guests}
                    onChange={handleChange}
                    placeholder="50"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-gray-500 text-xs uppercase tracking-widest block mb-2">Date</label>
                  <input
                    type="date"
                    name="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.date}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-gray-500 text-xs uppercase tracking-widest block mb-2">Event Type</label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className={selectClass}
                  >
                    <option value="">Select type</option>
                    <option>Wedding</option>
                    <option>Birthday</option>
                    <option>Corporate</option>
                    <option>Anniversary</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="text-gray-500 text-xs uppercase tracking-widest block mb-2">Location</label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={selectClass}
                  >
                    <option value="">Select location</option>
                    <option>Banquet Hall</option>
                    <option>Destination Wedding</option>
                    <option>Outdoor Garden</option>
                    <option>Home Setup</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="text-gray-500 text-xs uppercase tracking-widest block mb-2">Special Requests</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Tell us more about your event..."
                    rows={3}
                    className={`${inputClass} resize-none`}
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleBookingSubmit}
                  disabled={loading}
                  className="flex-1 bg-pink-600 hover:bg-pink-500 disabled:opacity-50 text-white py-3 rounded-xl font-medium transition-all hover:-translate-y-0.5"
                >
                  {loading ? 'Submitting...' : 'Submit Booking'}
                </button>
                <button
                  onClick={() => setView('dashboard')}
                  className="px-5 bg-[#1a1a1a] hover:bg-[#222] border border-gray-700 text-white rounded-xl transition-colors"
                >
                  Back
                </button>
              </div>
            </>
          )}

          {/* VIEW BOOKINGS */}
          {view === 'viewBookings' && (
            <>
              {userBookings.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-4xl mb-4">📭</p>
                  <p className="text-gray-400">No bookings yet.</p>
                  <button
                    onClick={() => setView('booking')}
                    className="mt-4 text-pink-400 hover:text-pink-300 text-sm underline"
                  >
                    Make your first booking
                  </button>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
                  {userBookings.map((b, idx) => (
                    <div
                      key={b._id || idx}
                      className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-pink-400 font-semibold text-sm">{b.eventType}</span>
                        <span className="text-gray-500 text-xs">{b.date}</span>
                      </div>
                      <p className="text-gray-400 text-xs mb-1">
                        📍 {b.location} · 👥 {b.guests} guests
                      </p>
                      {b.description && (
                        <p className="text-gray-500 text-xs mt-2 border-t border-gray-800 pt-2">
                          {b.description}
                        </p>
                      )}
                      {b.accepted && (
                        <p className="mt-2 text-green-400 text-xs font-medium flex items-center gap-1">
                          <span>✓</span> Accepted
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <button
                onClick={() => setView('dashboard')}
                className="w-full bg-[#1a1a1a] hover:bg-[#222] border border-gray-700 text-white py-3 rounded-xl font-medium transition-colors text-sm"
              >
                ← Back to Dashboard
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
