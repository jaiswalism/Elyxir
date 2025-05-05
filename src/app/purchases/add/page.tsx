'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Supplier = { Sup_ID: number; Sup_Name: string };
type Med = { Med_ID: number; Med_Name: string };

export default function AddPurchasePage() {
  const [form, setForm] = useState({
    P_ID: '',
    Sup_ID: '',
    Med_ID: '',
    P_Qty: '',
    P_Cost: '',
    Pur_Date: '',
    Mfg_Date: '',
    Exp_Date: '',
  });
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [meds, setMeds] = useState<Med[]>([]);
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetch('/api/suppliers')
      .then(res => res.json())
      .then(setSuppliers);
    fetch('/api/meds')
      .then(res => res.json())
      .then(setMeds);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    const res = await fetch('/api/purchases', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        P_ID: Number(form.P_ID),
        Sup_ID: Number(form.Sup_ID),
        Med_ID: Number(form.Med_ID),
        P_Qty: Number(form.P_Qty),
        P_Cost: form.P_Cost,
        Pur_Date: form.Pur_Date,
        Mfg_Date: form.Mfg_Date,
        Exp_Date: form.Exp_Date,
      }),
    });
    if (res.ok) {
      setMessage('Purchase successfully added!');
      setTimeout(() => router.push('/purchases'), 1000);
    } else {
      setMessage('Error! Check details.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center text-gray-700">
      <div className="bg-white rounded shadow p-8 max-w-2xl w-full">
        <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">ADD PURCHASE DETAILS</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-semibold">Purchase ID:</label>
            <input
              type="number"
              name="P_ID"
              value={form.P_ID}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <label className="block mt-4 mb-1 font-semibold">Supplier:</label>
            <select
              name="Sup_ID"
              value={form.Sup_ID}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="">Select Supplier</option>
              {suppliers.map(s => (
                <option key={s.Sup_ID} value={s.Sup_ID}>{s.Sup_Name} (ID: {s.Sup_ID})</option>
              ))}
            </select>
            <label className="block mt-4 mb-1 font-semibold">Medicine:</label>
            <select
              name="Med_ID"
              value={form.Med_ID}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="">Select Medicine</option>
              {meds.map(m => (
                <option key={m.Med_ID} value={m.Med_ID}>{m.Med_Name} (ID: {m.Med_ID})</option>
              ))}
            </select>
            <label className="block mt-4 mb-1 font-semibold">Quantity:</label>
            <input
              type="number"
              name="P_Qty"
              value={form.P_Qty}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Cost:</label>
            <input
              type="number"
              step="0.01"
              name="P_Cost"
              value={form.P_Cost}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <label className="block mt-4 mb-1 font-semibold">Purchase Date:</label>
            <input
              type="date"
              name="Pur_Date"
              value={form.Pur_Date}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <label className="block mt-4 mb-1 font-semibold">Mfg Date:</label>
            <input
              type="date"
              name="Mfg_Date"
              value={form.Mfg_Date}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <label className="block mt-4 mb-1 font-semibold">Expiry Date:</label>
            <input
              type="date"
              name="Exp_Date"
              value={form.Exp_Date}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="col-span-2 flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800"
            >
              Add Purchase
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
