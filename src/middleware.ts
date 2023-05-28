import { authMiddleware } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export default authMiddleware({
  afterAuth(auth, req, evt) {
    // handle users who aren't authenticated
    console.log(
      `auth.userId: ${auth.userId} isPublicRoute: ${auth.isPublicRoute}`,
    );
    console.log(`req.url ${req.url}`);
    if (!auth.userId && !auth.isPublicRoute) {
      console.log(`Redirecting`);
      const signInUrl = new URL('/sign-in', req.url);
      signInUrl.searchParams.set('redirect_url', req.url);
      return NextResponse.redirect(signInUrl);
    }
  },
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
