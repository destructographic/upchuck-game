// API.js
import { loadDrinkIndex } from '../utils/gameLogic';
import axios from 'axios';



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



export function selectRandomDrink() {
  return loadDrinkIndex().then(drinkIndex => {
    const drinkIds = Object.keys(drinkIndex);
    console.log('Drink index length:', drinkIds.length);
    const randomIndex = Math.floor(Math.random() * drinkIds.length);
    const selectedDrinkId = drinkIds[randomIndex];
    console.log('Selected drink ID:', selectedDrinkId);
    return selectedDrinkId;
  });
}