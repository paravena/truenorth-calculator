'use client';
import './Calculator.css';
import React, { useRef, useState } from 'react';
import {
  fetchRandomNumber,
  isMathExpressionValid,
  isOperator,
  OperatorItem,
} from './utilities';

type CalculatorProps = {
  onFinishOperation: (operators: OperatorItem[], result: number) => void;
  loading?: boolean;
};

const Calculator = ({
  onFinishOperation,
  loading = false,
}: CalculatorProps) => {
  const [displayValue, setDisplayValue] = useState('0');
  const operators = useRef<OperatorItem[]>([]);

  const handleClick = (value: OperatorItem) => () => {
    if (isOperator(value)) {
      operators.current = [...operators.current, value];
    }
    if (displayValue === '0') {
      setDisplayValue(value);
    } else {
      setDisplayValue(prev => prev + value);
    }
  };

  const handleClear = () => {
    setDisplayValue('0');
    operators.current = [];
  };

  const handleCalculate = (sqrt = false) => {
    try {
      if (isMathExpressionValid(displayValue)) {
        let result = eval(displayValue);
        if (sqrt) {
          result = Math.sqrt(result);
          operators.current = [...operators.current, 'SQRT'];
        }
        setDisplayValue(result.toString());
        onFinishOperation(operators.current, result);
      } else {
        setDisplayValue('Error');
      }
    } catch (error) {
      setDisplayValue('Error');
    } finally {
      operators.current = [];
    }
  };

  const handleRandomNumber = async () => {
    const response = await fetchRandomNumber();
    const randomNum = await response.json();
    operators.current = [...operators.current, 'RAND'];
    if (displayValue === '0') {
      setDisplayValue(randomNum);
    } else {
      setDisplayValue(prev => prev + randomNum);
    }
  };

  return (
    <div className="calculator__container">
      <input
        type="text"
        value={displayValue}
        className="calculator__result-input"
        readOnly
      />

      <div className="calculator__button-container">
        <button
          className="rounded-button rounded-button--primary"
          onClick={handleClear}
        >
          AC
        </button>
        <button
          className="rounded-button rounded-button--primary"
          onClick={() => handleCalculate(true)}
        >
          SQRT
        </button>
        <button
          className="rounded-button rounded-button--primary col-span-2"
          onClick={handleRandomNumber}
        >
          RAND
        </button>

        <button
          className="rounded-button rounded-button--secondary"
          onClick={handleClick('7')}
        >
          7
        </button>
        <button
          className="rounded-button rounded-button--secondary"
          onClick={handleClick('8')}
        >
          8
        </button>
        <button
          className="rounded-button rounded-button--secondary"
          onClick={handleClick('9')}
        >
          9
        </button>
        <button
          className="rounded-button rounded-button--primary"
          onClick={handleClick('/')}
        >
          ÷
        </button>
        <button
          className="rounded-button rounded-button--secondary"
          onClick={handleClick('4')}
        >
          4
        </button>
        <button
          className="rounded-button rounded-button--secondary"
          onClick={handleClick('5')}
        >
          5
        </button>
        <button
          className="rounded-button rounded-button--secondary"
          onClick={handleClick('6')}
        >
          6
        </button>
        <button
          className="rounded-button rounded-button--primary"
          onClick={handleClick('*')}
        >
          ×
        </button>
        <button
          className="rounded-button rounded-button--secondary"
          onClick={handleClick('1')}
        >
          1
        </button>
        <button
          className="rounded-button rounded-button--secondary"
          onClick={handleClick('2')}
        >
          2
        </button>
        <button
          className="rounded-button rounded-button--secondary"
          onClick={handleClick('3')}
        >
          3
        </button>
        <button
          className="rounded-button rounded-button--primary"
          onClick={handleClick('-')}
        >
          -
        </button>
        <button
          className="rounded-button rounded-button--secondary"
          onClick={handleClick('0')}
        >
          0
        </button>
        <button
          className="rounded-button rounded-button--secondary"
          onClick={handleClick('.')}
        >
          .
        </button>
        <button
          className="rounded-button rounded-button--primary disabled:opacity-75"
          onClick={() => handleCalculate(false)}
          disabled={loading}
        >
          =
        </button>
        <button
          className="rounded-button rounded-button--primary"
          onClick={handleClick('+')}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Calculator;
