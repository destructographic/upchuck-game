import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementScore, setQuestion } from './slice';
import { getDrinkById } from './API';



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




function BuildQuestionPayload(drink) {
  const { strDrink: correctAnswer, strDrinkThumb: image, idDrink: drinkId } = drink;
  const ingredients = [];

  for (let i = 1; i <= 15; i++) { // API spec allows for max  of 15 ingredients
    const ingredient = drink[`strIngredient${i}`];
    if (ingredient) {
      ingredients.push(ingredient);
    }
  }

  const choices = ['choiceA', 'choiceB', 'choiceC', 'choiceD'];
  const correctChoiceIndex = Math.floor(Math.random() * 4); // randomly assign correct answer to one of the choices
  choices[correctChoiceIndex] = correctAnswer;

  return {
    drinkId,
    image,
    ingredients,
    choices,
    correctChoiceIndex,
  };
}




export default QuestionScreen;
