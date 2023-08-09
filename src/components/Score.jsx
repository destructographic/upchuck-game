// Score.jsx
import React from 'react';
import { useSelector } from 'react-redux';

function Score() {
  // score is stored in Redux as state.game.score
  const score = useSelector(state => state.game.score);

  return (
    <div className="score">
      <h3>Score: {score}</h3>
    </div>
  );
}

export default Score;
