import React from 'react';

function GameOverScreen({ score, onRestart }) {
  return (
    <div>
      <h1>Game Over</h1>
      <p>Your score: {score}</p>
      <button onClick={onRestart}>Start Over</button>
    </div>
  );
}

export default GameOverScreen;
