import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { RefreshTokenResponse, UserResponse } from './types';

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
            Origin: 'http://localhost:3000'
          },
          body: data.values
        });
        const userResponse: UserResponse = await response.json();

        if (!response.ok) throw new Error(`Login failed! \n ${userResponse}`);

        return userResponse;
      }
    }),
    Google
  ],
  session: {
    maxAge: 14 * 60 * 60,
    updateAge: 5 * 60 * 60
  },
  callbacks: {
    async jwt({ token, user, profile }) {

      const now = new Date();
      if (user && !profile) {
        // With credentials
        return {
          access: user.data.access,
          refresh: user.data.refresh,
          username: user.data.username,
          email: user.data.email,
          role: user.data.role,
          expires: new Date(now.getTime() + 20 * 60 * 1000).getTime()
        };
      } else if (user && profile) {
        // With oauth
        const data = {
          email: user.email,
          picture: user.image,
          role_id: 1,
          verified: true
        };
        const response = await fetch(`${process.env.API_ROUTE}/auth/google`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Origin: 'http://localhost:3000',
            Cookie: `jwt=${token.refresh}`
          },
          body: JSON.stringify(data)
        });
        const userResponse: UserResponse = await response.json();

        if (!response.ok) throw userResponse;

        return {
          access: userResponse.data.access,
          refresh: userResponse.data.refresh,
          username: userResponse.data.username,
          email: userResponse.data.email,
          role: userResponse.data.role,
          expires: new Date(now.getTime() + 20 * 60 * 1000).getTime()
        };
      } else if (now.getTime() < token.expires) {
        return token;
      }

      console.log('token.expires >>> ', now.getTime() > token.expires);

      const response = await fetch(`${process.env.API_ROUTE}/auth/refresh`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Origin: `${process.env.BASE_URL}`,
          Cookie: `jwt=${token.refresh}`
        }
      });
      const tokenResponse: RefreshTokenResponse = await response.json();

      if (!response.ok) throw tokenResponse;

      return {
        ...token,
        access: tokenResponse.data.access,
        refresh: tokenResponse.data.refresh,
        expires: new Date(now.getTime() + 20 * 60 * 1000).getTime()
      };
    },
    async session({ session, token }) {
      console.log('session callback: *********************');

      if (token.email) {
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.role = token.role;
        session.sessionToken = token.access;
        session.user.refresh = token.refresh;
        session.user.expires = token.expires;
      }

      return session;
    }
  }
});
