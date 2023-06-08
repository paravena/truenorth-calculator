import React from 'react';
import { render, screen } from '@testing-library/react';
import RecordTable from './RecordTable';
import { OperationRecordResponse } from '@/models';
import { OPERATION_TYPE } from '@prisma/client';

describe('RecordTable', () => {
  it('renders table headers correctly', () => {
    render(
      <RecordTable
        loading={false}
        onPreviousPage={() => {}}
        onNextPage={() => {}}
      />,
    );

    expect(screen.getByText('Operation')).toBeInTheDocument();
    expect(screen.getByText('Cost')).toBeInTheDocument();
    expect(screen.getByText('Balance')).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();
  });

  it('renders loading state correctly', () => {
    render(
      <RecordTable
        loading={true}
        onPreviousPage={() => {}}
        onNextPage={() => {}}
      />,
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders records correctly', () => {
    const mockRecords: OperationRecordResponse = {
      data: [
        {
          id: 'some-id-one',
          userId: 'some-user-id-1',
          operationId: 'some-operation-id-1',
          operation: {
            id: 'some-operation-id-1',
            type: OPERATION_TYPE.ADDITION,
            cost: 10,
          },
          amount: 100,
          date: new Date(),
        },
        {
          id: 'some-id-2',
          userId: 'some-user-id-1',
          operationId: 'some-operation-id-2',
          operation: {
            id: 'some-operation-id-2',
            type: OPERATION_TYPE.SUBSTRACTION,
            cost: 20,
          },
          amount: 80,
          date: new Date(),
        },
      ],
      pagination: {
        count: 2,
        numberOfPages: 1,
        currentPage: 1,
        fromItem: 1,
        toItem: 2,
      },
    };

    render(
      <RecordTable
        records={mockRecords}
        loading={false}
        onPreviousPage={() => {}}
        onNextPage={() => {}}
      />,
    );

    expect(screen.getByText(OPERATION_TYPE.ADDITION)).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();

    expect(screen.getByText(OPERATION_TYPE.SUBSTRACTION)).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('80')).toBeInTheDocument();
  });
});
