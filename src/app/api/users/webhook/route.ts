import { Webhook, WebhookRequiredHeaders } from 'svix';
import { WebhookEvent } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { IncomingHttpHeaders } from 'http';

type NextApiRequestWithSvixRequiredHeaders = NextRequest & {
  headers: IncomingHttpHeaders & WebhookRequiredHeaders;
};

const webhookSecret: string = process.env.WEBHOOK_SECRET || '';

export async function POST(request: NextApiRequestWithSvixRequiredHeaders) {
  const payload = JSON.stringify(request.body);
  const headers = request.headers;
  const wh = new Webhook(webhookSecret);
  let evt: WebhookEvent;
  try {
    evt = wh.verify(payload, headers) as WebhookEvent;
  } catch (_) {
    return NextResponse.json({ message: 'Bad Request' }, { status: 400 });
  }
  const { id } = evt.data;
  const eventType = evt.type;
  if (eventType === 'user.created') {
    console.log(`User ${id} was ${eventType}`);
    return NextResponse.json({}, { status: 201 });
    // const id = payload.id;
    // const email = payload.email_addresses[0].email_address;
    //
    // try {
    //   if (id && email) {
    //     const newUser = await prisma.user.create({
    //       data: { email, id: id },
    //     });
    //     console.log('new user', newUser);
    //     return NextResponse.json(newUser, { status: 201 });
    //   }
    // } catch (error) {
    //   return NextResponse.json(
    //     { message: 'something failed' },
    //     { status: 500 },
    //   );
    // }
  }
}
