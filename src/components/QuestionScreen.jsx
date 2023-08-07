import React from 'react';

function QuestionScreen({ question, onAnswer }) {
  return (
    <div>
      <h1>{question.strDrink}</h1>
      <img src={question.strDrinkThumb} alt={question.strDrink} />
      <button onClick={() => onAnswer(true)}>True</button>
      <button onClick={() => onAnswer(false)}>False</button>
    </div>
  );
}

export default QuestionScreen;
