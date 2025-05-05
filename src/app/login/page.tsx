'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();
  const { setUser } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      setUser({
        E_ID: data.user.e_id,
        Designation: data.user.designation,
        E_Fname: data.user.e_fname,
        E_Lname: data.user.e_lname,
      });
      // Redirect based on Designation
      const role = (data.user.designation || '').toLowerCase();
      if (role === 'admin' || role === 'owner' || role === 'manager') {
        router.push('/admin');
      } else if (role === 'pharmacist') {
        router.push('/pharmacist');
      } else if (role === 'staff') {
        router.push('/staff');
      } else {
        router.push('/'); // fallback
      }
    } else {
      setError(data.error || 'Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-blue-300 text-gray-700">
      <div className="header bg-blue-900 text-white text-center py-6 w-full mb-8 shadow">
        <h1 className="text-4xl font-bold tracking-wide">ELYXIR</h1>
        <p className="text-xl mt-2">Pharmacy Management System</p>
      </div>
      <div className="bg-white rounded shadow-lg w-full max-w-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          {error && (
            <div className="mb-4 text-center text-red-600 font-semibold">{error}</div>
          )}
          <div className="flex flex-col gap-2">
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="footer bg-blue-900 text-white text-center w-full py-4 mt-8">
        Made in SRM🩵
      </div>
    </div>
  );
}
