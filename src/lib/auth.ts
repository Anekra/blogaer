import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

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

        const response = await fetch(data.url, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: data.values
        });

        if (!response.ok) return null;

        console.log(response.status);

        const user = await response.json();
        
        return user;
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
      session.user.email = token.email;
      session.user.role = token.role;
      session.expires = new Date(new Date().getTime() + 15 * 60000).toISOString();

      return session;
    }
  }
});
