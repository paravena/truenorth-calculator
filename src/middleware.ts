// import { authMiddleware } from '@clerk/nextjs';
// import { NextResponse } from 'next/server';
//
// const SERVER_URL =
//   `https://${process.env.RAILWAY_STATIC_URL}` || 'http://localhost:3000';
//
// export default authMiddleware({
//   // afterAuth(auth, req, evt) {
//   //   // handle users who aren't authenticated
//   //   console.log('RAILWAY_STATIC_URL: ' + process.env.RAILWAY_STATIC_URL);
//   //   console.log(`SERVER_URL ${SERVER_URL}`);
//   //
//   //   console.log(
//   //     `auth.userId: ${auth.userId} isPublicRoute: ${auth.isPublicRoute}`,
//   //   );
//   //   console.log(
//   //     `req.url ${req.url} pathname: ${req.nextUrl.pathname} hostname: ${req.nextUrl.hostname} domainLocale ${req.nextUrl.domainLocale}`,
//   //   );
//   //   if (!auth.userId && !auth.isPublicRoute) {
//   //     console.log(`Redirecting`);
//   //     const signInUrl = new URL('/sign-in', SERVER_URL);
//   //     signInUrl.searchParams.set(
//   //       'redirect_url',
//   //       SERVER_URL + req.nextUrl.pathname,
//   //     );
//   //     return NextResponse.redirect(signInUrl);
//   //   }
//   // },
//   publicRoutes: ['/sign-in(.*)', '/sign-up(.*)'],
//   debug: true,
// });
//
// export const config = {
//   matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
// };
import { withClerkMiddleware, getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Set the paths that don't require the user to be signed in
const publicPaths = ['/', '/sign-in*', '/sign-up*'];

const isPublic = (path: string) => {
  return publicPaths.find(x =>
    path.match(new RegExp(`^${x}$`.replace('*$', '($|/)'))),
  );
};

export default withClerkMiddleware((request: NextRequest) => {
  if (isPublic(request.nextUrl.pathname)) {
    return NextResponse.next();
  }
  // if the user is not signed in redirect them to the sign in page.
  const { userId } = getAuth(request);

  if (!userId) {
    // redirect the users to /pages/sign-in/[[...index]].ts

    const signInUrl = new URL('/sign-in', request.url);
    signInUrl.searchParams.set('redirect_url', request.url);
    return NextResponse.redirect(signInUrl);
  }
  return NextResponse.next();
});

export const config = {
  matcher: '/((?!_next/image|_next/static|favicon.ico).*)',
};
