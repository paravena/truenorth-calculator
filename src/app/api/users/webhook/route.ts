import { Webhook } from 'svix';
import { WebhookEvent } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { PrismaClient } from '@prisma/client';

const webhookSecret: string = process.env.WEBHOOK_SECRET || '';
const prisma = new PrismaClient();

export async function POST(request: Request) {
  const payload = await request.json();
  const payloadString = JSON.stringify(payload);
  const headerPayload = headers();
  const svixId = headerPayload.get('svix-id');
  const svixIdTimeStamp = headerPayload.get('svix-timestamp');
  const svixSignature = headerPayload.get('svix-signature');

  if (!svixId || !svixIdTimeStamp || !svixSignature) {
    return new Response('Bad Request', {
      status: 400,
    });
  }

  const svixHeaders = {
    'svix-id': svixId,
    'svix-timestamp': svixIdTimeStamp,
    'svix-signature': svixSignature,
  };

  const wh = new Webhook(webhookSecret);
  let evt: WebhookEvent;
  try {
    evt = wh.verify(payloadString, svixHeaders) as WebhookEvent;
  } catch (_) {
    return new Response('Bad Request', { status: 400 });
  }
  const eventType = evt.type;
  if (eventType === 'user.created') {
    const { id, email_addresses } = evt.data;
    const email = email_addresses[0].email_address;
    try {
      if (id && email) {
        const newUser = await prisma.user.create({
          data: { email, id: id },
        });
        console.log('new user', newUser);
        return NextResponse.json(newUser, { status: 201 });
      }
    } catch (error) {
      return NextResponse.json(
        { message: 'something failed' },
        { status: 500 },
      );
    }
  }
}
