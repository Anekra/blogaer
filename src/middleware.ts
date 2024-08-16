import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = [
  '/home',
  '/dashboard',
  '/settings/:path*',
  '/statistics',
  '/blog/post/:path*'
];
const authRoutes = ['/login', '/register'];

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtected = protectedRoutes.includes(path);
  const isAuth = authRoutes.includes(path);
  const refreshToken = request.cookies.get(`${process.env.REFRESH_TOKEN}`);
  if (isProtected && !refreshToken) {
    const url = new URL('/login', request.url);
    url.searchParams.set('redirect', 'Login required.')
    return NextResponse.redirect(url);
  }
  if (isAuth && refreshToken) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
};
