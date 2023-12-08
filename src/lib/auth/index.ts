import NextAuth, { Session, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { UserResponse } from '../types';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  update
} = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const data = credentials as { values: string; url: string };

        try {
          const response = await fetch(data.url, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: data.values
          });

          console.log(response.body);

          return await response.json();
        } catch (error) {
          return null;
        }
      }
    })
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${baseUrl}`;
      else if (new URL(url).origin) return url;
      return url;
    },
    async jwt({ token, user }) {
      if (user) {
        const currentUser = user as User & UserResponse;
        token.access = currentUser.data.token;
        token.username = currentUser.data.username;
        token.email = currentUser.data.email;
        token.role = currentUser.data.role;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const currentSession = session as Session & {
          username: string;
          email: string;
          role: string;
        };
        currentSession.username = token.username as string;
        currentSession.email = token.email as string;
        currentSession.role = token.role as string;
        
        return currentSession;
      } else {
        return session
      }
    }
  },
  pages: {
    newUser: '/register',
    signIn: '/login',
    error: '/error'
  }
});
