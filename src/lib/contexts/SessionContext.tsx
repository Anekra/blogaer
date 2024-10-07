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
  const [session, setSession] = useState<Session | null>(null);
  const redirectMessage = useSearchParams().get('redirect');
  const { toast } = useToast();
  const sessionName = `${process.env.NEXT_PUBLIC_SESSION}`;
  const { data } = useSWR('/api/auth/refresh?', async (url) => {
    const sessionToken = localStorage.getItem(sessionName);
    if (!sessionToken) return;
    const decodedSession = jwt.decode(sessionToken) as Session;
    if (!decodedSession) return;
    if (decodedSession.exp > Date.now() / 1000) return decodedSession;

    try {
      const refreshUrl = url + new URLSearchParams({ session: sessionToken });
      const response = await fetch(refreshUrl);
      const resJson = await response.json();
      if (!response.ok) {
        localStorage.removeItem(sessionName);
        return null;
      } else {
        localStorage.setItem(sessionName, resJson.session);
        return decodedSession;
      }
    } catch (error) {}
  });

  useEffect(() => {
    if (redirectMessage) {
      localStorage.removeItem(sessionName);
      setSession(null);
      toast({
        title: redirectMessage,
        duration: 3000,
        className: 'toast-base'
      });
    }
    if (!data) return;
    setSession(data);
  }, [sessionName, redirectMessage, toast, data]);

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => useContext(SessionContext);
