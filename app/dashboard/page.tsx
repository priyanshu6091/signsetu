'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import Navbar from '../components/navigation/Navbar';
import Button from '../components/ui/Button';
import { useAuth } from '@/lib/context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (user) {
      setUsername(user.email?.split('@')[0] || 'Player');
    }
  }, [user]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Welcome, {username}!</h1>
              <p className="text-lg">Ready to test your knowledge?</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 border border-foreground/10 rounded-lg">
                <h2 className="text-xl font-bold mb-3">Create a Game</h2>
                <p className="mb-4">Start a new game and invite friends to join.</p>
                <Button size="lg" onClick={() => alert('Coming soon in Phase 2!')}>Create Game</Button>
              </div>
              
              <div className="p-6 border border-foreground/10 rounded-lg">
                <h2 className="text-xl font-bold mb-3">Join a Game</h2>
                <p className="mb-4">Enter a room code to join an existing game.</p>
                <Button size="lg" variant="secondary" onClick={() => alert('Coming soon in Phase 2!')}>Join Game</Button>
              </div>
            </div>
            
            <div className="p-6 border border-foreground/10 rounded-lg">
              <h2 className="text-xl font-bold mb-3">Your Stats</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-foreground/5 rounded-lg text-center">
                  <p className="text-sm">Games Played</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
                <div className="p-4 bg-foreground/5 rounded-lg text-center">
                  <p className="text-sm">Games Won</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
                <div className="p-4 bg-foreground/5 rounded-lg text-center">
                  <p className="text-sm">Correct Answers</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
                <div className="p-4 bg-foreground/5 rounded-lg text-center">
                  <p className="text-sm">Win Rate</p>
                  <p className="text-2xl font-bold">0%</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}