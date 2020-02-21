const base = "https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/";
const userEndpoint = "users/wcUsersData";
const ingredientEndpoint = "ingredients/ingredientsData";
const recipeEndpoint = "recipes/recipeData";

export const getIngredients = () => {
  return fetch(base + ingredientEndpoint)
    .then(response => response.json())
    .catch(error => console.log(error.message));
};

export function getRandomNumber(min = 1, max = 49) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export const getRecipes = () => {
  return fetch(base + recipeEndpoint)
    .then(response => response.json())
    .catch(error => console.log(error.message));
};

export const getUser = () => {
  return fetch(base + userEndpoint)
    .then(response => response.json())
    .catch(error => console.log(error.message));
};
