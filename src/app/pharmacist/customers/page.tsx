'use client';

import { useEffect, useState } from 'react';

type Customer = {
  C_ID: number;
  C_FNAME: string;
  C_LNAME: string;
  C_PHNO: string;
};

export default function PharmacistCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchCustomers = (query = '') => {
    setLoading(true);
    fetch(query ? `/api/pharmacist/customers?search=${encodeURIComponent(query)}` : '/api/pharmacist/customers')
      .then(res => res.json())
      .then(data => {
        setCustomers(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCustomers(search);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-gray-700">
      <div className="bg-white rounded shadow p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">CUSTOMER LIST</h2>
        <form onSubmit={handleSearch} className="flex gap-4 mb-6 justify-center">
          <input
            type="text"
            placeholder="Enter any value to Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-96 p-2 border rounded"
          />
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
                  <th className="p-2 border">Customer ID</th>
                  <th className="p-2 border">First Name</th>
                  <th className="p-2 border">Last Name</th>
                  <th className="p-2 border">Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c.C_ID}>
                    <td className="p-2 border">{c.C_ID}</td>
                    <td className="p-2 border">{c.C_FNAME}</td>
                    <td className="p-2 border">{c.C_LNAME}</td>
                    <td className="p-2 border">{c.C_PHNO}</td>
                  </tr>
                ))}
                {customers.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center p-4">
                      No customers found.
                    </td>
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
