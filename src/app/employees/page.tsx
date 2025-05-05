'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Employee = {
  E_ID: number;
  E_Fname: string;
  E_Lname: string;
  Bdate: string;
  E_Age: number;
  E_Gender: string;
  E_Type: string;
  E_Jdate: string;
  E_Sal: string;
  E_Phone: string;
  E_Mail: string;
  E_Add: string;
  Designation: string;
};

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/employees')
      .then(res => res.json())
      .then(data => {
        setEmployees(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this employee?')) return;
    await fetch(`/api/employees/${id}`, { method: 'DELETE' });
    setEmployees(employees.filter(e => e.E_ID !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-900">EMPLOYEE LIST</h2>
        <Link
          href="/employees/add"
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          Add New Employee
        </Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr>
                <th className="p-2 border">Employee ID</th>
                <th className="p-2 border">First Name</th>
                <th className="p-2 border">Last Name</th>
                <th className="p-2 border">DOB</th>
                <th className="p-2 border">Age</th>
                <th className="p-2 border">Gender</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Joining Date</th>
                <th className="p-2 border">Salary</th>
                <th className="p-2 border">Phone</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Address</th>
                <th className="p-2 border">Designation</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((e) => (
                <tr key={e.E_ID}>
                  <td className="p-2 border">{e.E_ID}</td>
                  <td className="p-2 border">{e.E_Fname}</td>
                  <td className="p-2 border">{e.E_Lname}</td>
                  <td className="p-2 border">{e.Bdate?.slice(0, 10)}</td>
                  <td className="p-2 border">{e.E_Age}</td>
                  <td className="p-2 border">{e.E_Gender}</td>
                  <td className="p-2 border">{e.E_Type}</td>
                  <td className="p-2 border">{e.E_Jdate?.slice(0, 10)}</td>
                  <td className="p-2 border">{e.E_Sal}</td>
                  <td className="p-2 border">{e.E_Phone}</td>
                  <td className="p-2 border">{e.E_Mail}</td>
                  <td className="p-2 border">{e.E_Add}</td>
                  <td className="p-2 border">{e.Designation}</td>
                  <td className="p-2 border text-center">
                    <Link
                      href={`/employees/${e.E_ID}/edit`}
                      className="text-blue-700 hover:underline mr-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(e.E_ID)}
                      className="text-red-700 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {employees.length === 0 && (
                <tr>
                  <td colSpan={14} className="text-center p-4">
                    No employees found.
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
