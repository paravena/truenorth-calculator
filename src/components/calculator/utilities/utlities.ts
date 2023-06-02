export const OPERATORS = [
  '+',
  '-',
  '*',
  '/',
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '.',
] as const;

export type OperatorItem = (typeof OPERATORS)[number];

export function isOperator(opt: OperatorItem) {
  return OPERATORS.slice(0, 5).includes(opt);
}
