'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import useSWRMutation from 'swr/mutation';
import { Calculator } from '@/components';
import { OperatorItem } from '@/components/calculator/utilities';
import { OperationRecord, OperatorMapper } from '@/models';
import useSWR from 'swr';

async function fetchRecords(url: string) {
  return fetch(url).then(res => res.json());
}
async function addRecords(url: string, { arg }: { arg: OperationRecord }) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
  }).then(res => res.json());
}

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const { data, error, isLoading } = useSWR('/api/records', fetchRecords);
  const { trigger } = useSWRMutation('/api/records', addRecords, {
    onSuccess: data => console.log('SWR DATA', data),
  });

  if (isLoaded && !isSignedIn) {
    router.push('/sign-in?redirectUrl=/');
  }

  const onFinishOperation = async (
    operators: OperatorItem[],
    amount: number,
  ) => {
    console.log(`operators: ${operators} result: ${amount}`);
    const operatorList = operators.map(opt => OperatorMapper[opt]);
    await trigger({ amount, operators: operatorList });
  };

  return (
    <main>
      <Calculator onFinishOperation={onFinishOperation} />
    </main>
  );
}
