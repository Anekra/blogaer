import { UserResponse, Token } from '@/lib/types';
import { AdapterSession } from '@auth/core/adapters';
import { DefaultJWT } from '@auth/core/jwt';

declare module '@auth/core/types' {
  interface Session extends AdapterSession {
    user: {
      username: string;
      email: string;
      role: string;
      image: string;
      refresh: string;
      expires: number;
    };
  }
  interface User extends UserResponse {}
}

declare module '@auth/core/jwt' {
  interface JWT extends Token {}
}
