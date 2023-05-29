import { SignUp } from '@clerk/nextjs/app-beta';

const Page = async () => {
  return (
    <section className="py-48">
      <div className="flex justify-center">
        <SignUp />
      </div>
    </section>
  );
};

export default Page;
