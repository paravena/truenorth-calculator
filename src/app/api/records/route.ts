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

  if (authUser.userId) {
    const user = await prisma.user.findUnique({
      where: { id: authUser.userId },
    });
    if (user) {
      // verify balance
      let balance = user.amount;
      const totalCost = operations.reduce((total, op) => total + op.cost, 0);
      if (balance < totalCost) {
        return NextResponse.json(
          { error: 'Insufficient balance' },
          { status: 400 },
        );
      }
      for (const opt of operations) {
        balance = balance - opt.cost;
        await prisma.operationRecord.create({
          data: {
            amount: balance,
            userId: authUser.userId,
            operationId: opt.id,
          },
        });
      }
      await prisma.user.update({
        data: {
          amount: balance,
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
