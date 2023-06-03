import { SignUp } from '@clerk/nextjs';

const Page = () => {
  return (
    <section className="py-48">
      <div className="flex justify-center">
        <SignUp />
      </div>
    </section>
  );
};

export default Page;
