// ---------- libs ----------
import $ from "jquery";
import { getRandomNumber } from "./lib/utils";

// ---------- components ----------
import dom from "./domUpdates";
import User from "./classes/User";
import Recipe from "./classes/Recipe";
import RecipeFinder from "./classes/RecipeFinder";

// ---------- css ----------
import "./css/index.scss";

// ---------- images ----------
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

// ---------- globals ----------
const base = "https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/";
const userEndpoint = "users/wcUsersData";
const ingredientEndpoint = "ingredients/ingredientsData";
const recipeEndpoint = "recipes/recipeData";
const randomUserId = getRandomNumber();
const recipeFinder = new RecipeFinder();
const state = {
  currentUser: null,
  recipes: null,
  ingredients: null
};

// ---------- fetch user ----------
const getUser = () => {
  return fetch(base + userEndpoint)
    .then(response => response.json())
    .then(data => data.wcUsersData[randomUserId])
    .catch(error => console.log(error.message));
};

getUser()
  .then(user => {
    state.currentUser = new User(user);
    return state.currentUser;
  })
  .then(user => {
    const firstName = user.name.split(" ", 1);
    dom.displayWelcomeMsg(firstName);
  });

// ---------- fetch recipes ----------
const getRecipes = () => {
  return fetch(base + recipeEndpoint)
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.log(error.message));
};

getRecipes()
  .then(data => {
    const recipeInstances = data.recipeData.map(recipe => {
      return new Recipe(recipe);
    });
    state.recipes = recipeInstances;
    return state.recipes;
  })
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

// ---------- fetch ingredients ----------
const getIngredients = () => {
  return fetch(base + ingredientEndpoint)
    .then(response => response.json())
    .then(data => {
      state.ingredients = data.ingredientsData;
      return state.ingredients;
    })
    .catch(error => console.log(error.message));
};

getIngredients();

// event listener for search bar
// handler will invoke my recipeFinder methods
// it will take in query is the query
// the list is the recipes
// the data is the ingredients
