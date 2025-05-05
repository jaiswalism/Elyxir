'use client';

import { useEffect, useState } from 'react';

type Med = {
  Med_ID: number;
  Med_Name: string;
  Med_Qty: number;
  Category: string;
  Med_Price: string;
  Location_Rack: string;
};

export default function StocksReportPage() {
  const [meds, setMeds] = useState<Med[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/reports/stocks')
      .then(res => res.json())
      .then(data => {
        setMeds(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-gray-700">
      <div className="bg-white rounded shadow p-8 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">MEDICINES - LOW STOCK (≤ 50)</h2>
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
                </tr>
              </thead>
              <tbody>
                {meds.map(m => (
                  <tr key={m.Med_ID}>
                    <td className="p-2 border">{m.Med_ID}</td>
                    <td className="p-2 border">{m.Med_Name}</td>
                    <td className="p-2 border text-red-700 font-bold">{m.Med_Qty}</td>
                    <td className="p-2 border">{m.Category}</td>
                    <td className="p-2 border">{m.Med_Price}</td>
                    <td className="p-2 border">{m.Location_Rack}</td>
                  </tr>
                ))}
                {meds.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center p-4">No low stock medicines found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
