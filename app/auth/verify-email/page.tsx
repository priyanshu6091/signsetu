'use client';

import Link from 'next/link';
import Button from '../../components/ui/Button';

export default function VerifyEmail() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-background p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Check Your Email</h1>
        
        <p className="mb-6">
          We've sent you a verification link. Please check your email and click the link to verify your account.
        </p>
        
        <div className="space-y-4">
          <Link href="/auth/signin">
            <Button variant="primary" fullWidth>
              Return to Sign In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}