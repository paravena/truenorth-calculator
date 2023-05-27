import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const Header = () => (
  <header className="bg-white">
    <nav
      className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      aria-label="Global"
    >
      <Link href="/" className="-m-1.5 p-1.5">
        <h2>True North Calculator</h2>
      </Link>
      <div className="flex flex-1 justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  </header>
);

export default Header;
