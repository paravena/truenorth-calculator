'use client';

import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { Alert, Calculator, RecordTable, UserInfo } from '@/components';
import { OperatorItem } from '@/components/calculator/utilities';
import {
  OperationRecordPayload,
  OperationRecordResponse,
  OperatorMapper,
} from '@/models';
import { User } from '@prisma/client';
import { useCallback, useRef, useState } from 'react';

async function fetchRecords(
  url: string,
  page = 1,
): Promise<OperationRecordResponse> {
  return fetch(`${url}?page=${page}`).then(res => res.json());
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
  const [error, setError] = useState('');
  const page = useRef(1);
  const {
    data: records,
    isLoading: isLoadingRecords,
    mutate: mutateRecords,
  } = useSWR('/api/records', url => fetchRecords(url, page.current));

  const {
    data: authUser,
    isLoading: isLoadingUser,
    mutate,
  } = useSWR('/api/users', fetchUser);

  const { trigger, isMutating } = useSWRMutation('/api/records', addRecords, {
    onSuccess: data => {
      if (data.error) {
        setError(data.error);
      }
    },
  });

  const onFinishOperation = async (
    operators: OperatorItem[],
    amount: number,
  ) => {
    const operatorList = operators.map(opt => OperatorMapper[opt]);
    await trigger({ amount, operators: operatorList });
    await mutate();
  };

  const onPreviousPage = useCallback(async () => {
    page.current -= 1;
    await mutateRecords();
  }, [mutateRecords]);
  const onNextPage = useCallback(async () => {
    page.current += 1;
    await mutateRecords();
  }, [mutateRecords]);

  return (
    <main>
      <section>
        <UserInfo user={authUser} loading={isLoadingUser} />
      </section>
      <section className="flex flex-col sm:flex-row">
        <section className="flex-1">
          {error && <Alert message={error} />}
          <Calculator onFinishOperation={onFinishOperation} />
        </section>
        <section className="flex-1">
          <RecordTable
            records={records}
            loading={isMutating || isLoadingRecords}
            onPreviousPage={onPreviousPage}
            onNextPage={onNextPage}
          />
        </section>
      </section>
    </main>
  );
}
