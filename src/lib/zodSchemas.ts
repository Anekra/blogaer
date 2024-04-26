import { z } from 'zod';
import { PASS_CHECK } from './constants';

export const RegisterFormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.'
  }),
  email: z.string().email({
    message: 'Not a valid email.'
  }),
  password: z.string().min(4, {
    message: PASS_CHECK.PASS_MINIMUM
  })
});

export const LoginFormSchema = z.object({
  email: z.string().email({
    message: 'Not a valid email.'
  }),
  password: z.string()
});
