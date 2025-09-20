'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import Navbar from '../components/navigation/Navbar';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '@/lib/context/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    if (user) {
      setUsername(user.email?.split('@')[0] || '');
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: '', type: '' });

    try {
      // In Phase 2, we'll implement the actual profile update functionality
      // For now, just show a success message
      setTimeout(() => {
        setMessage({ text: 'Profile updated successfully!', type: 'success' });
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setMessage({ text: 'Failed to update profile', type: 'error' });
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 p-8">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  label="Email"
                  type="email"
                  value={user?.email || ''}
                  disabled
                />
              </div>
              
              <div>
                <Input
                  label="Username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                />
              </div>
              
              {message.text && (
                <div className={`p-3 rounded-md ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                  {message.text}
                </div>
              )}
              
              <Button type="submit" fullWidth disabled={isLoading}>
                {isLoading ? 'Updating...' : 'Update Profile'}
              </Button>
            </form>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}