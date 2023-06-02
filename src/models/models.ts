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
  'RANDOM': Operator.RANDOM_STRING,
};

export type OperationRecord = {
  amount: number;
  operators: Operator[];
};
