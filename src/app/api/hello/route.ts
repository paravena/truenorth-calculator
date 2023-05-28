export async function GET(request: Request) {
  console.log('request', request);
  return new Response('Hello, Next.js!');
}
