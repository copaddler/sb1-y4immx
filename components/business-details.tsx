'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2 } from 'lucide-react';

interface BusinessDetailsProps {
  onComplete: (details: any) => void;
}

interface BoardMember {
  name: string;
  position: string;
  idNumber: string;
}

interface BusinessFormData {
  businessName: string;
  registrationNumber: string;
  businessAddress: string;
  businessType: string;
  boardMembers: BoardMember[];
}

export function BusinessDetails({ onComplete }: BusinessDetailsProps) {
  const [boardMembers, setBoardMembers] = useState<BoardMember[]>([
    { name: '', position: '', idNumber: '' }
  ]);

  const addBoardMember = () => {
    setBoardMembers([...boardMembers, { name: '', position: '', idNumber: '' }]);
  };

  const removeBoardMember = (index: number) => {
    setBoardMembers(boardMembers.filter((_, i) => i !== index));
  };

  const updateBoardMember = (index: number, field: keyof BoardMember, value: string) => {
    const newBoardMembers = [...boardMembers];
    newBoardMembers[index][field] = value;
    setBoardMembers(newBoardMembers);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const businessDetails: BusinessFormData = {
      businessName: formData.get('businessName') as string,
      registrationNumber: formData.get('registrationNumber') as string,
      businessAddress: formData.get('businessAddress') as string,
      businessType: formData.get('businessType') as string,
      boardMembers
    };
    onComplete(businessDetails);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Business Details</h2>
        <p className="text-muted-foreground">
          Please provide information about your business and board members
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="businessName">Business Name</Label>
            <Input id="businessName" name="businessName" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="registrationNumber">Registration Number</Label>
            <Input id="registrationNumber" name="registrationNumber" required />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="businessAddress">Business Address</Label>
          <Textarea id="businessAddress" name="businessAddress" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="businessType">Type of Business</Label>
          <Input id="businessType" name="businessType" required />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Board Members & Signatories</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addBoardMember}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Member
          </Button>
        </div>

        {boardMembers.map((member, index) => (
          <div key={index} className="p-4 border rounded-lg space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Board Member {index + 1}</h4>
              {boardMembers.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeBoardMember(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input
                  value={member.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateBoardMember(index, 'name', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Position</Label>
                <Input
                  value={member.position}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateBoardMember(index, 'position', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Ghana Card Number</Label>
                <Input
                  value={member.idNumber}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateBoardMember(index, 'idNumber', e.target.value)}
                  placeholder="GHA-XXXXXXXXX-X"
                  pattern="GHA-\d{9}-\d"
                  required
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button type="submit" className="w-full">
        Save and Continue
      </Button>
    </form>
  );
}
