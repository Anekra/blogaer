'use client';
import * as z from 'zod';
import { Icon } from '@iconify/react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/lib/components/ui/form';
import { Input } from '@/lib/components/ui/input';
import FormIndicator from './FormIndicator';
import login from '@/lib/actions/login';
import { LoginFormSchema } from '@/lib/utils/zodSchemas';
import GoogleLoginBtn from '@/lib/components/buttons/GoogleLoginBtn';
import { useToast } from '@/lib/components/ui/use-toast';
import { useLoading } from '@/lib/contexts/LoadingContext';
import LoadingSpinner from '@/lib/components/icons/LoadingSpinner';
import { useRouter, useSearchParams } from 'next/navigation';
import { getBrowserFingerprint } from 'fingerprint-browser';
import { useSession } from '@/lib/contexts/SessionContext';
import jwt from 'jsonwebtoken';
import { Session } from '@/lib/types/common';

type FormValues = {
  emailOrUsername: string;
  password: string;
};

export default function LoginForm() {
  const { isLoading, setLoading } = useLoading();
  const { setSession } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const redirectUrl = useSearchParams().get('redirect_url');
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      emailOrUsername: '',
      password: ''
    }
  });
  const handleLogin = async (values: FormValues) => {
    setLoading(true);
    const clientId = getBrowserFingerprint();
    const response = await login({ ...values, clientId });
    if (response.data) {
      localStorage.setItem(`${process.env.NEXT_PUBLIC_SESSION}`, response.data);
      const session = jwt.decode(response.data) as Session;
      setSession(session);
      if (redirectUrl) router.replace(redirectUrl);
      else router.replace('/home');
      toast({
        title: 'Login successful.',
        duration: 3000,
        className: 'toast-success'
      });
    } else {
      if (response.status) {
        form.setError(
          response.status === 'Unauthorized' ? 'password' : 'emailOrUsername',
          {
            type: 'custom',
            message: response.message
          }
        );
      }
      toast({
        title: response.message,
        duration: 3000,
        className: 'toast-error'
      });
    }
    setLoading(false);
  };

  return (
    <div className="z-[1] flex flex-col gap-6">
      <FormProvider {...form}>
        <form
          method="POST"
          onSubmit={form.handleSubmit(async (values) => handleLogin(values))}
          className="flex flex-col gap-2"
          noValidate
        >
          <FormField
            control={form.control}
            name="emailOrUsername"
            render={({ field, fieldState }) => (
              <FormItem className="flex flex-col gap-1">
                <div className="flex items-center">
                  <FormLabel className="grow">Email or username</FormLabel>
                  <FormIndicator
                    fieldError={fieldState.error}
                    value={field.value}
                    formType="login"
                  />
                </div>
                <FormControl>
                  <Input
                    placeholder="Enter your email or username"
                    type="email"
                    className={`${
                      fieldState.error
                        ? 'border border-red-500 focus:border-none focus-visible:ring-red-500'
                        : 'focus-visible:ring-ring'
                    }`}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="w-fit rounded bg-background/60 p-1">
                  {fieldState.error?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem className="flex flex-col gap-1">
                <div className="flex items-center">
                  <FormLabel className="grow">Password</FormLabel>
                  <FormIndicator
                    fieldError={fieldState.error}
                    value={field.value}
                    formType="login"
                  />
                </div>
                <FormControl>
                  <Input
                    placeholder="Enter new password"
                    type="password"
                    className={`${
                      fieldState.error
                        ? 'border border-red-500 focus:border-none focus-visible:ring-red-500'
                        : 'focus-visible:ring-ring'
                    }`}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="w-fit rounded bg-background/60 p-1">
                  {fieldState.error?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <button
            type="submit"
            className="btn-solid-p mt-6 flex justify-center"
          >
            Login
            {isLoading && <LoadingSpinner />}
          </button>
        </form>
      </FormProvider>
      <div className="flex flex-col gap-4">
        <div className="mt-2 flex items-center">
          <hr className="h-1 w-full border-none bg-gradient-to-l from-foreground" />
          <p className="w-fit shrink-0 px-2 text-center text-sm">
            Or login with
          </p>
          <hr className="h-1 w-full border-none bg-gradient-to-r from-foreground" />
        </div>
        <div className="flex justify-center gap-6 p-4">
          <GoogleLoginBtn />
          <Icon
            icon="teenyicons:apple-solid"
            className="text-4xl text-primary-foreground hover:cursor-pointer hover:contrast-150"
          />
        </div>
        <div className="px-4">
          <p className="text-center">
            Need an account?
            <span className="text-primary-foreground hover:cursor-pointer">
              {' '}
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
