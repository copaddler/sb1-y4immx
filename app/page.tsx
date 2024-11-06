import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, UserRound, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Welcome to GhanaBank Online Account Opening
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Start your banking journey with us today. Open an account in minutes with our secure and easy-to-use platform.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card className="group hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <Link href="/auth?type=individual" className="block">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-primary/10 rounded-full">
                  <UserRound className="h-12 w-12 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">Individual Account</h2>
                <p className="text-muted-foreground">
                  Perfect for personal banking needs with exclusive benefits and features
                </p>
                <Button variant="ghost" className="group-hover:translate-x-2 transition-transform">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Link>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <Link href="/auth?type=business" className="block">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Building2 className="h-12 w-12 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">Business Account</h2>
                <p className="text-muted-foreground">
                  Tailored solutions for businesses with comprehensive banking services
                </p>
                <Button variant="ghost" className="group-hover:translate-x-2 transition-transform">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-6">Why Choose GhanaBank?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="p-6">
            <h3 className="font-semibold mb-2">Quick & Easy</h3>
            <p className="text-muted-foreground">Open your account in minutes with our streamlined process</p>
          </div>
          <div className="p-6">
            <h3 className="font-semibold mb-2">Secure</h3>
            <p className="text-muted-foreground">Bank-grade security with Ghana Card verification</p>
          </div>
          <div className="p-6">
            <h3 className="font-semibold mb-2">24/7 Support</h3>
            <p className="text-muted-foreground">Get help anytime with our dedicated support team</p>
          </div>
        </div>
      </div>
    </div>
  );
}