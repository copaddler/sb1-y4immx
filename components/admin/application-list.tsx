'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export function ApplicationList() {
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const { toast } = useToast();

  const mockApplications = [
    {
      id: '1',
      applicationType: 'individual',
      accountType: 'Savings Account',
      status: 'pending',
      applicant: 'John Doe',
      submittedAt: '2024-03-20',
    },
    {
      id: '2',
      applicationType: 'business',
      accountType: 'Business Premium',
      status: 'approved',
      applicant: 'Tech Corp Ltd',
      submittedAt: '2024-03-19',
    },
  ];

  const handleStatusChange = async (applicationId: string, newStatus: string) => {
    try {
      // Add API call here
      toast({
        title: 'Status Updated',
        description: `Application status has been updated to ${newStatus}`,
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update application status',
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return <Badge className={variants[status]}>{status}</Badge>;
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Applicant</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Account</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Submitted</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockApplications.map((application) => (
            <TableRow key={application.id}>
              <TableCell>{application.applicant}</TableCell>
              <TableCell className="capitalize">{application.applicationType}</TableCell>
              <TableCell>{application.accountType}</TableCell>
              <TableCell>{getStatusBadge(application.status)}</TableCell>
              <TableCell>{new Date(application.submittedAt).toLocaleDateString()}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedApplication(application)}
                >
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={!!selectedApplication} onOpenChange={() => setSelectedApplication(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
            <DialogDescription>
              Review application information and documents
            </DialogDescription>
          </DialogHeader>

          {selectedApplication && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Applicant Information</h4>
                  <p>Name: {selectedApplication.applicant}</p>
                  <p>Type: {selectedApplication.applicationType}</p>
                  <p>Account: {selectedApplication.accountType}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Status</h4>
                  <div className="space-y-2">
                    {getStatusBadge(selectedApplication.status)}
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleStatusChange(selectedApplication.id, 'approved')}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleStatusChange(selectedApplication.id, 'rejected')}
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Documents</h4>
                <p className="text-muted-foreground">No documents uploaded yet.</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}