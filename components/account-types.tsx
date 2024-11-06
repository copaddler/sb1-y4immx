'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Check } from 'lucide-react';

interface AccountTypesProps {
  type: string;
  onSelect: (accountType: string) => void;
}

const individualAccounts = [
  {
    id: 'savings',
    title: 'Savings Account',
    description: 'Earn competitive interest rates on your savings',
    features: ['No minimum balance', '3.5% annual interest rate', 'Free mobile banking'],
    monthlyFee: 0,
  },
  {
    id: 'current',
    title: 'Current Account',
    description: 'Perfect for daily transactions and business operations',
    features: ['Free checkbook', 'Unlimited transactions', 'Overdraft facility'],
    monthlyFee: 10,
  },
];

const businessAccounts = [
  {
    id: 'business-basic',
    title: 'Business Basic',
    description: 'Essential banking for small businesses',
    features: ['Basic online banking', 'Monthly statements', 'Business debit card'],
    monthlyFee: 20,
  },
  {
    id: 'business-premium',
    title: 'Business Premium',
    description: 'Comprehensive banking for growing businesses',
    features: ['Priority service', 'Free international transfers', 'Dedicated manager'],
    monthlyFee: 50,
  },
];

export function AccountTypes({ type, onSelect }: AccountTypesProps) {
  const [selectedAccount, setSelectedAccount] = useState('');
  const accounts = type === 'business' ? businessAccounts : individualAccounts;

  const handleSelect = () => {
    if (selectedAccount) {
      onSelect(selectedAccount);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Select Your Account Type</h2>
        <p className="text-muted-foreground">
          Choose the account that best suits your needs
        </p>
      </div>

      <RadioGroup
        value={selectedAccount}
        onValueChange={setSelectedAccount}
        className="grid gap-4 md:grid-cols-2"
      >
        {accounts.map((account) => (
          <Label
            key={account.id}
            className={`cursor-pointer ${
              selectedAccount === account.id ? 'ring-2 ring-primary' : ''
            }`}
          >
            <RadioGroupItem
              value={account.id}
              className="sr-only"
            />
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {account.title}
                  {selectedAccount === account.id && (
                    <Check className="h-5 w-5 text-primary" />
                  )}
                </CardTitle>
                <CardDescription>{account.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ul className="space-y-2">
                    {account.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <Check className="h-4 w-4 mr-2 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      Monthly fee:
                      <span className="text-foreground font-semibold ml-2">
                        {account.monthlyFee === 0
                          ? 'Free'
                          : `₵${account.monthlyFee}`}
                      </span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Label>
        ))}
      </RadioGroup>

      <Button
        onClick={handleSelect}
        disabled={!selectedAccount}
        className="w-full"
      >
        Continue with {selectedAccount ? accounts.find(a => a.id === selectedAccount)?.title : 'selected account'}
      </Button>
    </div>
  );
}