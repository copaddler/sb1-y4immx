import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { encrypt } from '@/lib/auth';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name } = registerSchema.parse(body);

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password and create user
    const hashedPassword = await hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    // Create session
    const token = await encrypt({
      id: user.id,
      email: user.email,
    });

    const response = NextResponse.json(
      { success: true },
      { status: 201 }
    );

    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      path: '/',
    });

    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}