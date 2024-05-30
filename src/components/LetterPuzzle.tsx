import React, { useState, useEffect } from 'react';
import '../styles/Game.css';

type SquareValue = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | '';

const LetterPuzzle: React.FC = () => {
  const gameBoards: SquareValue[][][] = [
    [
      ['F', '', '', '', '', '', '', 'C'],
      ['', '', 'G', '', '', 'C', '', ''],
      ['', 'C', '', 'A', 'B', '', 'G', ''],
      ['', '', 'B', 'C', 'D', 'E', '', ''],
      ['', '', 'E', 'G', 'A', 'F', '', ''],
      ['', 'A', '', 'F', 'E', '', 'H', ''],
      ['', '', 'H', '', '', 'A', '', ''],
      ['A', '', '', '', '', '', '', 'B'],
    ],
    [
      ['', 'F', '', '', '', '', 'D', ''],
      ['G', 'E', '', '', '', '', 'F', 'B'],
      ['', '', '', 'H', 'B', '', '', ''],
      ['', '', 'D', '', '', 'G', '', ''],
      ['', '', 'C', '', '', 'D', '', ''],
      ['', '', '', 'G', 'C', '', '', ''],
      ['F', 'H', '', '', '', '', 'G', 'C'],
      ['', 'D', '', '', '', '', 'B', ''],
    ],
    [
      ['', '', '', 'D', 'C', '', '', ''],
      ['', '', 'A', '', '', 'F', '', ''],
      ['', 'B', 'D', '', '', 'G', 'H', ''],
      ['C', '', '', '', '', '', '', 'A'],
      ['A', '', '', '', '', '', '', 'B'],
      ['', 'F', 'C', '', '', 'B', 'D', ''],
      ['', '', 'G', '', '', 'E', '', ''],
      ['', '', '', 'H', 'B', '', '', ''],
    ],
    [
      ['', 'A', 'H', '', '', 'G', 'B', ''],
      ['B', 'D', '', '', '', '', 'A', 'F'],
      ['A', '', '', '', '', '', '', 'H'],
      ['', '', '', 'E', 'H', '', '', ''],
      ['', '', '', 'B', 'A', '', '', ''],
      ['E', '', '', '', '', '', '', 'G'],
      ['F', 'G', '', '', '', '', 'D', 'C'],
      ['', 'H', 'F', '', '', 'C', 'E', ''],
    ]
  ];

  const getRandomBoard = () => {
    const randomIndex = Math.floor(Math.random() * gameBoards.length);
    return gameBoards[randomIndex];
  };

  const [board, setBoard] = useState<SquareValue[][]>(getRandomBoard());
  const [initialBoard, setInitialBoard] = useState<SquareValue[][]>(getRandomBoard());
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState<SquareValue>('');
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    setInitialBoard(board.map(row => [...row]));
  }, [board]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const letter = event.key.toUpperCase();
      if (['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].includes(letter)) {
        setSelectedLetter(letter as SquareValue);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleLetterClick = (letter: SquareValue) => {
    if (isGameComplete) return;
    setSelectedLetter(letter);
  };

  const handleCellClick = (row: number, col: number) => {
    if (isGameComplete) return;

    if (!selectedLetter) return;

    if (initialBoard[row][col] === '') {
      const newBoard = [...board];
      newBoard[row][col] = selectedLetter;
      setBoard(newBoard);
      setSelectedLetter('');
      setSelectedCell({ row, col });
      checkGameComplete(newBoard);
    }
  };

  const checkGameComplete = (currentBoard: SquareValue[][]) => {
    let isComplete = true;
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (currentBoard[row][col] === '') {
          isComplete = false;
          break;
        }
      }
      if (!isComplete) {
        break;
      }
    }
    setIsGameComplete(isComplete);
    if (isComplete) {
      checkSolution(currentBoard);
    } else {
      setIsCorrect(false);
    }
  };

  const isValidMove = (
    currentBoard: SquareValue[][],
    row: number,
    col: number,
    value: SquareValue
  ): boolean => {
    for (let i = 0; i < 8; i++) {
      if (i !== col && currentBoard[row][i] === value) return false;
      if (i !== row && currentBoard[i][col] === value) return false;
    }
    const diagonals = [
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1],
    ];
    for (const [dx, dy] of diagonals) {
      let x = row + dx;
      let y = col + dy;
      while (x >= 0 && x < 8 && y >= 0 && y < 8) {
        if ((x !== row || y !== col) && currentBoard[x][y] === value) {
          return false;
        }
        x += dx;
        y += dy;
      }
    }

    return true;
  };

  const checkSolution = (currentBoard: SquareValue[][]) => {
    let isCorrect = true;
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (!isValidMove(currentBoard, row, col, currentBoard[row][col])) {
          isCorrect = false;
          break;
        }
      }
      if (!isCorrect) {
        break;
      }
    }
    setIsCorrect(isCorrect);
  };

  const handleFinishGame = () => {
    if (!isGameComplete) {
      const isBoardComplete = board.every(row => row.every(cell => cell !== ''));
      setIsGameComplete(isBoardComplete);
      if (isBoardComplete) {
        checkSolution(board);
      } else {
        setIsCorrect(false);
      }
    }
  };

  return (
    <div className='letterPuzzle'>
      <h3>LETTER PUZZLE</h3>
      <h5>Place a letter from A to H in each empty square without repeating any letter in the same row or column. Also, the same letters cannot touch diagonally.</h5>
      <table>
        <tbody>
          {board.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((col, colIndex) => (
                <td
                  key={colIndex}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  className={(selectedCell && selectedCell.row === rowIndex && selectedCell.col === colIndex) ? 'selected' : ''}
                  style={{ cursor: initialBoard[rowIndex][colIndex] === '' ? 'pointer' : 'not-allowed', backgroundColor: col === '' ? 'white' : '#f0f0f0' }}
                >
                  {col}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="letters">
        <p>Selected Letter: {selectedLetter}</p>
        <div className="letter-buttons">
          {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map((letter) => (
      <button
      key={letter}
      onClick={() => handleLetterClick(letter as SquareValue)}
      disabled={selectedLetter === letter || isGameComplete}
    >
      {letter}
    </button>
    
          ))}
        </div>
      </div>
      {isGameComplete && <p>{isCorrect ? 'Game completed! Congratulations!' : 'Wrong solution! Try again.'}</p>}
      <button onClick={handleFinishGame} disabled={isGameComplete}>
        Finish Game
      </button>
    </div>
  );
};

export default LetterPuzzle;
