import { OperationRecord, PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { OperationRecordPayload } from '@/models';
const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  let records: OperationRecord[] = [];
  const authUser = await getAuth(request);
  if (authUser.userId) {
    records = await prisma.operationRecord.findMany({
      where: { userId: authUser.userId },
      include: {
        operation: true,
      },
    });
  }
  return NextResponse.json(records);
}

export async function POST(request: NextRequest) {
  const authUser = await getAuth(request);
  const payload: OperationRecordPayload = await request.json();
  const conditions = payload.operators.map(opt => ({ type: opt }));
  const operations = await prisma.operation.findMany({
    where: { OR: conditions },
  });
  operations.forEach(opt => {});
  if (authUser.userId) {
    const user = await prisma.user.findUnique({
      where: { id: authUser.userId },
    });
    if (user) {
      let amount = user.amount;
      for (const opt of operations) {
        amount = amount - opt.cost;
        await prisma.operationRecord.create({
          data: {
            amount,
            userId: authUser.userId,
            operationId: opt.id,
          },
        });
      }
      await prisma.user.update({
        data: {
          amount,
        },
        where: { id: authUser.userId },
      });
    }
  }
  return NextResponse.json(
    { message: 'Operation successful' },
    { status: 200 },
  );
}
