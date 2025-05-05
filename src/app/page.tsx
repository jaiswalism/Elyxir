// src/app/page.tsx
'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/login'); // or '/admin' if you want admin dashboard as default
  }, [router]);
  return null;
}
