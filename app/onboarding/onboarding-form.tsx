'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Steps } from '@/components/steps';
import { AccountTypes } from '@/components/account-types';
import { GhanaCardVerification } from '@/components/ghana-card-verification';
import { BusinessDetails } from '@/components/business-details';
import { ReviewApplication } from '@/components/review-application';

const steps = [
  { id: 'verification', title: 'Ghana Card Verification' },
  { id: 'account-type', title: 'Account Type Selection' },
  { id: 'details', title: 'Additional Details' },
  { id: 'review', title: 'Review & Submit' },
];

export function OnboardingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const accountType = searchParams.get('type') || 'individual';
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    ghanaCard: '',
    accountType: '',
    businessDetails: null,
  });

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleVerificationComplete = (data: any) => {
    setFormData((prev) => ({ ...prev, ghanaCard: data }));
    handleNext();
  };

  const handleAccountTypeSelect = (type: string) => {
    setFormData((prev) => ({ ...prev, accountType: type }));
    handleNext();
  };

  const handleBusinessDetailsComplete = (details: any) => {
    setFormData((prev) => ({ ...prev, businessDetails: details }));
    handleNext();
  };

  const handleSubmit = async () => {
    try {
      // Here you would typically make an API call to submit the application
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: 'Application Submitted Successfully',
        description: 'We will review your application and contact you shortly.',
      });

      // Redirect to success page
      router.push('/success');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to submit application. Please try again.',
      });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <GhanaCardVerification onComplete={handleVerificationComplete} />;
      case 1:
        return <AccountTypes type={accountType} onSelect={handleAccountTypeSelect} />;
      case 2:
        if (accountType === 'business') {
          return <BusinessDetails onComplete={handleBusinessDetailsComplete} />;
        }
        handleNext();
        return null;
      case 3:
        return <ReviewApplication formData={formData} onSubmit={handleSubmit} />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Steps steps={steps} currentStep={currentStep} />
      
      <Card className="mt-8 p-6">
        {renderStep()}
        
        {currentStep < steps.length - 1 && (
          <div className="mt-6 flex justify-between">
            {currentStep > 0 && (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
