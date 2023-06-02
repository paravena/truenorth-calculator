'use client';
import './Calculator.css';
import React, { useState } from 'react';
import { isOperator, OperatorItem } from './utilities';

type CalculatorProps = {
  onFinishOperation: (operators: OperatorItem[], result: number) => void;
};

const Calculator = ({ onFinishOperation }: CalculatorProps) => {
  const [displayValue, setDisplayValue] = useState('0');
  const [operators, setOperators] = useState<OperatorItem[]>([]);

  const handleClick = (value: OperatorItem) => () => {
    if (isOperator(value)) {
      setOperators(prev => [...prev, value]);
    }
    if (displayValue === '0') {
      setDisplayValue(value);
    } else {
      setDisplayValue(prev => prev + value);
    }
  };

  const handleClear = () => {
    setDisplayValue('0');
    setOperators([]);
  };

  const handleCalculate = () => {
    try {
      const result = eval(displayValue);
      setDisplayValue(result.toString());
      onFinishOperation(operators, result);
    } catch (error) {
      setDisplayValue('Error');
    } finally {
      setOperators([]);
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
          className="rounded-button rounded-button--primary"
          onClick={handleClick('.')}
        >
          .
        </button>
        <button
          className="rounded-button rounded-button--primary"
          onClick={handleCalculate}
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

      <button
        className="rounded-button rounded-button--secondary"
        onClick={handleClear}
      >
        AC
      </button>
    </div>
  );
};

export default Calculator;
