'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Med = {
  Med_ID: number;
  Med_Name: string;
  Med_Qty: number;
  Category: string;
  Med_Price: string;
  Location_Rack: string;
};

export default function MedsPage() {
  const [meds, setMeds] = useState<Med[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/meds')
      .then(res => res.json())
      .then(data => {
        setMeds(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this medicine?')) return;
    await fetch(`/api/meds/${id}`, { method: 'DELETE' });
    setMeds(meds.filter(m => m.Med_ID !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-900">MEDICINE INVENTORY</h2>
        <Link
          href="/meds/add"
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          Add New Medicine
        </Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr>
                <th className="p-2 border">Medicine ID</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Quantity</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Location</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {meds.map((m) => (
                <tr key={m.Med_ID}>
                  <td className="p-2 border">{m.Med_ID}</td>
                  <td className="p-2 border">{m.Med_Name}</td>
                  <td className="p-2 border">{m.Med_Qty}</td>
                  <td className="p-2 border">{m.Category}</td>
                  <td className="p-2 border">{m.Med_Price}</td>
                  <td className="p-2 border">{m.Location_Rack}</td>
                  <td className="p-2 border text-center">
                    <Link
                      href={`/meds/${m.Med_ID}/edit`}
                      className="text-blue-700 hover:underline mr-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(m.Med_ID)}
                      className="text-red-700 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {meds.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center p-4">
                    No medicines found.
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
