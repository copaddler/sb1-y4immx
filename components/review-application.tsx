'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, AlertCircle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ReviewApplicationProps {
  formData: any;
  onSubmit: () => void;
}

export function ReviewApplication({ formData, onSubmit }: ReviewApplicationProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Review Your Application</h2>
        <p className="text-muted-foreground">
          Please review your information before submitting your application
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Field</TableHead>
                  <TableHead>Information</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Ghana Card</TableCell>
                  <TableCell>
                    <span className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Verified
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Account Type</TableCell>
                  <TableCell>{formData.accountType || 'Not selected'}</TableCell>
                </TableRow>
                {formData.businessDetails && (
                  <>
                    <TableRow>
                      <TableCell className="font-medium">Business Name</TableCell>
                      <TableCell>{formData.businessDetails.businessName}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Registration Number</TableCell>
                      <TableCell>{formData.businessDetails.registrationNumber}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Business Type</TableCell>
                      <TableCell>{formData.businessDetails.businessType}</TableCell>
                    </TableRow>
                  </>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Important Notice</AlertTitle>
          <AlertDescription>
            By submitting this application, you confirm that:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>All provided information is accurate and complete</li>
              <li>You agree to our terms and conditions</li>
              <li>You consent to background verification checks</li>
            </ul>
          </AlertDescription>
        </Alert>

        <div className="flex justify-end space-x-4">
          <Button
            onClick={onSubmit}
            className="w-full md:w-auto"
          >
            Submit Application
          </Button>
        </div>
      </div>
    </div>
  );
}