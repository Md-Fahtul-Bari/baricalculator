'use client';

import { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clearDisplay = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = performCalculation(operator, firstOperand, inputValue);
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const performCalculation = (op: string, first: number, second: number) => {
    switch (op) {
      case '+':
        return first + second;
      case '-':
        return first - second;
      case '*':
        return first * second;
      case '/':
        return first / second;
      default:
        return second;
    }
  };

  const handleEquals = () => {
    if (firstOperand === null || operator === null) {
      return;
    }

    const inputValue = parseFloat(display);
    const result = performCalculation(operator, firstOperand, inputValue);
    
    setDisplay(String(result));
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  return (
    <div className="w-72 mx-auto bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      <div className="p-4 bg-gray-900">
        <div className="text-right text-white text-2xl font-semibold h-10 overflow-hidden">
          {display}
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-1 p-2">
        <button 
          className="col-span-2 p-3 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
          onClick={clearDisplay}
        >
          Clear
        </button>
        <button 
          className="p-3 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
          onClick={() => setDisplay(display.slice(0, -1) || '0')}
        >
          ←
        </button>
        <button 
          className="p-3 bg-orange-500 text-white rounded hover:bg-orange-400 transition-colors"
          onClick={() => handleOperator('/')}
        >
          ÷
        </button>
        
        <button 
          className="p-3 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
          onClick={() => inputDigit('7')}
        >
          7
        </button>
        <button 
          className="p-3 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
          onClick={() => inputDigit('8')}
        >
          8
        </button>
        <button 
          className="p-3 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
          onClick={() => inputDigit('9')}
        >
          9
        </button>
        <button 
          className="p-3 bg-orange-500 text-white rounded hover:bg-orange-400 transition-colors"
          onClick={() => handleOperator('*')}
        >
          ×
        </button>
        
        <button 
          className="p-3 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
          onClick={() => inputDigit('4')}
        >
          4
        </button>
        <button 
          className="p-3 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
          onClick={() => inputDigit('5')}
        >
          5
        </button>
        <button 
          className="p-3 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
          onClick={() => inputDigit('6')}
        >
          6
        </button>
        <button 
          className="p-3 bg-orange-500 text-white rounded hover:bg-orange-400 transition-colors"
          onClick={() => handleOperator('-')}
        >
          −
        </button>
        
        <button 
          className="p-3 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
          onClick={() => inputDigit('1')}
        >
          1
        </button>
        <button 
          className="p-3 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
          onClick={() => inputDigit('2')}
        >
          2
        </button>
        <button 
          className="p-3 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
          onClick={() => inputDigit('3')}
        >
          3
        </button>
        <button 
          className="p-3 bg-orange-500 text-white rounded hover:bg-orange-400 transition-colors"
          onClick={() => handleOperator('+')}
        >
          +
        </button>
        
        <button 
          className="col-span-2 p-3 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
          onClick={() => inputDigit('0')}
        >
          0
        </button>
        <button 
          className="p-3 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
          onClick={inputDecimal}
        >
          .
        </button>
        <button 
          className="p-3 bg-orange-500 text-white rounded hover:bg-orange-400 transition-colors"
          onClick={handleEquals}
        >
          =
        </button>
      </div>
    </div>
  );
}
