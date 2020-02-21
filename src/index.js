// libs
import $ from "jquery";

// components
import dom from "./domUpdates";
import { getRandomNumber } from "./lib/utils";
import User from "./classes/User";
import Recipe from "./classes/Recipe";

// css
import "./css/index.scss";

// images
import "./images/apple-logo.png";
import "./images/search.png";
import "./images/cookbook.png";
import "./images/seasoning.png";
import "./images/apple-logo-outline.png";
import "./images/chicken-parm.jpg";
import "./images/green-apples.jpg";
import "./images/pancakes.jpg";
import "./images/search.png";
import "./images/seasoning.png";

// globals
const base = "https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/";
const userEndpoint = "users/wcUsersData";
const ingredientEndpoint = "ingredients/ingredientsData";
const recipeEndpoint = "recipes/recipeData";
const randomUserId = getRandomNumber();
const state = {
  currentUser: null,
  recipes: null
};

// fetch user
const getUser = () => {
  return fetch(base + userEndpoint)
    .then(response => response.json())
    .then(data => data.wcUsersData[randomUserId])
    .catch(error => console.log(error.message));
};

// fetch recipes
const getRecipes = () => {
  return fetch(base + recipeEndpoint)
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.log(error.message));
};

const currentUser = getUser().then(user => {
  state.currentUser = new User(user);
  return state.currentUser;
});

currentUser.then(user => {
  const firstName = user.name.split(" ", 1);
  dom.displayWelcomeMsg(firstName);
});

const recipes = getRecipes().then(data => {
  const recipeInstances = data.recipeData.map(recipe => {
    return new Recipe(recipe);
  });
  state.recipes = recipeInstances;
  return state.recipes;
});

recipes
  .then(data => {
    dom.createCards(data);
    return data;
  })
  .then(data => {
    const tags = data.reduce((tags, recipe) => {
      tags.push(...recipe.tags);
      return tags;
    }, []);

    dom.renderTags(new Set(tags));
    dom.bindEvents(data);
    return data;
  });
