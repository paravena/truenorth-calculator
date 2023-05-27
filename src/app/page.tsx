import { Inter } from 'next/font/google';
import { UserButton } from '@clerk/nextjs';
import Header from '@/components/header/Header';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return <main>Calculator</main>;
}
