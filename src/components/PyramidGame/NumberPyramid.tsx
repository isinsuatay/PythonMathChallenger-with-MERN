import React, { useState, useEffect } from 'react';
import PyramidCell from './PyramidCell';
import { generatePyramid } from './helpers';
import '../../styles/Game.css'

const NumberPyramid: React.FC = () => {
    const initialPyramid = generatePyramid();
    const [pyramid, setPyramid] = useState<(number | null)[][]>(initialPyramid);
    const [message, setMessage] = useState<string>('');
    const [timeLeft, setTimeLeft] = useState<number>(100);
    const [gameOver, setGameOver] = useState<boolean>(false);

    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearInterval(timerId);
        } else {
            setGameOver(true);
            setMessage('Time is up! Please try again.');
        }
    }, [timeLeft]);

    const handleCellChange = (row: number, col: number, value: number) => {
        if (gameOver) return;
        const newPyramid = pyramid.map(r => [...r]);
        newPyramid[row][col] = value;
        setPyramid(newPyramid);
    };

    const checkSolution = () => {
        if (gameOver) return;
        for (let i = 0; i < pyramid.length - 1; i++) {
            for (let j = 0; j < pyramid[i].length - 1; j++) {
                if (pyramid[i][j] !== null) {
                    const leftChild = pyramid[i + 1][j];
                    const rightChild = pyramid[i + 1][j + 1];
                    if (leftChild === null || rightChild === null || pyramid[i][j] !== leftChild + rightChild) {
                        setMessage('Try again!');
                        return;
                    }
                }
            }
        }
        setMessage('Congratulations, you have successfully completed the pyramid!');
    };

    const resetGame = () => {
        setPyramid(generatePyramid());
        setMessage('');
        setTimeLeft(60);
        setGameOver(false);
    };

    return (
        <div className='pyramidContainer'>
            <h2>Number Pyramid</h2>
            <p>Complete this number pyramid by filling in a number for each empty brick within the given time. Each cell must contain a value equal to the sum of the two cells directly below it. You can only enter a number once, you cannot change the numbers you enter.</p>
            <div style={{'fontSize':"2rem", 'textTransform':"uppercase"}}>Remaining Time: {timeLeft} seconds</div>
            {pyramid.map((row, rowIndex) => (
                <div className='cell' key={rowIndex} >
                    {row.map((cell, colIndex) => (
                        <PyramidCell
                            key={colIndex}
                            value={cell}
                            row={rowIndex}
                            col={colIndex}
                            onChange={handleCellChange}
                            disabled={gameOver}
                            readOnly={cell !== null}
                        />
                    ))}
                </div>
            ))}
            <button onClick={checkSolution} disabled={gameOver}>Check</button>
            <div>{message}</div>
            {gameOver && <button onClick={resetGame}>Try Again</button>}
        </div>
    );
};

export default NumberPyramid;
