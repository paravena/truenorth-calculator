export async function GET(request: Request) {
  console.log('request', request);
  return new Response('Hello, Next.js!');
}

export async function POST(request: Request) {
  const data = await request.json();
  console.log('request.body', data);
  return new Response('Hello, Next.js!');
}
