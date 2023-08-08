import axios from 'axios';
// import drinkIndex from '../data/drink_index.json';

export function getDrinkById(id) {
  console.log('Requested ID:', id);
  return axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(response => {
      if (!response.data.drinks) {
        console.error('API response:', response.data);
        throw new Error('API response does not contain drinks');
      }
      return response.data.drinks[0];
    });
}



export async function selectRandomDrink() {
  try {
    const response = await fetch('/data/drink_index.json');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const drinkIndex = await response.json();

    if (!drinkIndex) {
      console.error('Fetch response:', response);
      throw new Error('Fetch response does not contain data');
    }

    const drinkIds = Object.keys(drinkIndex);
    console.log('Drink index length:', drinkIds.length);
    const randomIndex = Math.floor(Math.random() * drinkIds.length);
    const selectedDrinkId = drinkIds[randomIndex];
    console.log('Selected drink ID:', selectedDrinkId);
    return selectedDrinkId;
  } catch (error) {
    console.log('There was a problem with the fetch operation: ' + error.message);
  }
}
