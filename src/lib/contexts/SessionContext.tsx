'use client';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';
import { Session } from '@/lib/types/common';
import jwt from 'jsonwebtoken';
import useSWR from 'swr';
import { useSearchParams } from 'next/navigation';
import { useToast } from '../components/ui/use-toast';

const SessionContext = createContext({
  session: null as Session | null,
  setSession: (_: Session) => {}
});

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setUserSession] = useState<Session | null>(null);
  const setSession = (session: Session) => {
    setUserSession(session);
  };
  const redirectMessage = useSearchParams().get('redirect');
  const { toast } = useToast();
  const sessionName = `${process.env.NEXT_PUBLIC_SESSION}`;
  useSWR('api/auth/refresh', async (url) => {
    const sessionToken = localStorage.getItem(sessionName);
    if (!sessionToken) return;
    const decodedSession = jwt.decode(sessionToken) as Session;
    if (!decodedSession) return;
    console.log('refresh token rotation initiated >>>', decodedSession.exp);
    if (decodedSession.exp > Date.now() / 1000) {
      setSession(decodedSession);
      return decodedSession;
    }
    try {
      console.log('refresh token rotation initiated >>>', decodedSession.exp);
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: sessionToken
      });
      const responseJson = await response.json();
      if (!response.ok) {
        console.log('###SessionContext refresh token failed >>>', responseJson);
        localStorage.removeItem(sessionName);
        return;
      }
      localStorage.setItem(sessionName, responseJson.session);
    } catch (error) {
      console.error('###refresh token error >>>', error);
    }
  });

  useEffect(() => {
    const sessionToken = localStorage.getItem(sessionName);
    if (sessionToken) {
      const decodedSession = jwt.decode(sessionToken) as Session;
      if (decodedSession) setSession(decodedSession);
    }

    if (redirectMessage) {
      toast({
        title: redirectMessage,
        duration: 3000,
        className: 'toast-base'
      });
    }
  }, [sessionName, redirectMessage, toast]);

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => useContext(SessionContext);
