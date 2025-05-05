'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditSupplierPage() {
  const router = useRouter();
  const params = useParams();
  const supplierId = params?.id as string;

  const [form, setForm] = useState({
    Sup_ID: '',
    Sup_Name: '',
    Sup_Phone: '',
    Sup_Mail: '',
    Sup_Add: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`/api/suppliers/${supplierId}`)
      .then(res => res.json())
      .then(data => {
        setForm({
          Sup_ID: data.Sup_ID,
          Sup_Name: data.Sup_Name,
          Sup_Phone: data.Sup_Phone,
          Sup_Mail: data.Sup_Mail,
          Sup_Add: data.Sup_Add,
        });
      });
  }, [supplierId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    const res = await fetch(`/api/suppliers/${supplierId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        Sup_Name: form.Sup_Name,
        Sup_Phone: form.Sup_Phone,
        Sup_Mail: form.Sup_Mail,
        Sup_Add: form.Sup_Add,
      }),
    });
    if (res.ok) {
      setMessage('Supplier updated successfully!');
      setTimeout(() => router.push('/suppliers'), 1000);
    } else {
      setMessage('Error! Unable to update.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center text-gray-700">
      <div className="bg-white rounded shadow p-8 max-w-2xl w-full">
        <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">UPDATE SUPPLIER DETAILS</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-semibold">Supplier ID:</label>
            <input
              type="number"
              name="Sup_ID"
              value={form.Sup_ID}
              readOnly
              className="w-full p-2 border rounded bg-gray-100"
            />
            <label className="block mt-4 mb-1 font-semibold">Name:</label>
            <input
              type="text"
              name="Sup_Name"
              value={form.Sup_Name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Phone:</label>
            <input
              type="text"
              name="Sup_Phone"
              value={form.Sup_Phone}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <label className="block mt-4 mb-1 font-semibold">Email:</label>
            <input
              type="email"
              name="Sup_Mail"
              value={form.Sup_Mail}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <label className="block mt-4 mb-1 font-semibold">Address:</label>
            <input
              type="text"
              name="Sup_Add"
              value={form.Sup_Add}
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
