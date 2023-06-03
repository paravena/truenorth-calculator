'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { Calculator, RecordTable, UserInfo } from '@/components';
import { OperatorItem } from '@/components/calculator/utilities';
import { OperationRecordPayload, OperatorMapper } from '@/models';
import { Operation, OperationRecord, User } from '@prisma/client';

async function fetchRecords(
  url: string,
): Promise<(OperationRecord & { operation: Operation })[]> {
  return fetch(url).then(res => res.json());
}

async function fetchUser(url: string): Promise<User> {
  return fetch(url).then(res => res.json());
}

async function addRecords(
  url: string,
  { arg }: { arg: OperationRecordPayload },
) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
  }).then(res => res.json());
}

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const { data: records, isLoading: isLoadingRecords } = useSWR(
    '/api/records',
    fetchRecords,
  );
  const { data: authUser, isLoading: isLoadingUser } = useSWR(
    '/api/users',
    fetchUser,
  );
  const { trigger, isMutating } = useSWRMutation('/api/records', addRecords, {
    onSuccess: data => console.log('SWR DATA', data),
  });

  if (isLoaded && !isSignedIn) {
    router.push('/sign-in?redirectUrl=/');
  }

  const onFinishOperation = async (
    operators: OperatorItem[],
    amount: number,
  ) => {
    const operatorList = operators.map(opt => OperatorMapper[opt]);
    await trigger({ amount, operators: operatorList });
  };

  return (
    <main>
      <section>
        <UserInfo user={authUser} loading={isLoadingUser} />
      </section>
      <section className="flex">
        <section className="flex-1">
          <Calculator onFinishOperation={onFinishOperation} />
        </section>
        <section className="flex-1">
          <RecordTable records={records} loading={isMutating} />
        </section>
      </section>
    </main>
  );
}
