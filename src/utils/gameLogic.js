// gameLogic.js

let drinkIndex = null;

export function loadDrinkIndex() {
  if (drinkIndex) {
    // if drinkIndex is already loaded, return it
    return Promise.resolve(drinkIndex);
  } else {
    // otherwise, fetch it
    return fetch('/data/drink_index.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        drinkIndex = data;
        console.log('Number of items loaded:', Object.keys(drinkIndex).length);
        return drinkIndex;
      });
  }
}



export function getRandomDrinkName(excludeId) {
  let drinkIds = Object.keys(drinkIndex);
  // exclude the provided ID
  drinkIds = drinkIds.filter(id => id !== excludeId);
  const randomIndex = Math.floor(Math.random() * drinkIds.length);
  return drinkIndex[drinkIds[randomIndex]].strDrink;
}



export function evaluateChoice(pickedChoice, correctChoice) {
  if (pickedChoice === correctChoice) {
    // choice was correct. calculate points, bonus, etc.
    return {
      isCorrect: true,
      points: 10, // replace with more sophisticated logic.
    };
  } else {
    // choice was incorrect.
    return {
      isCorrect: false,
      points: 0,
    };
  }
}
