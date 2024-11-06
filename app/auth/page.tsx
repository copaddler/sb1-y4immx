'use client';

import { Suspense } from 'react';
import { AuthForm } from './auth-form';

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">Loading...</div>
        </div>
      }>
        <AuthForm />
      </Suspense>
    </div>
  );
}
