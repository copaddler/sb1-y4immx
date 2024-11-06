'use client';

import { Suspense } from 'react';
import { OnboardingForm } from './onboarding-form';

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">Loading...</div>
        </div>
      }>
        <OnboardingForm />
      </Suspense>
    </div>
  );
}
