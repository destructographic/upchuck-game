import React from 'react';

function TitleScreen({ onStart }) {
  return (
    <div>
      <h1>Welcome to Upchuck!</h1>
      <button onClick={onStart}>Start Game</button>
    </div>
  );
}

export default TitleScreen;
