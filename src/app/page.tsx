'use client';
import { Inter } from 'next/font/google';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  if (isLoaded && !isSignedIn) {
    router.push('/sign-in?redirectUrl=/');
  }
  return <main>Calculator</main>;
}
