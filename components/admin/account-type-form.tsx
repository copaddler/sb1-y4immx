'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export function AccountTypeForm() {
  const [features, setFeatures] = useState<string[]>(['']);
  const [requirements, setRequirements] = useState<Array<{ name: string; description: string; required: boolean }>>([
    { name: '', description: '', required: true }
  ]);
  const { toast } = useToast();

  const addFeature = () => {
    setFeatures([...features, '']);
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const addRequirement = () => {
    setRequirements([...requirements, { name: '', description: '', required: true }]);
  };

  const removeRequirement = (index: number) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const updateRequirement = (index: number, field: keyof typeof requirements[0], value: any) => {
    const newRequirements = [...requirements];
    newRequirements[index][field] = value;
    setRequirements(newRequirements);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Add API call here
      toast({
        title: 'Success',
        description: 'Account type has been created successfully.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to create account type. Please try again.',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Account Type Name</Label>
          <Input id="name" required />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <select
            id="type"
            className="w-full rounded-md border border-input bg-background px-3 py-2"
            required
          >
            <option value="individual">Individual</option>
            <option value="business">Business</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="monthlyFee">Monthly Fee (GHS)</Label>
        <Input id="monthlyFee" type="number" min="0" step="0.01" required />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Features</Label>
          <Button type="button" variant="outline" size="sm" onClick={addFeature}>
            <Plus className="h-4 w-4 mr-2" />
            Add Feature
          </Button>
        </div>

        {features.map((feature, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={feature}
              onChange={(e) => updateFeature(index, e.target.value)}
              placeholder="Enter feature description"
              required
            />
            {features.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeFeature(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Requirements</Label>
          <Button type="button" variant="outline" size="sm" onClick={addRequirement}>
            <Plus className="h-4 w-4 mr-2" />
            Add Requirement
          </Button>
        </div>

        {requirements.map((req, index) => (
          <div key={index} className="space-y-4 p-4 border rounded-lg">
            <div className="flex justify-between items-start">
              <div className="space-y-2 flex-1">
                <Input
                  value={req.name}
                  onChange={(e) => updateRequirement(index, 'name', e.target.value)}
                  placeholder="Requirement name"
                  required
                />
                <Textarea
                  value={req.description}
                  onChange={(e) => updateRequirement(index, 'description', e.target.value)}
                  placeholder="Requirement description"
                  required
                />
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`required-${index}`}
                    checked={req.required}
                    onChange={(e) => updateRequirement(index, 'required', e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor={`required-${index}`}>Required</Label>
                </div>
              </div>
              {requirements.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeRequirement(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      <Button type="submit" className="w-full">
        Create Account Type
      </Button>
    </form>
  );
}