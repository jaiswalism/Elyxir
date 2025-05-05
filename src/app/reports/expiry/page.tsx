'use client';

import { useEffect, useState } from 'react';

type Expiry = {
  P_ID: number;
  Sup_ID: number;
  Med_ID: number;
  P_Qty: number;
  P_Cost: string;
  Pur_Date: string;
  Mfg_Date: string;
  Exp_Date: string;
};

export default function ExpiryReportPage() {
  const [rows, setRows] = useState<Expiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/reports/expiry')
      .then(res => res.json())
      .then(data => {
        setRows(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-gray-700">
      <div className="bg-white rounded shadow p-8 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">STOCK EXPIRING WITHIN 6 MONTHS</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="overflow-x-auto">
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
                </tr>
              </thead>
              <tbody>
                {rows.map(r => (
                  <tr key={`${r.P_ID}-${r.Med_ID}`}>
                    <td className="p-2 border">{r.P_ID}</td>
                    <td className="p-2 border">{r.Sup_ID}</td>
                    <td className="p-2 border">{r.Med_ID}</td>
                    <td className="p-2 border">{r.P_Qty}</td>
                    <td className="p-2 border">{r.P_Cost}</td>
                    <td className="p-2 border">{r.Pur_Date?.slice(0, 10)}</td>
                    <td className="p-2 border">{r.Mfg_Date?.slice(0, 10)}</td>
                    <td className="p-2 border text-red-700 font-bold">{r.Exp_Date?.slice(0, 10)}</td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={8} className="text-center p-4">No soon-to-expire stock found.</td>
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
