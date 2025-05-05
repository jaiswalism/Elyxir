"use client";

import { useEffect, useState } from "react";
import React, { Fragment } from "react";

type Med = {
  Med_ID: number;
  Med_Name: string;
  Med_Qty: number;
  Category: string;
  Med_Price: string;
  Location_Rack: string;
};

export default function PharmacistInventoryPage() {
  const [meds, setMeds] = useState<Med[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchMeds = (query = "") => {
    setLoading(true);
    fetch(
      query
        ? `/api/pharmacist/inventory?search=${encodeURIComponent(query)}`
        : "/api/meds"
    )
      .then((res) => res.json())
      .then((data) => {
        setMeds(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMeds();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchMeds(search);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-gray-700">
      <div className="bg-white rounded shadow p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">
          MEDICINE INVENTORY
        </h2>
        <form
          onSubmit={handleSearch}
          className="flex gap-4 mb-6 justify-center"
        >
          <input
            type="text"
            placeholder="Enter any value to Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
                  <th className="p-2 border">Medicine ID</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Quantity</th>
                  <th className="p-2 border">Category</th>
                  <th className="p-2 border">Price</th>
                  <th className="p-2 border">Location</th>
                </tr>
              </thead>
              <tbody>
                {meds.map((m) => (
                  <tr key={m.Med_ID}>
                    <td className="p-2 border">{m.Med_ID}</td>
                    <td className="p-2 border">{m.Med_Name}</td>
                    <td className="p-2 border">{m.Med_Qty}</td>
                    <td className="p-2 border">{m.Category}</td>
                    <td className="p-2 border">{m.Med_Price}</td>
                    <td className="p-2 border">{m.Location_Rack}</td>
                  </tr>
                ))}
                {meds.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center p-4">
                      No medicines found.
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
