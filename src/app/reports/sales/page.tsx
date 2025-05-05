'use client';

import { useEffect, useState } from 'react';

type Sale = {
  Sale_ID: number;
  S_Date: string;
  S_Time: string;
  C_ID: number;
  E_ID: number;
  Total_Amt: string;
};

export default function SalesReportPage() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const fetchSales = (fromDate?: string, toDate?: string) => {
    setLoading(true);
    let url = '/api/reports/sales';
    if (fromDate && toDate) {
      url += `?from=${fromDate}&to=${toDate}`;
    }
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setSales(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSales(from, to);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-gray-700">
      <div className="bg-white rounded shadow p-8 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">TRANSACTIONS REPORT</h2>
        <form onSubmit={handleSearch} className="flex gap-4 mb-6 justify-center">
          <div>
            <label className="font-semibold mr-2">From:</label>
            <input
              type="date"
              value={from}
              onChange={e => setFrom(e.target.value)}
              className="p-2 border rounded"
            />
          </div>
          <div>
            <label className="font-semibold mr-2">To:</label>
            <input
              type="date"
              value={to}
              onChange={e => setTo(e.target.value)}
              className="p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
          >
            Search
          </button>
        </form>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded shadow">
              <thead>
                <tr>
                  <th className="p-2 border">Transaction ID</th>
                  <th className="p-2 border">Date</th>
                  <th className="p-2 border">Time</th>
                  <th className="p-2 border">Customer ID</th>
                  <th className="p-2 border">Employee ID</th>
                  <th className="p-2 border">Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {sales.map(s => (
                  <tr key={s.Sale_ID}>
                    <td className="p-2 border">{s.Sale_ID}</td>
                    <td className="p-2 border">{s.S_Date?.slice(0, 10)}</td>
                    <td className="p-2 border">{s.S_Time?.slice(0, 8)}</td>
                    <td className="p-2 border">{s.C_ID}</td>
                    <td className="p-2 border">{s.E_ID}</td>
                    <td className="p-2 border">{s.Total_Amt}</td>
                  </tr>
                ))}
                {sales.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center p-4">No sales found for this period.</td>
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
