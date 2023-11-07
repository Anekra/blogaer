'use client';

import { FormError } from '@/types/FormError';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Icon } from '@iconify/react';

function ErrorText(error: FormError) {
  if (error) {
    return (
      <p
        className={`
        text-sm mt-[1px]
        ${error && error?.type === 'warning' ? 'text-yellow-500' : ''}
        ${error && error?.type === 'error' ? 'text-red-500' : ''}
        `}
      >
        {error.message}
      </p>
    );
  }
}

function IndicatorIcon(error: FormError, input: string, style: string) {
  const inputType = error?.form;
  if (!error && input !== '') {
    return (
      <Icon icon="mingcute:check-fill" key={inputType} className={style} />
    );
  } else if (error) {
    return <Icon icon="jam:alert" key={inputType} className={style} />;
  }
}

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [errors] = useState<FormError[]>([]);

  const router = useRouter();

  const usernameError = errors.find(
    (error) => error.form === 'username'
  ) as FormError;
  const emailError = errors.find(
    (error) => error.form === 'email'
  ) as FormError;
  const passwordError = errors.find(
    (error) => error.form === 'password'
  ) as FormError;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');

    if (errors.length === 0) {
      try {
        setStatus('success');

        const formData = {
          username,
          email,
          password
        };

        const res = await fetch(
          'http://localhost:3030/api/auth-service/v1/register',
          {
            method: 'POST',
            body: JSON.stringify(formData)
          }
        );

        if (res.status === 201) {
          router.push('/dashboard');
        }

        console.log(res);
      } catch (err) {
        setStatus('failed');
        console.error('RegisterError: ', err);
      }
    }
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    handleInputError(name, value);

    if (name === 'username') {
      setUsername(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else {
      return;
    }
  }

  function handleInputError(input: string, value: string) {
    if (errors) {
      const errorIndex = errors.findIndex((error) => error.form === input);
      if (errorIndex !== -1) errors.splice(errorIndex, 1);
    }

    if (value === '') {
      errors.push({
        form: input,
        message: `${input} cannot be empty`,
        type: 'error'
      });
    } else if (input === 'email') {
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

      if (!regex.test(value)) {
        errors.push({
          form: input,
          message: `Not a valid email address`,
          type: 'error'
        });
      }
    } else if (input === 'password') {
      if (value.length < 4) {
        errors.push({
          form: input,
          message: 'Password must be at least 4 characters',
          type: 'error'
        });
      } else if (value.length < 8) {
        errors.push({
          form: input,
          message: 'Your password is weak',
          type: 'warning'
        });
      }
    }
  }

  const baseInputStyles = `
    bg-[#120D0B] appearance-none rounded w-full py-2 px-3 placeholder:text-[#655C5A] font-medium leading-tight focus:border-none focus:outline-none focus:bg-[#D7BDB6] focus:text-[#120D0B] focus:placeholder:text-[#120D0B]
    `;
  const getInputStyles = (
    error: FormError,
    input: string,
    inputType: string
  ) => `
    ${baseInputStyles}
    ${!error ? 'border border-white' : ''}
    ${
      error
        ? 'border border-red-500 focus:outline focus:outline-2 focus:outline-red-500'
        : ''
    }
    ${
      inputType === 'password' && error?.type === 'warning' && error
        ? 'border-yellow-500 focus:outline-yellow-500'
        : ''
    }
  `;
  const getIconStyles = (error: FormError) => `
    ${!error ? 'text-green-500' : ''}
    ${error && error?.type === 'warning' ? 'text-yellow-500' : ''}
    ${error && error?.type === 'error' ? 'text-red-500' : ''}
  `;

  return (
    <div className="flex flex-col gap-3 bg-[#070505] w-[400px] p-6 rounded-xl shadow-[0px_0px_5px_white] hover:bg-[#130d0d] hover:shadow-[1px_1px_2px_white] hover:-translate-y-1.5 ">
      <div className="w-full">
        <h1 className="text-2xl text-center font-bold">WELCOME</h1>
      </div>
      <form action="" method="post" onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col gap-1 px-4 mb-2">
          <div className="flex items-center">
            <label htmlFor="username" className="flex-1">
              Username
            </label>
            {IndicatorIcon(
              usernameError,
              username,
              getIconStyles(usernameError)
            )}
          </div>
          <div className="flex flex-col">
            <input
              className={getInputStyles(usernameError, username, 'username')}
              type="text"
              name="username"
              placeholder="Enter username"
              onChange={handleInputChange}
              disabled={status === 'submitting'}
            />
            {ErrorText(usernameError)}
          </div>
        </div>
        <div className="flex flex-col gap-1 px-4 mb-2">
          <div className="flex items-center">
            <label htmlFor="email" className="flex-1">
              Email
            </label>
            {IndicatorIcon(emailError, email, getIconStyles(emailError))}
          </div>
          <div className="flex flex-col">
            <input
              className={getInputStyles(emailError, email, 'email')}
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleInputChange}
              disabled={status === 'submitting'}
            />
            {ErrorText(emailError)}
          </div>
        </div>
        <div className="flex flex-col gap-1 px-4 mb-2">
          <div className="flex items-center">
            <label htmlFor="password" className="flex-1">
              Password
            </label>
            {IndicatorIcon(
              passwordError,
              password,
              getIconStyles(passwordError)
            )}
          </div>
          <div className="flex flex-col">
            <input
              className={getInputStyles(passwordError, password, 'password')}
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={handleInputChange}
              disabled={status === 'submitting'}
            />
            {ErrorText(passwordError)}
          </div>
        </div>
        <div className="flex px-4 py-4">
          <button
            className="w-full h-[46px] bg-[#DA7455] text-[#3A0A00] font-bold rounded-md shadow-[0_6px_0_#9B4429] active:shadow-none active:translate-y-1.5"
            disabled={errors.length > 0 || status === 'submitted'}
          >
            Create Account
          </button>
        </div>
      </form>
      <div className="relative px-4 mt-2">
        <hr className="w-full h-1" />
        <div className="absolute inset-x-0 m-auto -top-[9px] flex justify-center">
          <p className="text-center text-sm bg-[#120D0B] px-1">
            Or sign up with
          </p>
        </div>
      </div>
      <div className="flex justify-center gap-6 px-4 py-4">
        <Icon
          icon="uim:google"
          className="text-[#8C381F] hover:cursor-pointer hover:text-[#D7BDB6]"
        />
        <Icon
          icon="teenyicons:apple-solid"
          className="text-[#8C381F] hover:cursor-pointer hover:text-[#D7BDB6]"
        />
      </div>
      <div className="px-4 pt-6">
        <p className="text-[#7F7572] text-center">
          Already have an account?
          <span className="text-[#FA8E6D] hover:cursor-pointer"> Login</span>
        </p>
      </div>
    </div>
  );
}
