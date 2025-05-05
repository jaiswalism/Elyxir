'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Sale = {
  SALE_ID: number;
  S_DATE: string;
  S_TIME: string;
  TOTAL_AMT: string;
  C_ID: number;
  E_ID: number;
};

export default function SalesPage() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/sales')
      .then(res => res.json())
      .then(data => {
        setSales(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-900">SALES INVOICE DETAILS</h2>
        <Link
          href="/sales/new"
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          Add New Sale
        </Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr>
                <th className="p-2 border">Sale ID</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Time</th>
                <th className="p-2 border">Customer ID</th>
                <th className="p-2 border">Employee ID</th>
                <th className="p-2 border">Total Amount</th>
                <th className="p-2 border">Items</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((s) => (
                <tr key={s.SALE_ID}>
                  <td className="p-2 border">{s.SALE_ID}</td>
                  <td className="p-2 border">{s.S_DATE?.slice(0, 10)}</td>
                  <td className="p-2 border">{s.S_TIME?.slice(0, 8)}</td>
                  <td className="p-2 border">{s.C_ID}</td>
                  <td className="p-2 border">{s.E_ID}</td>
                  <td className="p-2 border">{s.TOTAL_AMT}</td>
                  <td className="p-2 border text-center">
                    <Link
                      href={`/sales/items?saleId=${s.SALE_ID}`}
                      className="text-blue-700 hover:underline"
                    >
                      View Items
                    </Link>
                  </td>
                </tr>
              ))}
              {sales.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center p-4">
                    No sales found.
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
