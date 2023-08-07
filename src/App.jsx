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
    if (start) {
      // Load the first question when the start button is clicked
      getDrinkById('11007') // Replace '11007' with a random id from your data
        .then(drink => dispatch(setQuestion(drink)));
    }
  }, [dispatch, start]);

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
