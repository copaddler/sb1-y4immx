'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Phone } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { SelfieCapture } from './selfie-capture';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface GhanaCardVerificationProps {
  onComplete: (data: any) => void;
}

export function GhanaCardVerification({ onComplete }: GhanaCardVerificationProps) {
  const [step, setStep] = useState<'card' | 'phone'>('card');
  const [pinNumber, setPinNumber] = useState('');
  const [selfieImage, setSelfieImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([]);
  const [selectedPhone, setSelectedPhone] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [useNewPhone, setUseNewPhone] = useState(false);
  const { toast } = useToast();

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!/^GHA-\d{9}-\d$/.test(pinNumber)) {
      toast({
        variant: 'destructive',
        title: 'Invalid PIN Format',
        description: 'Please enter a valid PIN number in the format GHA-XXXXXXXXX-X',
      });
      return;
    }

    if (!selfieImage) {
      toast({
        variant: 'destructive',
        title: 'Selfie Required',
        description: 'Please take a selfie for verification.',
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful verification with phone numbers
      const mockData = {
        success: true,
        phoneNumbers: ['+233 20 123 4567', '+233 24 987 6543']
      };

      if (mockData.success) {
        toast({
          title: 'Verification Successful',
          description: 'Your Ghana Card has been verified successfully.',
        });
        setPhoneNumbers(mockData.phoneNumbers);
        setStep('phone');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'An error occurred during verification. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneVerification = async () => {
    const phoneToVerify = useNewPhone ? newPhone : selectedPhone;
    
    if (!phoneToVerify) {
      toast({
        variant: 'destructive',
        title: 'Phone Required',
        description: 'Please select or enter a phone number for verification.',
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate OTP sending
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'OTP Sent',
        description: `A verification code has been sent to ${phoneToVerify}`,
      });
      
      onComplete({
        ghanaCard: pinNumber,
        phone: phoneToVerify,
        verified: true
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to send OTP. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 'phone') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Phone Verification</h2>
          <p className="text-muted-foreground">
            Select a phone number to receive your verification code
          </p>
        </div>

        <Card>
          <CardContent className="pt-6 space-y-4">
            {phoneNumbers.length > 0 ? (
              <RadioGroup
                value={selectedPhone}
                onValueChange={setSelectedPhone}
                className="space-y-3"
              >
                {phoneNumbers.map((phone, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <RadioGroupItem value={phone} id={`phone-${index}`} />
                    <Label htmlFor={`phone-${index}`}>{phone}</Label>
                  </div>
                ))}
              </RadioGroup>
            ) : null}

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="useNewPhone"
                checked={useNewPhone}
                onChange={(e) => setUseNewPhone(e.target.checked)}
                className="rounded border-gray-300"
              />
              <Label htmlFor="useNewPhone">Use a different phone number</Label>
            </div>

            {useNewPhone && (
              <div className="space-y-2">
                <Label htmlFor="newPhone">New Phone Number</Label>
                <Input
                  id="newPhone"
                  type="tel"
                  placeholder="Enter phone number"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                />
              </div>
            )}
          </CardContent>
        </Card>

        <Button
          onClick={handlePhoneVerification}
          disabled={isLoading || (!selectedPhone && !newPhone)}
          className="w-full"
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Phone className="mr-2 h-4 w-4" />
          )}
          {isLoading ? 'Sending OTP...' : 'Send Verification Code'}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Ghana Card Verification</h2>
        <p className="text-muted-foreground">
          Please enter your Ghana Card PIN number and take a selfie for verification
        </p>
      </div>

      <form onSubmit={handleVerification} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="pin">Ghana Card PIN</Label>
          <Input
            id="pin"
            placeholder="GHA-XXXXXXXXX-X"
            value={pinNumber}
            onChange={(e) => setPinNumber(e.target.value)}
            pattern="GHA-\d{9}-\d"
            required
          />
          <p className="text-sm text-muted-foreground">
            Format: GHA-XXXXXXXXX-X (where X represents numbers)
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Selfie Verification</CardTitle>
            <CardDescription>
              Take a clear selfie for identity verification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SelfieCapture onCapture={setSelfieImage} />
          </CardContent>
        </Card>

        <Button type="submit" disabled={isLoading || !selfieImage} className="w-full">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? 'Verifying...' : 'Verify Ghana Card'}
        </Button>
      </form>
    </div>
  );
}