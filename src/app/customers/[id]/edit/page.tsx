'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditCustomerPage() {
  const router = useRouter();
  const params = useParams();
  const customerId = params?.id as string;

  const [form, setForm] = useState({
    C_ID: '',
    C_Fname: '',
    C_Lname: '',
    C_Age: '',
    C_Gender: '',
    C_Phone: '',
    C_Mail: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`/api/customers/${customerId}`)
      .then(res => res.json())
      .then(data => {
        setForm({
          C_ID: data.C_ID,
          C_Fname: data.C_Fname,
          C_Lname: data.C_Lname,
          C_Age: data.C_Age,
          C_Gender: data.C_Gender,
          C_Phone: data.C_Phone,
          C_Mail: data.C_Mail,
        });
      });
  }, [customerId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    const res = await fetch(`/api/customers/${customerId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        C_Fname: form.C_Fname,
        C_Lname: form.C_Lname,
        C_Age: Number(form.C_Age),
        C_Gender: form.C_Gender,
        C_Phone: form.C_Phone,
        C_Mail: form.C_Mail,
      }),
    });
    if (res.ok) {
      setMessage('Customer updated successfully!');
      setTimeout(() => router.push('/customers'), 1000);
    } else {
      setMessage('Error! Unable to update.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center text-gray-700">
      <div className="bg-white rounded shadow p-8 max-w-2xl w-full">
        <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">UPDATE CUSTOMER DETAILS</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-semibold">Customer ID:</label>
            <input
              type="number"
              name="C_ID"
              value={form.C_ID}
              readOnly
              className="w-full p-2 border rounded bg-gray-100"
            />
            <label className="block mt-4 mb-1 font-semibold">First Name:</label>
            <input
              type="text"
              name="C_Fname"
              value={form.C_Fname}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <label className="block mt-4 mb-1 font-semibold">Last Name:</label>
            <input
              type="text"
              name="C_Lname"
              value={form.C_Lname}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <label className="block mt-4 mb-1 font-semibold">Age:</label>
            <input
              type="number"
              name="C_Age"
              value={form.C_Age}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Gender:</label>
            <select
              name="C_Gender"
              value={form.C_Gender}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="">Select</option>
              <option value="F">Female</option>
              <option value="M">Male</option>
              <option value="O">Other</option>
            </select>
            <label className="block mt-4 mb-1 font-semibold">Phone Number:</label>
            <input
              type="text"
              name="C_Phone"
              value={form.C_Phone}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <label className="block mt-4 mb-1 font-semibold">Email ID:</label>
            <input
              type="email"
              name="C_Mail"
              value={form.C_Mail}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="col-span-2 flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800"
            >
              Update
            </button>
          </div>
        </form>
        {message && (
          <div className="text-center mt-4 text-green-700 font-semibold">{message}</div>
        )}
      </div>
    </div>
  );
}
