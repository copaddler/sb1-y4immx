import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <Card className="p-6 text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle2 className="h-16 w-16 text-green-500" />
        </div>
        
        <h1 className="text-2xl font-bold mb-2">Application Submitted!</h1>
        
        <p className="text-muted-foreground mb-6">
          Thank you for choosing GhanaBank. We have received your application and will
          review it shortly. You will receive updates about your application status
          via email.
        </p>

        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h2 className="font-semibold mb-2">What's Next?</h2>
            <ol className="text-sm text-left space-y-2">
              <li>1. Application review (1-2 business days)</li>
              <li>2. Document verification</li>
              <li>3. Account activation</li>
              <li>4. Welcome package delivery</li>
            </ol>
          </div>

          <Link href="/">
            <Button className="w-full">Return to Home</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}