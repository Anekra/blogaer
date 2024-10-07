import { RefreshTokenJson, Session } from '@/lib/types/common';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { redirect } from 'next/navigation';

export async function GET(request: NextRequest) {
  console.log('#############refresh token start');
  const accessCookieName = `${process.env.ACCESS_TOKEN}`;
  const refreshCookieName = `${process.env.REFRESH_TOKEN}`;
  const sessionToken = request.nextUrl.searchParams.get('session');
  if (!sessionToken) {
    return NextResponse.json(
      { error: 'Session expired.' },
      { status: 419 }
    );
  }

  const refreshToken = request.cookies.get(refreshCookieName)?.value;
  if (!refreshToken) {
    return NextResponse.json(
      { error: 'Session token expired.' },
      { status: 419 }
    );
  }

  const decodedSession = jwt.decode(sessionToken) as Session;
  const stripedSession = { ...decodedSession };
  stripedSession.exp = Date.now() / 1000 + 1 * 10 * 60;
  const encryptedData = jwt.sign(stripedSession, `${process.env.SESSION}`);
  const response = NextResponse.json(
    { session: encryptedData },
    { status: 200 }
  );
  try {
    const url = `${process.env.API_ROUTE}/auth/refresh`;
    const refreshResponse = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Origin: 'http://localhost:3000',
        Cookie: `${process.env.REFRESH_TOKEN}=${refreshToken}`
      }
    });
    const refreshJson: RefreshTokenJson = await refreshResponse.json();
    if (!refreshResponse.ok) {
      response.cookies.delete(accessCookieName);
      response.cookies.delete(refreshCookieName);

      return redirect('/login?redirect=Session expired.');
    }
    const isSecure = process.env.NODE_ENV === 'production';
    // access
    response.cookies.set(
      accessCookieName,
      refreshJson.data.access,
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
    // refresh
    response.cookies.set(
      refreshCookieName,
      refreshJson.data?.refresh,
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

    return response;
  } catch (error) {
    response.cookies.delete(accessCookieName);
    response.cookies.delete(refreshCookieName);

    return redirect('/login?redirect=Session expired.');
  }
}
