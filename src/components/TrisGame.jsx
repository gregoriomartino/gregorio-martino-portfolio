import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TrisGame() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [scores, setScores] = useState({ player: 0, gregorio: 0, draws: 0 });
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [lastMove, setLastMove] = useState(null);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line };
      }
    }
    return null;
  };

  const minimax = (squares, isMaximizing) => {
    const result = calculateWinner(squares);
    if (result) return result.winner === 'O' ? 10 : -10;
    if (!squares.includes(null)) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (!squares[i]) {
          squares[i] = 'O';
          const score = minimax(squares, false);
          squares[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (!squares[i]) {
          squares[i] = 'X';
          const score = minimax(squares, true);
          squares[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const getBestMove = (squares) => {
    let bestScore = -Infinity;
    let bestMove = null;
    for (let i = 0; i < 9; i++) {
      if (!squares[i]) {
        squares[i] = 'O';
        const score = minimax(squares, false);
        squares[i] = null;
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    return bestMove;
  };

  const handleClick = (index) => {
    if (board[index] || winner || !isXNext || isAiThinking) return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsXNext(false);
    setLastMove(index);

    const gameResult = calculateWinner(newBoard);
    if (gameResult) {
      setWinner(gameResult.winner);
      setScores(prev => ({ ...prev, player: prev.player + 1 }));
      return;
    }

    if (!newBoard.includes(null)) {
      setWinner('draw');
      setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
      return;
    }

    setIsAiThinking(true);
    setTimeout(() => {
      const aiMove = getBestMove(newBoard);
      if (aiMove !== null) {
        newBoard[aiMove] = 'O';
        setBoard(newBoard);
        setIsXNext(true);
        setLastMove(aiMove);
        setIsAiThinking(false);

        const aiResult = calculateWinner(newBoard);
        if (aiResult) setWinner(aiResult.winner);
        else if (!newBoard.includes(null)) setWinner('draw');
      }
    }, 600);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setLastMove(null);
    setIsAiThinking(false);
  };

  const resetScores = () => {
    setScores({ player: 0, gregorio: 0, draws: 0 });
    resetGame();
  };

  const winningLine = winner && winner !== 'draw' ? calculateWinner(board)?.line : null;

  return (
    <div className="max-w-md w-full mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-slate-800">Tris vs Gregorio 🚴</h1>

      <div className="bg-slate-100 dark:bg-gray-800 rounded-lg p-4 mb-6 transition-colors">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{scores.player}</div>
            <div className="text-sm text-slate-600">Tu</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-500">{scores.draws}</div>
            <div className="text-sm text-slate-600">Pareggi</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600">{scores.gregorio}</div>
            <div className="text-sm text-slate-600">Gregorio</div>
          </div>
        </div>
      </div>

      <div className="text-center mb-6">
        {winner ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="space-y-2"
          >
            <p className="text-2xl font-bold text-slate-800">
              {winner === 'draw' ? '🤝 Pareggio!' : winner === 'X' ? '🎉 Hai vinto!' : '🚴 Ha vinto Gregorio!'}
            </p>
          </motion.div>
        ) : (
          <p className="text-lg text-slate-600">
            {isAiThinking ? '🤔 Gregorio sta pensando...' : isXNext ? '✨ Il tuo turno' : '⏳ Turno di Gregorio'}
          </p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {board.map((cell, idx) => {
          const isWinningCell = winningLine?.includes(idx);
          const isLastMoveCell = lastMove === idx;

          return (
            <motion.button
              key={idx}
              onClick={() => handleClick(idx)}
              disabled={cell || winner || !isXNext || isAiThinking}
              whileHover={!cell && !winner && isXNext && !isAiThinking ? { scale: 1.05 } : {}}
              className={`aspect-square border-2 flex items-center justify-center text-5xl
                rounded-lg transition-all duration-300
                ${isWinningCell ? 'bg-green-200 border-green-400' : 'bg-white dark:bg-gray-700 border-slate-300'}
                ${isLastMoveCell && !isWinningCell ? 'ring-2 ring-blue-400' : ''}
                ${cell || winner || !isXNext || isAiThinking ? 'cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              <AnimatePresence>
                {cell === 'X' && (
                  <motion.span
                    key="X"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-blue-600 font-bold"
                  >
                    X
                  </motion.span>
                )}
                {cell === 'O' && (
                  <motion.span
                    key="O"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    🚴
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      <div className="flex gap-3 justify-center">
        {winner && (
          <button
            onClick={resetGame}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Nuova partita
          </button>
        )}
        <button
          onClick={resetScores}
          className="px-6 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition font-medium"
        >
          Reset punteggio
        </button>
      </div>
    </div>
  );
}
