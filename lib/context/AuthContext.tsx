'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';

// Import supabase conditionally to allow development without credentials
let supabase: any;

// Check if we're in development mode and use mock implementation if needed
const isDevelopment = process.env.NODE_ENV === 'development';

if (isDevelopment) {
  console.log('Using mock Supabase implementation for development');
} else {
  // Only import the real client in production
  const { supabase: realSupabase } = require('../supabase/client');
  supabase = realSupabase;
}

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get session from Supabase or use mock in development
    const getSession = async () => {
      if (isDevelopment) {
        // Mock session for development
        const mockSession = localStorage.getItem('mockSession');
        if (mockSession) {
          const parsedSession = JSON.parse(mockSession);
          setSession(parsedSession.session);
          setUser(parsedSession.user);
        }
        setIsLoading(false);
        return;
      }
      
      // Real implementation for production
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session:', error);
        }
        setSession(session);
        setUser(session?.user ?? null);
      } catch (error) {
        console.error('Failed to get session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getSession();

    // Listen for auth changes
    let subscription: { unsubscribe: () => void } = { unsubscribe: () => {} };
    
    if (!isDevelopment && supabase) {
      const { data } = supabase.auth.onAuthStateChange(
        (_event: any, session: Session | null) => {
          setSession(session);
          setUser(session?.user ?? null);
          setIsLoading(false);
        }
      );
      subscription = data.subscription;
    }

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string) => {
    setIsLoading(true);
    
    if (isDevelopment) {
      // Mock signup for development
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      
      // Create mock user
      const mockUser = {
        id: 'mock-user-id',
        email,
        user_metadata: { username: email.split('@')[0] },
        app_metadata: {},
        aud: 'authenticated',
        created_at: new Date().toISOString(),
      };
      
      // Create mock session
      const mockSession = {
        access_token: 'mock-access-token',
        refresh_token: 'mock-refresh-token',
        expires_at: Date.now() + 3600,
        user: mockUser,
      };
      
      // Store in localStorage for persistence
      localStorage.setItem('mockSession', JSON.stringify({ user: mockUser, session: mockSession }));
      
      setIsLoading(false);
      return;
    }
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    
    if (isDevelopment) {
      // Mock signin for development
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      
      // Create mock user
      const mockUser = {
        id: 'mock-user-id',
        email,
        user_metadata: { username: email.split('@')[0] },
        app_metadata: {},
        aud: 'authenticated',
        created_at: new Date().toISOString(),
      };
      
      // Create mock session
      const mockSession = {
        access_token: 'mock-access-token',
        refresh_token: 'mock-refresh-token',
        expires_at: Date.now() + 3600,
        user: mockUser,
      };
      
      // Store in localStorage for persistence
      localStorage.setItem('mockSession', JSON.stringify({ user: mockUser, session: mockSession }));
      
      // Update state
      setUser(mockUser as unknown as User);
      setSession(mockSession as unknown as Session);
      setIsLoading(false);
      return;
    }
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Signin error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    
    if (isDevelopment) {
      // Mock signout for development
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      
      // Clear mock session
      localStorage.removeItem('mockSession');
      
      // Update state
      setUser(null);
      setSession(null);
      setIsLoading(false);
      return;
    }
    
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Signout error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}