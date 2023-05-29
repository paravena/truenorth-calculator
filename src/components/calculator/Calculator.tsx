'use client';

import React, { useState } from 'react';

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState('0');

  const handleClick = (value: string) => () => {
    if (displayValue === '0') {
      setDisplayValue(value);
    } else {
      setDisplayValue(prevValue => prevValue + value);
    }
  };

  const handleClear = () => {
    setDisplayValue('0');
  };

  const handleCalculate = () => {
    try {
      const result = eval(displayValue);
      setDisplayValue(result.toString());
    } catch (error) {
      setDisplayValue('Error');
    }
  };

  return (
    <div className="mx-auto w-72 rounded-md bg-gray-800 p-4">
      <input
        type="text"
        value={displayValue}
        className="mb-4 rounded-md bg-gray-900 px-1 py-2 text-right text-2xl text-white outline-none"
        readOnly
      />

      <div className="grid grid-cols-4 gap-2">
        <button
          className="rounded-md bg-gray-600 py-2 text-white hover:bg-gray-700"
          onClick={handleClick('7')}
        >
          7
        </button>
        <button
          className="rounded-md bg-gray-600 py-2 text-white hover:bg-gray-700"
          onClick={handleClick('8')}
        >
          8
        </button>
        <button
          className="rounded-md bg-gray-600 py-2 text-white hover:bg-gray-700"
          onClick={handleClick('9')}
        >
          9
        </button>
        <button
          className="rounded-md bg-yellow-500 py-2 text-white hover:bg-yellow-600"
          onClick={handleClick('/')}
        >
          ÷
        </button>
        <button
          className="rounded-md bg-gray-600 py-2 text-white hover:bg-gray-700"
          onClick={handleClick('4')}
        >
          4
        </button>
        <button
          className="rounded-md bg-gray-600 py-2 text-white hover:bg-gray-700"
          onClick={handleClick('5')}
        >
          5
        </button>
        <button
          className="rounded-md bg-gray-600 py-2 text-white hover:bg-gray-700"
          onClick={handleClick('6')}
        >
          6
        </button>
        <button
          className="rounded-md bg-yellow-500 py-2 text-white hover:bg-yellow-600"
          onClick={handleClick('*')}
        >
          ×
        </button>
        <button
          className="rounded-md bg-gray-600 py-2 text-white hover:bg-gray-700"
          onClick={handleClick('1')}
        >
          1
        </button>
        <button
          className="rounded-md bg-gray-600 py-2 text-white hover:bg-gray-700"
          onClick={handleClick('2')}
        >
          2
        </button>
        <button
          className="rounded-md bg-gray-600 py-2 text-white hover:bg-gray-700"
          onClick={handleClick('3')}
        >
          3
        </button>
        <button
          className="rounded-md bg-yellow-500 py-2 text-white hover:bg-yellow-600"
          onClick={handleClick('-')}
        >
          -
        </button>
        <button
          className="rounded-md bg-gray-600 py-2 text-white hover:bg-gray-700"
          onClick={handleClick('0')}
        >
          0
        </button>
        <button
          className="rounded-md bg-gray-600 py-2 text-white hover:bg-gray-700"
          onClick={handleClick('.')}
        >
          .
        </button>
        <button
          className="rounded-md bg-yellow-500 py-2 text-white hover:bg-yellow-600"
          onClick={handleCalculate}
        >
          =
        </button>
        <button
          className="rounded-md bg-yellow-500 py-2 text-white hover:bg-yellow-600"
          onClick={handleClick('+')}
        >
          +
        </button>
      </div>

      <button
        className="mt-4 rounded-md bg-gray-500 py-2 text-white hover:bg-gray-600"
        onClick={handleClear}
      >
        AC
      </button>
    </div>
  );
};

export default Calculator;
