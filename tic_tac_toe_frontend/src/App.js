import React, { useState, useEffect } from 'react';
import './App.css';
import Board from './components/Board';
import ScorePanel from './components/ScorePanel';
import { calculateWinner, getAIMove, isDraw } from './utils/gameLogic';

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameMode, setGameMode] = useState('2player'); // '2player' or 'ai'
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'draw'

  useEffect(() => {
    if (gameMode === 'ai' && !xIsNext && gameStatus === 'playing') {
      // AI's turn
      const timeoutId = setTimeout(() => {
        const aiMove = getAIMove(squares);
        handleSquareClick(aiMove);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [xIsNext, gameMode, squares, gameStatus]);

  const handleSquareClick = (i) => {
    if (squares[i] || gameStatus !== 'playing') return;

    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);

    const winner = calculateWinner(newSquares);
    if (winner) {
      setScores(prev => ({
        ...prev,
        [winner]: prev[winner] + 1
      }));
      setGameStatus('won');
    } else if (isDraw(newSquares)) {
      setGameStatus('draw');
    } else {
      setXIsNext(!xIsNext);
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setGameStatus('playing');
  };

  const switchGameMode = () => {
    setGameMode(prev => prev === '2player' ? 'ai' : '2player');
    resetGame();
    setScores({ X: 0, O: 0 });
  };

  const status = gameStatus === 'won' 
    ? `Winner: ${xIsNext ? 'O' : 'X'}`
    : gameStatus === 'draw'
    ? "It's a draw!"
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="App">
      <div className="game-container">
        <h1>Tic Tac Toe</h1>
        
        <div className="game-mode-toggle">
          <button 
            className="mode-button"
            onClick={switchGameMode}
          >
            Mode: {gameMode === '2player' ? '2 Players' : 'vs AI'}
          </button>
        </div>

        <ScorePanel 
          scores={scores}
          currentPlayer={xIsNext ? 'X' : 'O'}
          gameMode={gameMode}
        />

        <Board squares={squares} onClick={handleSquareClick} />

        <div className="game-status">{status}</div>

        <button 
          className="reset-button"
          onClick={resetGame}
        >
          Reset Game
        </button>
      </div>
    </div>
  );
}

export default App;
