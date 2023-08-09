// QuestionsScreen.jsx

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementScore, setQuestion } from './slice';
import { getDrinkById } from './API';
import { getRandomDrinkName } from '../utils/gameLogic';



function QuestionScreen() {
  const dispatch = useDispatch();
  const question = useSelector(state => state.game.currentQuestion);
  const [payload, setPayload] = useState(null);

  useEffect(() => {
    if (question) {
      const newPayload = BuildQuestionPayload(question);
      setPayload(newPayload);
    }
  }, [question]);

  if (!payload) {
    return <div>Loading...</div>;
  }

  const { image, ingredients, choices } = payload;

  return (
    <div>
      <img src={image} alt="Drink" />
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      {choices.map((choice, index) => (
        <button key={index}>{choice}</button>
      ))}
    </div>
  );
}

// async function BuildQuestionPayload(drink) {
//   const { strDrink: correctAnswer, strDrinkThumb: image, idDrink: drinkId } = drink;
//   const ingredients = [];

//   for (let i = 1; i <= 15; i++) { // API spec allows for max  of 15 ingredients
//     const ingredient = drink[`strIngredient${i}`];
//     if (ingredient) {
//       ingredients.push(ingredient);
//     }
//   }

//   const choices = Array(4).fill(null).map(() => getRandomDrinkName(drinkId));
//   const correctChoiceIndex = Math.floor(Math.random() * 4); // randomly assign correct answer to one of the choices
//   choices[correctChoiceIndex] = correctAnswer;

//   return {
//     drinkId,
//     image,
//     ingredients,
//     choices,
//     correctChoiceIndex,
//   };
// }



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


export default QuestionScreen;
