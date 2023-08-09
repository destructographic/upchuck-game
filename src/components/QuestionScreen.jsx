// QuestionsScreen.jsx

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementScore, setQuestion } from './slice';
import { getDrinkById } from './API';
import { getRandomDrinkName } from '../utils/gameLogic';
import { evaluateChoice } from '../utils/gameLogic';



function QuestionScreen() {
  const dispatch = useDispatch();
  const question = useSelector(state => state.game.currentQuestion);
  const [payload, setPayload] = useState(null);
  const [pickedChoice, setPickedChoice] = useState(null);

  useEffect(() => {
    if (question) {
      const newPayload = BuildQuestionPayload(question);
      setPayload(newPayload);
    }
  }, [question]);

  const handlePickedChoice = (choice) => {
    setPickedChoice(choice);
    // add logic to check the choice, update the score, etc
  };

  if (!payload) {
    return <div>Loading...</div>;
  }

  const { image, ingredients, choices } = payload;

  return (
    <div>
      <img src={image} alt="Cocktail Drink" />
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      {choices.map((choice, index) => (
        <button key={index} onClick={() => handlePickedChoice(choice)}>
          {choice}
        </button>
      ))}
    </div>
  );
}



function BuildQuestionPayload(drink) {
  console.log('Building question payload for drink:', drink);

  const { strDrink: correctAnswer, strDrinkThumb: image, idDrink: drinkId } = drink;
  const ingredients = [];

  for (let i = 1; i <= 15; i++) { // API spec allows for max  of 15 ingredients
    const ingredient = drink[`strIngredient${i}`];
    if (ingredient) {
      ingredients.push(ingredient);
    }
  }

  console.log('Extracted ingredients:', ingredients);

  const incorrectChoices = Array(3).fill(null).map(() => getRandomDrinkName(drinkId));
  const choices = [correctAnswer, ...incorrectChoices];
  const correctChoiceIndex = Math.floor(Math.random() * 4); // randomly assign correct answer to one of the choices
  choices.sort(() => Math.random() - 0.5); // shuffle the choices

  return {
    drinkId,
    image,
    ingredients,
    choices,
    correctChoiceIndex,
  };
}



const handlePickedChoice = (choice) => {
  setPickedChoice(choice);
  const result = evaluateChoice(choice, payload.correctChoice);
  // makes result.isCorrect and result.points available
};



export default QuestionScreen;
