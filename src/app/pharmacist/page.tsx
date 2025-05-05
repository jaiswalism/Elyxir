'use client';

import Link from 'next/link';
import { ShoppingCartIcon, ArchiveBoxIcon } from '@heroicons/react/24/solid';
import { useAuth } from '@/context/AuthContext'; // Adjust path as needed

export default function PharmacistDashboard() {
  const { user } = useAuth();
  const ename = user ? `${user.E_Fname} ${user.E_Lname}` : 'Pharmacist';

  return (
    <div className="min-h-screen bg-gray-100 text-gray-700">
      {/* Sidenav */}
      <nav className="fixed top-0 left-0 h-full w-64 bg-blue-900 text-gray-200 flex flex-col z-10">
        <div className="py-6 text-center text-2xl font-bold tracking-wide border-b border-blue-800">
          PHARMACIA
        </div>
        <div className="flex-1 px-4 py-6 space-y-1">
          <Link href="/pharmacist" className="block px-2 py-2 rounded hover:bg-blue-800">Dashboard</Link>
          <Link href="/pharmacist/inventory" className="block px-2 py-2 rounded hover:bg-blue-800">View Inventory</Link>
          <Link href="/pharmacist/sales/new" className="block px-2 py-2 rounded hover:bg-blue-800">Add New Sale</Link>
          <button className="w-full text-left px-2 py-2 rounded hover:bg-blue-800 flex justify-between items-center">
            Customers
            <span className="ml-2">▼</span>
          </button>
          <div className="ml-4 mt-1 space-y-1">
            <Link href="/pharmacist/customers/add" className="block px-2 py-1 rounded hover:bg-blue-700">Add New Customer</Link>
            <Link href="/pharmacist/customers" className="block px-2 py-1 rounded hover:bg-blue-700">View Customers</Link>
          </div>
        </div>
      </nav>
      {/* Topnav */}
      <div className="fixed top-0 left-64 right-0 h-16 bg-blue-900 flex items-center justify-end px-8 z-20">
        <Link href="/logout" className="text-gray-200 hover:text-white text-lg">
          Logout (signed in as {ename})
        </Link>
      </div>
      {/* Main */}
      <main className="ml-64 pt-16 px-8">
        <div className="flex flex-col items-center mt-8">
          <div className="bg-gray-200 text-blue-900 w-full max-w-3xl rounded p-6 mb-8 shadow">
            <h2 className="text-3xl font-bold text-center">PHARMACIST DASHBOARD</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-8 w-full max-w-2xl">
            <Link
              href="/pharmacist/sales/new"
              title="Add New Sale"
              className="flex flex-col items-center justify-center bg-white rounded-xl shadow-lg p-8 border border-gray-200 transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:bg-blue-50 group"
            >
              <ShoppingCartIcon className="h-16 w-16 text-blue-600 mb-4 group-hover:scale-110 transition" />
              <span className="text-lg font-semibold text-center group-hover:text-blue-800">Add New Sale</span>
            </Link>
            <Link
              href="/pharmacist/inventory"
              title="View Inventory"
              className="flex flex-col items-center justify-center bg-white rounded-xl shadow-lg p-8 border border-gray-200 transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:bg-green-50 group"
            >
              <ArchiveBoxIcon className="h-16 w-16 text-green-600 mb-4 group-hover:scale-110 transition" />
              <span className="text-lg font-semibold text-center group-hover:text-green-800">View Inventory</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
