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
  'SQRT',
  'RAND',
] as const;

export type OperatorItem = (typeof OPERATORS)[number];

export function isOperator(opt: OperatorItem) {
  return OPERATORS.slice(0, 5).includes(opt);
}

const RANDOM_URL = process.env.NEXT_PUBLIC_RANDOM_URL || '';
export async function fetchRandomNumber() {
  return await fetch(RANDOM_URL);
}

export function isMathExpressionValid(expression: string) {
  const stack = [];

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];

    if (char === '(') {
      stack.push(char);
    } else if (char === ')') {
      if (stack.length === 0) {
        return false; // Unmatched closing parenthesis
      }
      stack.pop();
    } else if (['+', '-', '*', '/'].includes(char)) {
      if (
        i === 0 ||
        expression[i - 1] === '(' ||
        expression[i + 1] === ')' ||
        ['+', '-', '*', '/'].includes(expression[i + 1])
      ) {
        return false; // Invalid operator placement
      }
    } else if (!/\d|\./.test(char)) {
      return false; // Invalid character
    }
  }

  return stack.length === 0; // Check for unmatched opening parentheses
}
