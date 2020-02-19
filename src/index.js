// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';
import dom from './domUpdates';
import User from "./classes/User";
import Recipe from "./classes/Recipe";
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/index.scss';
import './css/variables.scss';


// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/apple-logo.png';
import './images/search.png';
import './images/cookbook.png';
import './images/seasoning.png';
import './images/apple-logo-outline.png';
import './images/chicken-parm.jpg';
import './images/green-apples.jpg';
import './images/pancakes.jpg';
import './images/search.png';
import './images/seasoning.png';

console.log('This is the JavaScript entry file - your code begins here.');

// globals
const base = "https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/";
const userEndpoint = "users/wcUsersData";
const ingredientEndpoint = "ingredients/ingredientsData";
const recipeEndpoint = "recipes/recipeData";
const randomUserId = getRandomNumber();

function getRandomNumber(min = 1, max = 49) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

// initial fetch of a random user
// returns a promise of the single user
const getUser = () => {
  return fetch(base + userEndpoint)
    .then(response => response.json())
    .then(data => data.wcUsersData[randomUserId])
    .catch(error => console.log(error.message));
};

const getRecipes = () => {
  return fetch(base + recipeEndpoint)
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.log(error.message));
};

// do stuff with the user in this callback
const currentUser = getUser()
  .then(user => new User(user))

currentUser
  .then(user => {
    const firstName = user.name.split(' ', 1);
    dom.displayWelcomeMsg(firstName)
  })

// do stuff with the recipes in this callback
const recipes = getRecipes();

recipes
  .then(data => {
    return data.recipeData.map(recipe => {
      return new Recipe(recipe);
    })
  })
  .then(data => {
    dom.createCards(data)
  })
