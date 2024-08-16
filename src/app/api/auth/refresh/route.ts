import { RefreshTokenJson, Session } from '@/lib/types/common';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  const refreshCookieName = `${process.env.REFRESH_TOKEN}`;
  const accessCookieName = `${process.env.ACCESS_TOKEN}`;
  const refreshToken = request.cookies.get(refreshCookieName)?.value;
  const sessionToken = await request.text();
  const decodedSession = jwt.decode(sessionToken) as Session;
  const stripedSession = { ...decodedSession };
  delete stripedSession.exp;
  const encryptedData = jwt.sign(
    stripedSession,
    `${process.env.SESSION}`,
    { expiresIn: '10m' }
  );
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
      return NextResponse.json(
        { error: refreshJson.message },
        { status: refreshResponse.status }
      );
    }
    console.log('json >>>', refreshJson);
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
    return NextResponse.error();
  }
}
