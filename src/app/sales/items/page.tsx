'use client';

import { useEffect, useState } from 'react';

type SoldMed = {
  MED_ID: number;
  MED_NAME: string;
  TOTAL_QTY_SOLD: number;
  MED_PRICE: string;
};

export default function SoldMedicinesPage() {
  const [medicines, setMedicines] = useState<SoldMed[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/meds/sold')
      .then(res => res.json())
      .then(data => {
        setMedicines(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-gray-700">
      <div className="bg-white rounded shadow p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">
          All Sold Medicines
        </h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded shadow">
              <thead>
                <tr>
                  <th className="p-2 border">Medicine ID</th>
                  <th className="p-2 border">Medicine Name</th>
                  <th className="p-2 border">Total Quantity Sold</th>
                  <th className="p-2 border">Current Price</th>
                </tr>
              </thead>
              <tbody>
                {medicines.map((med) => (
                  <tr key={med.MED_ID}>
                    <td className="p-2 border">{med.MED_ID}</td>
                    <td className="p-2 border">{med.MED_NAME}</td>
                    <td className="p-2 border">{med.TOTAL_QTY_SOLD}</td>
                    <td className="p-2 border">{med.MED_PRICE}</td>
                  </tr>
                ))}
                {medicines.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center p-4">
                      No medicines have been sold yet.
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
