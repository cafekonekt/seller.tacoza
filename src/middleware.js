import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';

// Define protected and public routes
const protectedRoutes = ['/', '/customers', '/finance', '/menu', '/build-qr', '/offers', '/orders', '/restaurant', '/tables', '/seller'];
const publicRoutes = ['/login'];

export default async function middleware(req) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const session = await getSession();

  // Redirect to /login if user is not authenticated on a protected route
  if (isProtectedRoute && !session?.user) {
    return NextResponse.redirect(new URL(`/login?next=${path}`, req.nextUrl));
  }

  // Redirect to /dashboard if user is authenticated and on a public route
  if (isPublicRoute && session?.user) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  return NextResponse.next();
}

// Config to exclude specific paths from middleware
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
