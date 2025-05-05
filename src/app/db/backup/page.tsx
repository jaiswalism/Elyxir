"use client";

import { useState, useEffect } from "react";

export default function DBBackupPage() {
  const [backups, setBackups] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const fetchBackups = () => {
    fetch("/api/db/backups")
      .then((res) => res.json())
      .then((data) => setBackups(data.files || []));
  };

  useEffect(() => {
    fetchBackups();
  }, []);

  const handleBackup = async () => {
    setMessage("Creating backup...");
    const res = await fetch("/api/db/backup", { method: "POST" });
    const data = await res.json();
    if (data.success) {
      setMessage("Backup created!");
      fetchBackups();
    } else {
      setMessage("Backup failed: " + data.error);
    }
  };

  const handleRestore = async (fileName: string) => {
    setMessage("Restoring...");
    const res = await fetch("/api/db/recover", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName }),
    });
    const data = await res.json();
    if (data.success) {
      setMessage("Restore successful!");
    } else {
      setMessage("Restore failed: " + data.error);
    }
  };

  const handleDelete = async (fileName: string) => {
    setMessage("Deleting...");
    const res = await fetch(`/api/db/backups/${encodeURIComponent(fileName)}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.success) {
      setMessage("Backup deleted!");
      fetchBackups();
    } else {
      setMessage("Delete failed: " + data.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-gray-700">
      <div className="bg-white rounded shadow p-8 max-w-xxl mx-auto">
        <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">
          Database Backup & Restore
        </h2>
        <button
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 mb-6"
          onClick={handleBackup}
        >
          Create Backup
        </button>
        <div className="mb-4">
          <h3 className="font-bold mb-2">Available Backups</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded shadow">
              <thead>
                <tr>
                  <th className="p-2 border text-left">Filename</th>
                  <th className="p-2 border text-left">Timestamp</th>
                  <th className="p-2 border text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {backups.map((f) => {
                  const match = f.match(/_(\d+)\.sql$/);
                  let timeStr = "";
                  if (match) {
                    const date = new Date(Number(match[1]));
                    timeStr = date.toLocaleString("en-IN", {
                      timeZone: "Asia/Kolkata",
                    });
                  }
                  return (
                    <tr key={f}>
                      <td className="p-2 border">{f}</td>
                      <td className="p-2 border">{timeStr}</td>
                      <td className="p-2 border text-center">
                        <button
                          className="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800 mr-2"
                          onClick={() => handleRestore(f)}
                        >
                          Restore
                        </button>
                        <button
                          className="bg-red-700 text-white px-3 py-1 rounded hover:bg-red-800"
                          onClick={() => handleDelete(f)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        {message && (
          <div className="text-center mt-4 text-blue-700 font-semibold">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
