import './globals.css';
import { ClerkProvider, SignedIn } from '@clerk/nextjs';
import { Header } from '@/components';

export const metadata = {
  title: 'True North Calculator',
  description:
    'This an assignment from True North Company, hope I can pass :-)',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body suppressHydrationWarning={true} className="mx-auto max-w-7xl">
          <SignedIn>
            <Header />
          </SignedIn>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
