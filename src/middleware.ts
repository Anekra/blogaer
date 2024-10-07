import { NextRequest, NextResponse } from 'next/server';
import { newUrl } from './lib/utils/helper';

const protectedRoutes = [
  '/home',
  '/dashboard',
  '/settings/:path*',
  '/statistics',
  '/blog/post/draft',
  '/blog/post/published',
  '/blog/post/create',
  '/blog/post/preview',
  '/blog/post/edit'
];
const authRoutes = ['/login', '/register'];

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtected = protectedRoutes.includes(path);
  const isAuth = authRoutes.includes(path);
  const refreshToken = request.cookies.get(`${process.env.REFRESH_TOKEN}`);
  if (isProtected && !refreshToken) {
    const searchParams = [
      { param: 'redirect', value: 'Login required.' },
      { param: 'redirect_url', value: `${request.nextUrl}` }
    ];
    const url = newUrl('/login', searchParams, request.url);
    return NextResponse.redirect(url);
  }
  if (isAuth && refreshToken) {
    const searchParams = [{ param: 'redirect', value: 'Login required.' }];
    const url = newUrl('/home', searchParams, request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
};
