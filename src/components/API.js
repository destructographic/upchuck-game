import axios from 'axios';

export function getDrinkById(id) {
  return axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(response => response.data.drinks[0]);
}
