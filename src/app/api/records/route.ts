import { OperationRecord, PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { OperationRecordPayload } from '@/models';
const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  let records: OperationRecord[] = [];

  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '10');
  const offset = (page - 1) * pageSize;
  const limit = pageSize;
  const authUser = await getAuth(request);
  let count = 0;
  let numberOfPages = 0;
  let fromItem = 0;
  let toItem = 0;
  if (authUser.userId) {
    count = await prisma.operationRecord.count({
      where: { userId: authUser.userId },
    });
    records = await prisma.operationRecord.findMany({
      where: { userId: authUser.userId },
      skip: offset,
      take: limit,
      include: {
        operation: true,
      },
      orderBy: {
        date: 'desc',
      },
    });
    numberOfPages = Math.ceil(count / pageSize);
    fromItem = (page - 1) * pageSize + 1;
    toItem = fromItem + pageSize - 1;
    if (toItem > count) {
      toItem = count;
    }
  }
  return NextResponse.json({
    data: records,
    pagination: {
      count,
      numberOfPages,
      currentPage: page,
      fromItem,
      toItem,
    },
  });
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
