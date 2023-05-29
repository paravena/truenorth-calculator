'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Calculator } from '@/components';

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  if (isLoaded && !isSignedIn) {
    router.push('/sign-in?redirectUrl=/');
  }
  return (
    <main className="">
      <Calculator />
    </main>
  );
}
