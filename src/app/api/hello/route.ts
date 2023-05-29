import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function GET(request: Request) {
  console.log('request', request);
  return new Response('Hello, Next.js!');
}

export async function POST(request: Request) {
  const { data } = await request.json();
  console.log('data', data);
  console.log(`id ${data.id}, email_addresses ${data.email_addresses}`);

  const id = data.id;
  const email = data.email_addresses[0].email_address;

  console.log(`id ${id} email ${email}`);

  // if (id && email) {
  //   const newUser = await prisma.user.create({
  //     data: { email, id: id, authId: id },
  //   });
  //   console.log('new user', newUser);
  // }

  return new Response('Hello, Next.js!');
}
