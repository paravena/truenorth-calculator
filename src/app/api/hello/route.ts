export async function GET(request: Request) {
  console.log('request', request);
  return new Response('Hello, Next.js!');
}

export async function POST(request: Request) {
  console.log('request.body', request.body);
  return new Response('Hello, Next.js!');
}
