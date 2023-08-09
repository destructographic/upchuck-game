# [Upchuck](https://relaxed-cucurucho-b5a234.netlify.app/)

Upchuck is a cocktail-themed quiz game that challenges players to identify drinks based on their image and ingredients. The game is built using React and leverages the [TheCocktailDB API](https://www.thecocktaildb.com) to fetch drink details.

## Features

### Random Drink Selection
The game selects a random drink from a local JSON file (`drink_index.json`) that contains a list of drink IDs and names. The selected drink ID is then used to fetch detailed information about the drink from TheCocktailDB API.

### Question Generation
For each question, the game displays an image of the drink and a list of its ingredients. The player is presented with four multiple-choice options to identify the correct name of the drink. Three of the choices are randomly selected incorrect answers from the local drink index, ensuring that they are not the same as the correct answer.

### Answer Evaluation
When a player selects an answer, the game evaluates the choice to determine if it's correct or incorrect. The evaluation logic is separated into a utility module (`gameLogic.js`) to keep the codebase clean and maintainable.

### Future Enhancements
The current version of the game sets the foundation for additional features, such as scoring, bonus points, and more.

## Development
The project is developed using Vite, and it follows best practices for code organization and separation of concerns.

## How to Run
[Deployed on Netlify](https://relaxed-cucurucho-b5a234.netlify.app/)

## License
tbd