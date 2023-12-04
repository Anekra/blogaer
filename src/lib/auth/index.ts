import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const {
  handlers: { GET, POST },
  auth,
  signIn
} = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials, request) {
        console.log('credentials: ',credentials);
        console.log('request', request);
        
        return null
      }
    })
  ]
});
