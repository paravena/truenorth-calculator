import { authMiddleware } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

const SERVER_URL =
  `https://${process.env.RAILWAY_STATIC_URL}` || 'http://localhost:3000';

export default authMiddleware({
  // afterAuth(auth, req, evt) {
  //   // handle users who aren't authenticated
  //   console.log('RAILWAY_STATIC_URL: ' + process.env.RAILWAY_STATIC_URL);
  //   console.log(`SERVER_URL ${SERVER_URL}`);
  //
  //   console.log(
  //     `auth.userId: ${auth.userId} isPublicRoute: ${auth.isPublicRoute}`,
  //   );
  //   console.log(
  //     `req.url ${req.url} pathname: ${req.nextUrl.pathname} hostname: ${req.nextUrl.hostname} domainLocale ${req.nextUrl.domainLocale}`,
  //   );
  //   if (!auth.userId && !auth.isPublicRoute) {
  //     console.log(`Redirecting`);
  //     const signInUrl = new URL('/sign-in', SERVER_URL);
  //     signInUrl.searchParams.set('redirect_url', SERVER_URL);
  //     return NextResponse.redirect(signInUrl);
  //   }
  // },
  publicRoutes: ['/', '/sign-in', '/sign-up'],
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
