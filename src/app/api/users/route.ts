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
