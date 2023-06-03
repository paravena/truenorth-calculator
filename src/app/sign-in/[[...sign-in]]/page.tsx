import { SignIn } from '@clerk/nextjs';

const Page = () => (
  <section className="py-48">
    <div className="flex justify-center">
      <SignIn />
    </div>
  </section>
);

export default Page;
