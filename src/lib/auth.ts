import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { cookies } from 'next/headers';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const data = credentials as { values: string; url: string };

        const response = await fetch(data.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Origin: 'http://localhost:3000',
            Cookie: cookies().get('jwt')?.value || ''
          },
          body: data.values
        });

        if (response.ok || response.status === 201) {
          const user = await response.json();

          const token = user.data.refresh;
          if (token) {
            cookies().set('jwt', token, {
              httpOnly: true,
              secure: true,
              sameSite: 'none',
              maxAge: 24 * 60 * 60
            });
          }

          return user;
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.access = user.data.token;
        token.username = user.data.username;
        token.email = user.data.email;
        token.role = user.data.role;
      }

      return token;
    },
    async session({ session, token }) {      
      session.user.username = token.username;
      session.user.mail = token.email;
      session.user.role = token.role;
      session.user.token = token.access;
      session.expires = new Date(
        new Date().getTime() + 15 * 60000
      ).toISOString();

      return session;
    }
  }
});
