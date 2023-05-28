import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <main className="m-auto p-3">
      <SignUp redirectUrl={process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL} />
    </main>
  );
}
