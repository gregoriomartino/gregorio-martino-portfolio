import React, { useState } from 'react';

export default function TrisGame() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const getBestMove = (squares) => {
    const available = squares.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
    if (available.length === 0) return null;

    for (let i of available) {
      const testBoard = [...squares];
      testBoard[i] = 'O';
      if (calculateWinner(testBoard) === 'O') return i;
    }

    for (let i of available) {
      const testBoard = [...squares];
      testBoard[i] = 'X';
      if (calculateWinner(testBoard) === 'X') return i;
    }

    if (squares[4] === null) return 4;

    const corners = [0, 2, 6, 8].filter(i => squares[i] === null);
    if (corners.length > 0) return corners[Math.floor(Math.random() * corners.length)];

    return available[0];
  };

  const handleClick = (index) => {
    if (board[index] || winner || !isXNext) return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsXNext(false);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      return;
    }

    if (!newBoard.includes(null)) {
      setWinner('draw');
      return;
    }

    setTimeout(() => {
      const aiMove = getBestMove(newBoard);
      if (aiMove !== null) {
        newBoard[aiMove] = 'O';
        setBoard(newBoard);
        setIsXNext(true);

        const aiWinner = calculateWinner(newBoard);
        if (aiWinner) {
          setWinner(aiWinner);
        } else if (!newBoard.includes(null)) {
          setWinner('draw');
        }
      }
    }, 400);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div className="max-w-sm w-full mx-auto p-4">

      <div className="text-center mb-8">
        {winner ? (
          <p className="text-xl text-slate-800">
            {winner === 'draw' ? 'Pareggio' : winner === 'X' ? 'Hai vinto' : 'Ha vinto Gregorio'}
          </p>
        ) : (
          <p className="text-slate-500">
            {isXNext ? 'Il tuo turno' : 'Turno di Gregorio'}
          </p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 mb-8">
        {board.map((cell, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(idx)}
            disabled={cell !== null || winner || !isXNext}
            className="aspect-square border border-slate-300 flex items-center justify-center text-4xl hover:bg-slate-50 disabled:cursor-not-allowed transition bg-white"
          >
            {cell === 'X' && <span className="text-slate-800">X</span>}
            {cell === 'O' && <span>🚴</span>}
          </button>
        ))}
      </div>

      {winner && (
        <div className="text-center">
          <button
            onClick={resetGame}
            className="text-slate-600 hover:text-slate-800 underline"
          >
            Nuova partita
          </button>
        </div>
      )}
    </div>
  );
}