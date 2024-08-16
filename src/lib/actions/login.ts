'use server';
import { LoginFormSchema } from '@/lib/utils/zodSchemas';
import { z } from 'zod';
import { ErrorTypes } from '@/lib/utils/enums';
import { cookies } from 'next/headers';
import { AuthJson } from '@/lib/types/common';
import jwt from 'jsonwebtoken';

type Login = {
  status?: string;
  message?: string;
  data?: string;
};

export default async function login(
  values: z.infer<typeof LoginFormSchema> & { clientId: string }
): Promise<Login> {
  try {
    const url = `${process.env.API_ROUTE}/auth/login`;
    const refreshCookieName = `${process.env.REFRESH_TOKEN}`;
    const refreshToken = cookies().get(refreshCookieName);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: 'http://localhost:3000',
        Cookie: `${process.env.REFRESH_TOKEN}=${refreshToken}`
      },
      body: JSON.stringify(values)
    });

    const responseJson: AuthJson = await response.json();

    if (!response.ok || !responseJson.data) {
      console.log({
        status: responseJson.status,
        message: responseJson.message
      });
      
      return {
        status: responseJson.status,
        message: responseJson.message
      };
    }

    const isSecure = process.env.NODE_ENV === 'production';
    // access cookie
    const accessCookieName = `${process.env.ACCESS_TOKEN}`;
    cookies().set(
      accessCookieName,
      responseJson.data.access,
      isSecure
        ? {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            maxAge: 1 * 10 * 60
          }
        : {
            httpOnly: true,
            maxAge: 1 * 10 * 60
          }
    );
    // refresh cookie
    cookies().set(
      refreshCookieName,
      responseJson.data.refresh,
      isSecure
        ? {
            httpOnly: true,
            sameSite: 'lax',
            secure: true,
            maxAge: 24 * 60 * 60
          }
        : {
            httpOnly: true,
            maxAge: 24 * 60 * 60
          }
    );

    const sessionData = {
      username: responseJson.data.username,
      email: responseJson.data.email,
      role: responseJson.data.role,
      img: responseJson.data.img
    };
    const encryptedData = jwt.sign(sessionData, `${process.env.SESSION}`, {
      expiresIn: '10m'
    });

    return { data: encryptedData };
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : ErrorTypes.UNEXPECTED_ERROR
    };
  }
}
