// App.jsx

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementScore, setQuestion, setGameOver } from './components/slice';
import { getDrinkById, selectRandomDrink } from './components/API'; // import selectRandomDrink
import TitleScreen from './components/TitleScreen';
import QuestionScreen from './components/QuestionScreen';
import GameOverScreen from './components/GameOverScreen';

// dummy setScore function for now
const setScore = () => console.log('called setScore');

function App() {
  const dispatch = useDispatch();
  const score = useSelector(state => state.game.score);
  const currentQuestion = useSelector(state => state.game.currentQuestion);
  const gameOver = useSelector(state => state.game.gameOver);

  const [start, setStart] = useState(false);

  useEffect(() => {
    // load game state from local storage when component mounts
    const savedState = localStorage.getItem('gameState');
    if (savedState) {
      const { score, currentQuestion, gameOver, start } = JSON.parse(savedState);
      dispatch(setQuestion(currentQuestion));
      dispatch(setGameOver(gameOver));
      setStart(start);
      // call setScore (without dispatching an action for now)
      setScore(score);
    }
  }, [dispatch]);

  useEffect(() => {
    if (start) {
      // select a random drink ID and load the corresponding question
      selectRandomDrink()
        .then(id => getDrinkById(id))
        .then(drink => dispatch(setQuestion(drink)));
    }
  }, [dispatch, start]);
  
  

  useEffect(() => {
    // save game state to local storage on change
    const state = {
      score: score,
      currentQuestion: currentQuestion,
      gameOver: gameOver,
      start: start,
    };
    localStorage.setItem('gameState', JSON.stringify(state));
  }, [score, currentQuestion, gameOver, start]);

  const handleStart = () => {
    setStart(true);
  };

  const handleRestart = () => {
    // Reset the game
    setStart(false);
    dispatch(setGameOver(false));
  };

  if (gameOver) {
    return <GameOverScreen score={score} onRestart={handleRestart} />;
  } else if (start && currentQuestion) {
    return <QuestionScreen question={currentQuestion} />;
  } else {
    return <TitleScreen onStart={handleStart} />;
  }
}

export default App;
