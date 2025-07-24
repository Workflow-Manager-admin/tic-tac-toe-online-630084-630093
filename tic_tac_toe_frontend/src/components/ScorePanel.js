import React from 'react';

const ScorePanel = ({ scores, currentPlayer, gameMode }) => {
  return (
    <div className="score-panel">
      <div className="score-item">
        <span className="player">Player X</span>
        <span className="score">{scores.X}</span>
      </div>
      <div className="score-item">
        <span className="player">Player {gameMode === 'ai' ? 'AI' : 'O'}</span>
        <span className="score">{scores.O}</span>
      </div>
      <div className="current-turn">
        Current Turn: {currentPlayer}
      </div>
    </div>
  );
};

export default ScorePanel;
