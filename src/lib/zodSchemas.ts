import { z } from "zod";
import { constants } from "./constants";

export const RegisterFormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.'
  }),
  email: z.string().email({
    message: 'Not a valid email.'
  }),
  password: z
    .string()
    .min(4, {
      message: constants.PASS_MINIMUM
    })
});

export const LoginFormSchema = z.object({
  email: z.string().email({
    message: 'Not a valid email.'
  }),
  password: z.string()
});