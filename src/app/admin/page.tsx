'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  ShoppingCartIcon,
  ArchiveBoxIcon,
  UsersIcon,
  BanknotesIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/solid';

// Sidebar navigation structure
const adminNav = [
  {
    label: 'Dashboard',
    href: '/admin',
  },
  {
    label: 'Inventory',
    children: [
      { label: 'Add New Medicine', href: '/meds/add' },
      { label: 'Manage Inventory', href: '/meds' },
    ],
  },
  {
    label: 'Suppliers',
    children: [
      { label: 'Add New Supplier', href: '/suppliers/add' },
      { label: 'Manage Suppliers', href: '/suppliers' },
    ],
  },
  {
    label: 'Stock Purchase',
    children: [
      { label: 'Add New Purchase', href: '/purchases/add' },
      { label: 'Manage Purchases', href: '/purchases' },
    ],
  },
  {
    label: 'Employees',
    children: [
      { label: 'Add New Employee', href: '/employees/add' },
      { label: 'Manage Employees', href: '/employees' },
    ],
  },
  {
    label: 'Customers',
    children: [
      { label: 'Add New Customer', href: '/customers/add' },
      { label: 'Manage Customers', href: '/customers' },
    ],
  },
  { label: 'View Sales Invoice Details', href: '/sales' },
  { label: 'View Sold Products Details', href: '/sales/items' },
  { label: 'Add New Sale', href: '/sales/new' },
  {
    label: 'Reports',
    children: [
      { label: 'Medicines - Low Stock', href: '/reports/stocks' },
      { label: 'Medicines - Soon to Expire', href: '/reports/expiry' },
      { label: 'Transactions Reports', href: '/reports/sales' },
    ],
  },
  {
    label: 'Database',
    children: [
      { label: 'Backup', href: '/db/backup' }
    ],
  },
];

// Sidebar component
function Sidenav() {
  const [open, setOpen] = useState(Array(adminNav.length).fill(false));
  return (
    <nav className="fixed top-0 left-0 h-full w-64 bg-blue-900 text-gray-200 flex flex-col z-10">
      <div className="py-6 text-center text-2xl font-bold tracking-wide border-b border-blue-800">
        ELYXIR
      </div>
      <div className="flex-1 px-4 py-6 space-y-1">
        {adminNav.map((item, idx) =>
          item.children ? (
            <div key={item.label}>
              <button
                className="w-full text-left px-2 py-2 rounded hover:bg-blue-800 flex justify-between items-center"
                onClick={() =>
                  setOpen((o) =>
                    o.map((v, i) => (i === idx ? !v : v))
                  )
                }
              >
                <span>{item.label}</span>
                <span className="ml-2">{open[idx] ? '▲' : '▼'}</span>
              </button>
              {open[idx] && (
                <div className="ml-4 mt-1 space-y-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className="block px-2 py-1 rounded hover:bg-blue-700"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              key={item.label}
              href={item.href}
              className="block px-2 py-2 rounded hover:bg-blue-800"
            >
              {item.label}
            </Link>
          )
        )}
      </div>
    </nav>
  );
}

// Top navigation bar
function Topnav() {
  return (
    <div className="fixed top-0 left-64 right-0 h-16 bg-blue-900 flex items-center justify-end px-8 z-20">
      <Link
        href="/logout"
        className="text-gray-200 hover:text-white text-lg"
      >
        Logout (Logged in as Admin)
      </Link>
    </div>
  );
}

// Dashboard shortcut cards
const dashboardCards = [
  {
    href: '/sales/new',
    icon: <ShoppingCartIcon className="h-14 w-14 text-blue-600" />,
    label: 'Add New Sale',
  },
  {
    href: '/meds',
    icon: <ArchiveBoxIcon className="h-14 w-14 text-green-600" />,
    label: 'View Inventory',
  },
  {
    href: '/employees',
    icon: <UsersIcon className="h-14 w-14 text-purple-600" />,
    label: 'View Employees',
  },
  {
    href: '/reports/sales',
    icon: <BanknotesIcon className="h-14 w-14 text-yellow-600" />,
    label: 'View Transactions',
  },
  {
    href: '/reports/stocks',
    icon: <ExclamationTriangleIcon className="h-14 w-14 text-red-600" />,
    label: 'Low Stock Alert',
  },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-700">
      <Sidenav />
      <Topnav />
      <main className="ml-64 pt-16 px-8">
        <div className="flex flex-col items-center mt-8">
          <div className="bg-gray-200 text-blue-900 w-full max-w-3xl rounded p-6 mb-8 shadow">
            <h2 className="text-3xl font-bold text-center">ADMIN DASHBOARD</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-8 w-full max-w-4xl">
            {dashboardCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="flex flex-col items-center justify-center bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition group border border-gray-200 hover:border-blue-400"
                title={card.label}
              >
                <div className="mb-4 group-hover:scale-110 transition">{card.icon}</div>
                <span className="text-lg font-semibold text-center group-hover:text-blue-800">{card.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
