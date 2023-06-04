import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Calculator from './Calculator';

describe('Calculator', () => {
  it('should render correctly', () => {
    const { getByText } = render(<Calculator onFinishOperation={() => {}} />);
    const calculatorContainer = getByText('AC');
    expect(calculatorContainer).toBeInTheDocument();
  });

  it('should update display value when a button is clicked', () => {
    const { getByText, getByDisplayValue } = render(
      <Calculator onFinishOperation={() => {}} />,
    );
    const numberButton = getByText('7');
    fireEvent.click(numberButton);
    const displayValue = getByDisplayValue('7');
    expect(displayValue).toBeInTheDocument();
  });

  it('should clear display and operators when "AC" button is clicked', () => {
    const { getByText, getByDisplayValue } = render(
      <Calculator onFinishOperation={() => {}} />,
    );
    const numberButton = getByText('7');
    fireEvent.click(numberButton);
    const acButton = getByText('AC');
    fireEvent.click(acButton);
    const displayValue = getByDisplayValue('0');
    expect(displayValue).toBeInTheDocument();
  });

  it('should calculate the correct result when "=" button is clicked', () => {
    const onFinishOperationMock = jest.fn();
    const { getByText, getByDisplayValue } = render(
      <Calculator onFinishOperation={onFinishOperationMock} />,
    );
    const numberButton1 = getByText('7');
    fireEvent.click(numberButton1);
    const operatorButton = getByText('+');
    fireEvent.click(operatorButton);
    const numberButton2 = getByText('3');
    fireEvent.click(numberButton2);
    const equalsButton = getByText('=');
    fireEvent.click(equalsButton);
    const displayValue = getByDisplayValue('10');
    expect(displayValue).toBeInTheDocument();
    expect(onFinishOperationMock).toHaveBeenCalledWith(['+'], 10);
  });

  // Add more test cases as needed
});
