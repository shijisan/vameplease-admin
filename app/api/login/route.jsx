import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose'; // Correct import for the signing method
import { prisma } from '@/app/lib/prisma';

export async function POST(request) {
  const { email, password } = await request.json();

  const user = await prisma.admin.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // Correct JWT signing process using SignJWT
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({ userId: user.id }) 
    .setProtectedHeader({ alg: 'HS256' }) 
    .sign(secret); 

  // Set the token in a secure cookie
  const response = NextResponse.json({ message: 'Login successful' });

  response.cookies.set('token', token, {
    httpOnly: true, 
    secure: false,
    sameSite: 'Strict', 
    maxAge: 60 * 60, // 1 hour
  });

  return response;
}
