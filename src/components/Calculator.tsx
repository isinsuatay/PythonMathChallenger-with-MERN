import { useState } from 'react';
import '../styles/Calculator.css';
import * as math from 'mathjs';

const buttons = [
  ['1', '4', '7', '/'],
  ['2', '5', '8', '*'],
  ['3', '6', '9', '-'],
  ['0', '.', '=', '+'],
  ['C', '(', ')', 'log('],
  ['sin(', 'cos(', 'tan(', '^'],
  ['sqrt', 'pi', 'e', 'abs'],
  ['integrate', 'derivative']
];

function Calculator() {
  const [input, setInput] = useState('');

  const handleClick = (value: string) => {
    if (value === '=') {
      try {
        const result = math.evaluate(input);
        setInput(result.toString());
      } catch (error) {
        setInput('Hata');
      }
    } else if (value === 'C') {
      setInput('');
    } else {
      setInput(prevInput => prevInput + value);
    }
  };

  return (
    <div className="calculator">
      <input
        className="calculator-screen"
        type="text"
        value={input}
        disabled
      />
      <div className="calculator-keys">
        {buttons.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((button) => (
              <button className='calc-btn' key={button} onClick={() => handleClick(button)}>
                {button}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calculator;
