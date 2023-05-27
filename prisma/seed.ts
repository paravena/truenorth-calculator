import { OPERATION_TYPE, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.operation.deleteMany({});
  await prisma.operation.createMany({
    data: [
      { type: OPERATION_TYPE.ADDITION, cost: 25 },
      { type: OPERATION_TYPE.SUBSTRACTION, cost: 25 },
      { type: OPERATION_TYPE.MULTIPLICATION, cost: 50 },
      { type: OPERATION_TYPE.DIVISION, cost: 50 },
      { type: OPERATION_TYPE.SQUARE_ROOT, cost: 80 },
      { type: OPERATION_TYPE.RANDOM_STRING, cost: 100 },
    ],
  });
}
main()
  .then(async () => {
    console.log('Seed successfully executed');
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
