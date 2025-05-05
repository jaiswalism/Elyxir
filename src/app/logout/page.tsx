'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Remove client-side tokens (if any)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }

    // Optionally, call an API route to clear httpOnly cookies (if you use them)
    fetch('/api/logout', { method: 'POST' })
      .finally(() => {
        // Redirect to login page after logout
        router.replace('/login');
      });
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-lg text-blue-900 font-semibold">
        Logging out...
      </div>
    </div>
  );
}
