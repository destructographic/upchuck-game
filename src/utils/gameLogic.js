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
