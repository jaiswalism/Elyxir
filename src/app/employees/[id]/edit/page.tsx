'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function EditEmployeePage() {
  const router = useRouter();
  const params = useParams();
  const employeeId = params?.id as string;
  const { user } = useAuth();

  const [form, setForm] = useState({
    E_ID: '',
    E_Fname: '',
    E_Lname: '',
    Bdate: '',
    E_Gender: '',
    E_Type: '',
    E_Jdate: '',
    E_Sal: '',
    E_Phone: '',
    E_Mail: '',
    E_Add: '',
    Designation: '',
  });
  const [message, setMessage] = useState('');
  const [age, setAge] = useState<number | null>(null);

  useEffect(() => {
    fetch(`/api/employees/${employeeId}`)
      .then(res => res.json())
      .then(data => {
        setForm({
          E_ID: data.E_ID,
          E_Fname: data.E_Fname,
          E_Lname: data.E_Lname,
          Bdate: data.Bdate ? data.Bdate.slice(0, 10) : '',
          E_Gender: data.E_Gender || '',
          E_Type: data.E_Type || '',
          E_Jdate: data.E_Jdate ? data.E_Jdate.slice(0, 10) : '',
          E_Sal: data.E_Sal || '',
          E_Phone: data.E_Phone || '',
          E_Mail: data.E_Mail || '',
          E_Add: data.E_Add || '',
          Designation: data.Designation || '',
        });
        setAge(data.E_Age ?? null);
      });
  }, [employeeId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Dynamic, secure role-based logic for Designation editing
  let canEditDesignation = false;
  if (user) {
    const isOwnerOrAdmin = user.Designation === 'Owner' || user.Designation === 'Admin';
    const isManagerEditingOther =
      user.Designation === 'Manager' && Number(form.E_ID) !== user.E_ID;
    canEditDesignation = isOwnerOrAdmin || isManagerEditingOther;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    const res = await fetch(`/api/employees/${employeeId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        E_Fname: form.E_Fname,
        E_Lname: form.E_Lname,
        Bdate: form.Bdate,
        E_Gender: form.E_Gender,
        E_Type: form.E_Type,
        E_Jdate: form.E_Jdate,
        E_Sal: form.E_Sal,
        E_Phone: form.E_Phone,
        E_Mail: form.E_Mail,
        E_Add: form.E_Add,
        Designation: form.Designation,
      }),
    });
    if (res.ok) {
      setMessage('Employee updated successfully!');
      setTimeout(() => router.push('/employees'), 1000);
    } else {
      setMessage('Error! Unable to update.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center text-gray-700">
      <div className="bg-white rounded shadow p-8 max-w-2xl w-full">
        <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">UPDATE EMPLOYEE DETAILS</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-semibold">Employee ID:</label>
            <input
              type="number"
              name="E_ID"
              value={form.E_ID}
              readOnly
              className="w-full p-2 border rounded bg-gray-100"
            />
            <label className="block mt-4 mb-1 font-semibold">First Name:</label>
            <input
              type="text"
              name="E_Fname"
              value={form.E_Fname}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <label className="block mt-4 mb-1 font-semibold">Last Name:</label>
            <input
              type="text"
              name="E_Lname"
              value={form.E_Lname}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <label className="block mt-4 mb-1 font-semibold">Date of Birth:</label>
            <input
              type="date"
              name="Bdate"
              value={form.Bdate}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <label className="block mt-4 mb-1 font-semibold">Age:</label>
            <input
              type="number"
              name="E_Age"
              value={age !== null ? age : ''}
              readOnly
              className="w-full p-2 border rounded bg-gray-100"
            />
            <label className="block mt-4 mb-1 font-semibold">Gender:</label>
            <select
              name="E_Gender"
              value={form.E_Gender}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="">Select</option>
              <option value="F">Female</option>
              <option value="M">Male</option>
              <option value="O">Other</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Employee Type:</label>
            <select
              name="E_Type"
              value={form.E_Type}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="">Select</option>
              <option value="Part Time">Part Time</option>
              <option value="Full Time">Full Time</option>
            </select>
            <label className="block mt-4 mb-1 font-semibold">Date of Joining:</label>
            <input
              type="date"
              name="E_Jdate"
              value={form.E_Jdate}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <label className="block mt-4 mb-1 font-semibold">Salary:</label>
            <input
              type="number"
              step="0.01"
              name="E_Sal"
              value={form.E_Sal}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <label className="block mt-4 mb-1 font-semibold">Phone Number:</label>
            <input
              type="text"
              name="E_Phone"
              value={form.E_Phone}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <label className="block mt-4 mb-1 font-semibold">Email ID:</label>
            <input
              type="email"
              name="E_Mail"
              value={form.E_Mail}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <label className="block mt-4 mb-1 font-semibold">Address:</label>
            <input
              type="text"
              name="E_Add"
              value={form.E_Add}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <label className="block mt-4 mb-1 font-semibold">Designation:</label>
            <select
              name="Designation"
              value={form.Designation}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
              disabled={!canEditDesignation}
            >
              <option value="">Select</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Pharmacist">Pharmacist</option>
              <option value="Owner">Owner</option>
              <option value="Staff">Staff</option>
            </select>
            {!canEditDesignation && (
              <div className="text-xs text-red-500 mt-1">
                Only owner/admin/manager (not self) can edit Designation.
              </div>
            )}
          </div>
          <div className="col-span-2 flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800"
            >
              Update
            </button>
          </div>
        </form>
        {message && (
          <div className="text-center mt-4 text-green-700 font-semibold">{message}</div>
        )}
      </div>
    </div>
  );
}
