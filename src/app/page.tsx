'use client';

import { Suspense } from 'react';

import MainContent from '@components/client/MainContent';

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">Loading...</div>
      }
    >
      <MainContent />
    </Suspense>
  );
}
