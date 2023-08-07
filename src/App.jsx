import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementScore, setQuestion, setGameOver } from './components/slice';
import { getDrinkById } from './components/API';
import TitleScreen from './components/TitleScreen';
import QuestionScreen from './components/QuestionScreen';
import GameOverScreen from './components/GameOverScreen';

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
      // TODO: add 'setScore' action to slice to update the score
      dispatch(setScore(score));
    }
  }, [dispatch]);

  useEffect(() => {
    if (start) {
      // load the first question when the start button clicked
      getDrinkById('11007') // Replace '11007' with a random id
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
    dispatch(setGameOver());
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
