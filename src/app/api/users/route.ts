import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();

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
