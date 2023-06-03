import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const authUser = await getAuth(request);
  let user = null;
  if (authUser.userId) {
    user = await prisma.user.findUnique({
      where: { id: authUser.userId },
    });
  }
  return NextResponse.json(user);
}

export async function POST(request: Request) {
  const { data } = await request.json();
  const id = data.id;
  const email = data.email_addresses[0].email_address;

  try {
    if (id && email) {
      const newUser = await prisma.user.create({
        data: { email, id: id },
      });
      console.log('new user', newUser);
      return NextResponse.json(newUser, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'something failed' }, { status: 500 });
  }
}
