'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext'; // <-- Add this import

type Customer = { C_ID: number; C_Fname: string; C_Lname: string };
type Med = {
  Med_ID: number;
  Med_Name: string;
  Med_Qty: number;
  Category: string;
  Med_Price: string;
  Location_Rack: string;
};

export default function NewSalePage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [medicines, setMedicines] = useState<Med[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedMed, setSelectedMed] = useState('');
  const [medDetails, setMedDetails] = useState<Med | null>(null);
  const [qty, setQty] = useState('');
  const [cart, setCart] = useState<{ med: Med; qty: number; total: number }[]>([]);
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { user } = useAuth(); // <-- Get user from context

  useEffect(() => {
    fetch('/api/customers')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setCustomers(data);
        else setCustomers([]);
      });
    fetch('/api/meds')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setMedicines(data);
        else setMedicines([]);
      });
  }, []);

  useEffect(() => {
    if (selectedMed) {
      fetch(`/api/meds/${selectedMed}`)
        .then(res => res.json())
        .then(setMedDetails);
    } else {
      setMedDetails(null);
    }
  }, [selectedMed]);

  const handleAddToCart = () => {
    if (!medDetails || !qty) return;
    const quantity = Number(qty);
    if (quantity <= 0 || quantity > medDetails.Med_Qty) {
      setMessage('Invalid quantity!');
      return;
    }
    setCart([...cart, { med: medDetails, qty: quantity, total: quantity * Number(medDetails.Med_Price) }]);
    setQty('');
    setSelectedMed('');
    setMedDetails(null);
    setMessage('');
  };

  const handleSubmitSale = async () => {
    if (!selectedCustomer || cart.length === 0) {
      setMessage('Select customer and add at least one medicine.');
      return;
    }
    if (!user?.E_ID) {
      setMessage('You must be logged in as an employee to make a sale.');
      return;
    }
    const res = await fetch('/api/sales', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerId: Number(selectedCustomer),
        items: cart.map(item => ({
          medId: Number(item.med.Med_ID),
          qty: Number(item.qty),
          price: Number(item.med.Med_Price),
        })),
        employeeId: user.E_ID, // <-- Pass the logged-in employee's ID
      }),
    });
    if (res.ok) {
      setMessage('Sale completed!');
      setTimeout(() => router.push('/sales'), 1000);
    } else {
      const data = await res.json();
      setMessage(data.error || 'Error completing sale.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-gray-700">
      <div className="bg-white rounded shadow p-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">POINT OF SALE</h2>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Select Customer:</label>
          <select
            value={selectedCustomer}
            onChange={e => setSelectedCustomer(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Customer</option>
            {customers.map(c => (
              <option key={c.C_ID} value={c.C_ID}>
                {c.C_ID} - {c.C_Fname} {c.C_Lname}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Select Medicine:</label>
          <select
            value={selectedMed}
            onChange={e => setSelectedMed(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Medicine</option>
            {medicines.map(m => (
              <option key={m.Med_ID} value={m.Med_ID}>
                {m.Med_Name}
              </option>
            ))}
          </select>
        </div>
        {medDetails && (
          <div className="mb-4 grid grid-cols-2 gap-4 bg-blue-50 p-4 rounded">
            <div>
              <div><b>ID:</b> {medDetails.Med_ID}</div>
              <div><b>Name:</b> {medDetails.Med_Name}</div>
              <div><b>Category:</b> {medDetails.Category}</div>
              <div><b>Location:</b> {medDetails.Location_Rack}</div>
            </div>
            <div>
              <div><b>Available:</b> {medDetails.Med_Qty}</div>
              <div><b>Price:</b> ₹{medDetails.Med_Price}</div>
              <div>
                <label className="block font-semibold mt-2">Quantity to Add:</label>
                <input
                  type="number"
                  min={1}
                  max={medDetails.Med_Qty}
                  value={qty}
                  onChange={e => setQty(e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <button
                  type="button"
                  className="mt-2 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="mb-4">
          <h3 className="font-bold mb-2">Cart</h3>
          {cart.length === 0 ? (
            <div className="text-gray-500">No medicines added.</div>
          ) : (
            <table className="min-w-full bg-white rounded shadow">
              <thead>
                <tr>
                  <th className="p-2 border">Medicine</th>
                  <th className="p-2 border">Qty</th>
                  <th className="p-2 border">Unit Price</th>
                  <th className="p-2 border">Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, idx) => (
                  <tr key={idx}>
                    <td className="p-2 border">{item.med.Med_Name}</td>
                    <td className="p-2 border">{item.qty}</td>
                    <td className="p-2 border">{item.med.Med_Price}</td>
                    <td className="p-2 border">{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="flex justify-center mt-6">
          <button
            type="button"
            className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800"
            onClick={handleSubmitSale}
          >
            Complete Sale
          </button>
        </div>
        {message && (
          <div className="text-center mt-4 text-blue-700 font-semibold">{message}</div>
        )}
      </div>
    </div>
  );
}
