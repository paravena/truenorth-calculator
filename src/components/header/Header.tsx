'use client';
import Link from 'next/link';
import { UserButton, useUser } from '@clerk/nextjs';
import { TrueNorth } from '@/assets/icons';

const Header = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  if (isLoaded && !isSignedIn) {
    return <></>;
  }

  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:p-8"
        aria-label="Global"
      >
        {isLoaded && isSignedIn && (
          <>
            <Link href="/" className="-m-1.5 p-1.5">
              <TrueNorth />
            </Link>
            <div className="flex flex-1 justify-end">
              <UserButton afterSignOutUrl="/" />
            </div>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
