'use client';

import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { Moon, Sun, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <CreditCard className="h-6 w-6" />
          <span className="font-bold text-xl">GhanaBank</span>
        </Link>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Link href="/auth">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}