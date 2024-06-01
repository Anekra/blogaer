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
} from './ui/form';
import { Input } from './ui/input';
import FormIndicator from './FormIndicator';
import { PASS_CHECK } from '@/lib/constants';
import register from '@/lib/actions/register';
import { RegisterFormSchema } from '@/lib/zodSchemas';

export default function RegisterForm() {
  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: ''
    },
    mode: 'onChange'
  });

  return (
    <div className="z-[1] flex flex-col gap-6">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit((values) => register(values))}
          className="flex flex-col gap-2"
          noValidate
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field, fieldState }) => (
              <FormItem className="flex flex-col gap-1">
                <div className="flex items-center">
                  <FormLabel className="grow">Username</FormLabel>
                  <FormIndicator
                    fieldError={fieldState.error}
                    value={field.value}
                    formType="register"
                  />
                </div>
                <FormControl>
                  <Input
                    placeholder="Enter new username"
                    type="text"
                    className={`${
                      fieldState.error
                        ? 'border border-red-500 focus:border-none focus-visible:ring-red-500'
                        : 'focus-visible:ring-ring'
                    }`}
                    {...field}
                  />
                </FormControl>
                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem className="flex flex-col gap-1">
                <div className="flex items-center">
                  <FormLabel className="grow">Email</FormLabel>
                  <FormIndicator
                    fieldError={fieldState.error}
                    value={field.value}
                    formType="register"
                  />
                </div>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    type="email"
                    className={`${
                      fieldState.error
                        ? 'border border-red-500 focus:border-none focus-visible:ring-red-500'
                        : 'focus-visible:ring-ring'
                    }`}
                    {...field}
                  />
                </FormControl>
                <FormMessage>{fieldState.error?.message}</FormMessage>
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
                    formType="register"
                  />
                </div>
                <FormControl>
                  <Input
                    placeholder="Enter new password"
                    type="password"
                    className={`${
                      fieldState.error
                        ? 'border focus:border-none'
                        : 'focus-visible:ring-ring'
                    } 
                    ${
                      fieldState.error?.message === PASS_CHECK.PASS_MINIMUM
                        ? 'border-red-500 focus-visible:ring-red-500'
                        : ''
                    }
                    ${
                      fieldState.error?.message === PASS_CHECK.PASS_WEAK
                        ? 'border-yellow-500 focus-visible:ring-yellow-500'
                        : ''
                    }`}
                    {...field}
                  />
                </FormControl>
                <FormMessage
                  className={`${
                    fieldState.error?.message === PASS_CHECK.PASS_WEAK
                      ? 'text-yellow-500'
                      : ''
                  }`}
                >
                  {fieldState.error?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <button
            type="submit"
            className="mt-6 w-full rounded-md bg-primary-foreground py-2 font-bold text-primary hover:shadow-[0_2px_4px_0_rgb(0,0,0,0.9)] active:translate-y-[4px] active:shadow-none dark:hover:shadow-[0_2px_4px_0_rgb(255,255,255,0.9)] dark:hover:active:shadow-none"
          >
            Create Account
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
          <Icon
            icon="uim:google"
            className="text-4xl text-primary-foreground hover:cursor-pointer hover:contrast-150"
          />
          <Icon
            icon="teenyicons:apple-solid"
            className="text-4xl text-primary-foreground hover:cursor-pointer hover:contrast-150"
          />
        </div>
        <div className="px-4">
          <p className="text-center">
            Already have an account?
            <span className="text-primary-foreground hover:cursor-pointer">
              {' '}
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
