import {
  BASE,
  USER_ENDPOINT,
  RECIPE_ENDPOINT,
  INGREDIENT_ENDPOINT
} from "../constants/constants";

export const capitalize = elem => {
  return elem.charAt(0).toUpperCase() + elem.substring(1);
};

export const getIngredients = () => {
  return fetch(BASE + INGREDIENT_ENDPOINT)
    .then(response => response.json())
    .catch(error => console.log(error.message));
};

export function getRandomNumber(min = 1, max = 49) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export const getRecipes = () => {
  return fetch(BASE + RECIPE_ENDPOINT)
    .then(response => response.json())
    .catch(error => console.log(error.message));
};

export const getUser = () => {
  return fetch(BASE + USER_ENDPOINT)
    .then(response => response.json())
    .catch(error => console.log(error.message));
};

export const getTags = state => {
  const tags = state.recipes.reduce((tags, recipe) => {
    tags.push(...recipe.tags);
    return tags;
  }, []);

  return new Set(tags);
};
