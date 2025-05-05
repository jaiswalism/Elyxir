'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Supplier = {
  Sup_ID: number;
  Sup_Name: string;
  Sup_Phone: string;
  Sup_Mail: string;
  Sup_Add: string;
};

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/suppliers')
      .then(res => res.json())
      .then(data => {
        setSuppliers(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this supplier?')) return;
    await fetch(`/api/suppliers/${id}`, { method: 'DELETE' });
    setSuppliers(suppliers.filter(s => s.Sup_ID !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-900">SUPPLIERS</h2>
        <Link
          href="/suppliers/add"
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          Add New Supplier
        </Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr>
                <th className="p-2 border">Supplier ID</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Phone</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Address</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((s) => (
                <tr key={s.Sup_ID}>
                  <td className="p-2 border">{s.Sup_ID}</td>
                  <td className="p-2 border">{s.Sup_Name}</td>
                  <td className="p-2 border">{s.Sup_Phone}</td>
                  <td className="p-2 border">{s.Sup_Mail}</td>
                  <td className="p-2 border">{s.Sup_Add}</td>
                  <td className="p-2 border text-center">
                    <Link
                      href={`/suppliers/${s.Sup_ID}/edit`}
                      className="text-blue-700 hover:underline mr-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(s.Sup_ID)}
                      className="text-red-700 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {suppliers.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center p-4">
                    No suppliers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
