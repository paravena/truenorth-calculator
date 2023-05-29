import { User } from '@clerk/backend';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function GET(request: Request) {
  console.log('request', request);
  return new Response('Hello, Next.js!');
}

export async function POST(request: Request) {
  const data: User = await request.json();
  console.log('request.body', data, data.emailAddresses);

  const id = data.id;
  const email = data.emailAddresses[0].emailAddress;

  console.log(`id ${id} email ${email}`);

  if (id && email) {
    const newUser = await prisma.user.create({
      data: { email, id: id, authId: id },
    });
    console.log('new user', newUser);
  }

  return new Response('Hello, Next.js!');
}
