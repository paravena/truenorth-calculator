import { withClerkMiddleware } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';

const publicPaths = ['/', '/sign-in*', '/sign-up*'];

const isPublic = (path: string) => {
  return publicPaths.find(x =>
    path.match(new RegExp(`^${x}$`.replace('*$', '($|/)'))),
  );
};

// export default withClerkMiddleware((request: NextRequest) => {
//   if (isPublic(request.nextUrl.pathname)) {
//     return NextResponse.next();
//   }
//   const { userId } = getAuth(request);
//
//   if (!userId) {
//     // redirect the users to /pages/sign-in/[[...index]].ts
//     const signInUrl = new URL('/sign-in', request.url);
//     signInUrl.searchParams.set('redirectUrl', request.url);
//     return NextResponse.redirect(signInUrl);
//   }
//   return NextResponse.next();
// });
// export default withClerkMiddleware(req => {
//   return NextResponse.next();
// });
// export const config = {
//   matcher: '/((?!_next/image|_next/static|favicon.ico).*)',
// };
import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware();

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
