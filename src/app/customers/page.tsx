'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Customer = {
  C_ID: number;
  C_Fname: string;
  C_Lname: string;
  C_Age: number;
  C_Gender: string;
  C_Phone: string;
  C_Mail: string;
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/customers')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCustomers(data);
        } else {
          setCustomers([]);
        }
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this customer?')) return;
    await fetch(`/api/customers/${id}`, { method: 'DELETE' });
    setCustomers(customers.filter(c => c.C_ID !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-900">CUSTOMER LIST</h2>
        <Link
          href="/customers/add"
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          Add New Customer
        </Link>
      </div>
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
                <th className="p-2 border">Age</th>
                <th className="p-2 border">Gender</th>
                <th className="p-2 border">Phone Number</th>
                <th className="p-2 border">Email Address</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.C_ID}>
                  <td className="p-2 border">{c.C_ID}</td>
                  <td className="p-2 border">{c.C_Fname}</td>
                  <td className="p-2 border">{c.C_Lname}</td>
                  <td className="p-2 border">{c.C_Age}</td>
                  <td className="p-2 border">{c.C_Gender}</td>
                  <td className="p-2 border">{c.C_Phone}</td>
                  <td className="p-2 border">{c.C_Mail}</td>
                  <td className="p-2 border text-center">
                    <Link
                      href={`/customers/${c.C_ID}/edit`}
                      className="text-blue-700 hover:underline mr-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(c.C_ID)}
                      className="text-red-700 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {customers.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center p-4">
                    No customers found.
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
