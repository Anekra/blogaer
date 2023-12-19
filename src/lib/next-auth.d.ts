import { UserResponse, Token } from '@/lib/types';
import { DefaultJWT } from '@auth/core/jwt';

declare module '@auth/core/types' {
  interface Session {
    user: {
      username: string;
      email: string | null | undefined;
      role: string;
    };
  }
  interface User extends UserResponse {}
}

declare module '@auth/core/jwt' {
  interface JWT extends DefaultJWT, Token {}
}