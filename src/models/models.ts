import { Operation, OPERATION_TYPE, OperationRecord } from '@prisma/client';

enum Operator {
  ADDITION = 'ADDITION',
  SUBSTRACTION = 'SUBSTRACTION',
  MULTIPLICATION = 'MULTIPLICATION',
  DIVISION = 'DIVISION',
  SQUARE_ROOT = 'SQUARE_ROOT',
  RANDOM_STRING = 'RANDOM_STRING',
}

export const OperatorMapper: Record<string, Operator> = {
  '+': Operator.ADDITION,
  '-': Operator.SUBSTRACTION,
  '*': Operator.MULTIPLICATION,
  '/': Operator.DIVISION,
  'SQRT': Operator.SQUARE_ROOT,
  'RAND': Operator.RANDOM_STRING,
};

export type OperationRecordPayload = {
  amount: number;
  operators: Operator[];
};

export type OperationRecordItem = OperationRecord & { operation: Operation };

export type OperationRecordResponse = {
  data: OperationRecordItem[];
  pagination: {
    numberOfPages: number;
    currentPage: number;
    count: number;
    fromItem: number;
    toItem: number;
  };
};
