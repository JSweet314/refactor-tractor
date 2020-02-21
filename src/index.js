// ---------- libs ----------
import $ from "jquery";
import {
  getIngredients,
  getRandomNumber,
  getRecipes,
  getUser
} from "./lib/utils";

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
const recipeFinder = new RecipeFinder();
const randomUserId = getRandomNumber();
const state = {
  currentUser: null,
  recipes: null,
  ingredients: null
};

const users = getUser();
const recipes = getRecipes();
const ingredients = getIngredients();

// ---------- after all fetches complete ----------
Promise.all([users, recipes, ingredients]).then(data => {
  const user = new User(data[0].wcUsersData[randomUserId]);
  const recipes = data[1].recipeData.map(recipe => new Recipe(recipe));
  const ingredients = data[2].ingredientsData;

  state.currentUser = user;
  state.recipes = recipes;
  state.ingredients = ingredients;

  dom.displayWelcomeMsg(state);
  dom.createCards(state.recipes);
  dom.renderTags(state);
  dom.bindEvents(state);
});
