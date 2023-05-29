import { SignIn } from '@clerk/nextjs/app-beta';

type Props = {
  searchParams: { [key: string]: string };
};

const Page = async ({ searchParams }: Props) => {
  const { redirectUrl } = searchParams;

  return (
    <section className="py-48">
      <div className="flex justify-center">
        <SignIn redirectUrl={redirectUrl || '/'} />
      </div>
    </section>
  );
};

export default Page;
