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
import { Spinner } from '@/assets/icons/Spinner';

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
    isValidating: isValidatingRecords,
    mutate: mutateRecords,
  } = useSWR('/api/records', url => fetchRecords(url, page.current));

  const {
    data: authUser,
    isLoading: isLoadingUser,
    mutate: mutateUser,
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
    await mutateUser();
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
        <section className="max-w-8 p-8">
          {error && <Alert message={error} />}
          {isMutating && (
            <div className="flex items-center justify-center p-8 text-2xl">
              <span className="mr-4">Processing Operation</span> <Spinner />
            </div>
          )}
          <Calculator
            onFinishOperation={onFinishOperation}
            loading={isMutating}
          />
        </section>
        <section className="flex-1">
          <RecordTable
            records={records}
            loading={isLoadingRecords || isValidatingRecords}
            onPreviousPage={onPreviousPage}
            onNextPage={onNextPage}
          />
        </section>
      </section>
    </main>
  );
}
