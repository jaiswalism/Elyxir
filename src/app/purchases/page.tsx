'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Purchase = {
  P_ID: number;
  Sup_ID: number;
  Med_ID: number;
  P_Qty: number;
  P_Cost: string;
  Pur_Date: string;
  Mfg_Date: string;
  Exp_Date: string;
};

export default function PurchasesPage() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/purchases')
      .then(res => res.json())
      .then(data => {
        setPurchases(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: number, medId: number) => {
    if (!confirm('Are you sure you want to delete this purchase?')) return;
    await fetch(`/api/purchases/${id}?medId=${medId}`, { method: 'DELETE' });
    setPurchases(purchases.filter(p => !(p.P_ID === id && p.Med_ID === medId)));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-900">PURCHASES</h2>
        <Link
          href="/purchases/add"
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          Add New Purchase
        </Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto text-gray-700">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr>
                <th className="p-2 border">Purchase ID</th>
                <th className="p-2 border">Supplier ID</th>
                <th className="p-2 border">Medicine ID</th>
                <th className="p-2 border">Quantity</th>
                <th className="p-2 border">Cost</th>
                <th className="p-2 border">Purchase Date</th>
                <th className="p-2 border">Mfg Date</th>
                <th className="p-2 border">Expiry Date</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((p) => (
                <tr key={`${p.P_ID}-${p.Med_ID}`}>
                  <td className="p-2 border">{p.P_ID}</td>
                  <td className="p-2 border">{p.Sup_ID}</td>
                  <td className="p-2 border">{p.Med_ID}</td>
                  <td className="p-2 border">{p.P_Qty}</td>
                  <td className="p-2 border">{p.P_Cost}</td>
                  <td className="p-2 border">{p.Pur_Date?.slice(0, 10)}</td>
                  <td className="p-2 border">{p.Mfg_Date?.slice(0, 10)}</td>
                  <td className="p-2 border">{p.Exp_Date?.slice(0, 10)}</td>
                  <td className="p-2 border text-center">
                    <Link
                      href={`/purchases/${p.P_ID}/edit?medId=${p.Med_ID}`}
                      className="text-blue-700 hover:underline mr-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(p.P_ID, p.Med_ID)}
                      className="text-red-700 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {purchases.length === 0 && (
                <tr>
                  <td colSpan={9} className="text-center p-4">
                    No purchases found.
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
