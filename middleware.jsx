import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req) {
  const token = req.cookies.get('token')?.value; 

  const { pathname } = req.nextUrl;

  if (pathname === '/login') {
    return NextResponse.next();
  }

  if (!token) {
    console.log('No token found, redirecting to login page');
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret); 
    console.log('Token is valid, proceeding with the request');
    return NextResponse.next();
  } catch (error) {
    console.error('Token verification failed', error);
    console.log('Token verification failed, redirecting to login');
    return NextResponse.redirect(new URL('/login', req.url)); 
  }
}

export const config = {
  matcher: ['/', '/manage/:path*'], 
};
