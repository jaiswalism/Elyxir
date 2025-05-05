"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditMedPage() {
  const router = useRouter();
  const params = useParams();
  const medId = params?.id as string;

  const [form, setForm] = useState({
    Med_ID: "",
    Med_Name: "",
    Med_Qty: "",
    Category: "",
    Med_Price: "",
    Location_Rack: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`/api/meds/${medId}`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          Med_ID: data.Med_ID,
          Med_Name: data.Med_Name,
          Med_Qty: data.Med_Qty,
          Category: data.Category,
          Med_Price: data.Med_Price,
          Location_Rack: data.Location_Rack,
        });
      });
  }, [medId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    const res = await fetch(`/api/meds/${medId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Med_Name: form.Med_Name,
        Med_Qty: Number(form.Med_Qty),
        Category: form.Category,
        Med_Price: form.Med_Price,
        Location_Rack: form.Location_Rack,
      }),
    });
    if (res.ok) {
      setMessage("Medicine updated successfully!");
      setTimeout(() => router.push("/meds"), 1000);
    } else {
      setMessage("Error! Unable to update.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center text-gray-700">
      <div className="bg-white rounded shadow p-8 max-w-2xl w-full">
        <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">
          UPDATE MEDICINE DETAILS
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-semibold">Medicine ID:</label>
            <input
              type="number"
              name="Med_ID"
              value={form.Med_ID}
              readOnly
              className="w-full p-2 border rounded bg-gray-100"
            />
            <label className="block mt-4 mb-1 font-semibold">
              Medicine Name:
            </label>
            <input
              type="text"
              name="Med_Name"
              value={form.Med_Name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <label className="block mt-4 mb-1 font-semibold">Quantity:</label>
            <input
              type="number"
              name="Med_Qty"
              value={form.Med_Qty}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <label className="block mt-4 mb-1 font-semibold">Category:</label>
            <select
              name="Category"
              value={form.Category}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="">Select</option>
              <option>Antibiotics</option>
              <option>Blood Pressure</option>
              <option>Diabetes</option>
              <option>Cholesterol</option>
              <option>Respiratory</option>
              <option>Gastrointestinal</option>
              <option>Anxiety</option>
              <option>Pain Relief</option>
              <option>Allergy</option>
              <option>Thyroid</option>
              <option>Depression</option>
              <option>Anti-inflammatory</option>
              <option>Supplements</option>
              <option>Blood Thinner</option>
              <option>Neuropathic Pain</option>
              <option>Asthma</option>
              <option>Diuretic</option>
              <option>Antifungal</option>
              <option>Antiviral</option>
              <option>Antihistamine</option>
              <option>Hormonal</option>
              <option>Dermatological</option>
              <option>Eye Care</option>
              <option>Multivitamin</option>
              <option>Mineral Supplement</option>
              <option>Anticoagulant</option>
              <option>Muscle Relaxant</option>
              <option>NSAID</option>
              <option>Antacid</option>
              <option>Antiemetic</option>
              <option>Laxative</option>
              <option>Antidiarrheal</option>
              <option>Sleep Aid</option>
              <option>Birth Control</option>
              <option>Hypertension</option>
              <option>Nasal Spray</option>
              <option>Topical Cream</option>
              <option>Antiseptic</option>
              <option>Cough Suppressant</option>
              <option>Expectorant</option>
              <option>Ear Care</option>
              <option>Ophthalmic</option>
              <option>Analgesic</option>
              <option>Antidepressant</option>
              <option>Antipsychotic</option>
              <option>Mood Stabilizer</option>
              <option>Immunosuppressant</option>
              <option>Anticonvulsant</option>
              <option>Antidiabetic</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Price:</label>
            <input
              type="number"
              step="0.01"
              name="Med_Price"
              value={form.Med_Price}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <label className="block mt-4 mb-1 font-semibold">Location:</label>
            <input
              type="text"
              name="Location_Rack"
              value={form.Location_Rack}
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
              Update
            </button>
          </div>
        </form>
        {message && (
          <div className="text-center mt-4 text-green-700 font-semibold">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
