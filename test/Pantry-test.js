import { expect } from "chai";
import User from "../src/classes/User";
import Pantry from "../src/classes/Pantry";
import Recipe from "../src/classes/Recipe";
import mockUsers from "../data/mock-user-data";
import mockRecipes from "../data/mock-recipe-data";
import mockIngredients from "../data/mock-ingredient-data";

describe("Pantry", function() {
  let user;
  let recipe;
  let pantry;
  let ingredients;

  beforeEach(function() {
    const mockUser = mockUsers.wcUsersData[0];
    const mockRecipe = mockRecipes.recipeData[0];
    user = new User(mockUser);
    recipe = new Recipe(mockRecipe);
    pantry = new Pantry(user.pantry);
    ingredients = mockIngredients.ingredientsData;
  });

  it("should be a function", function() {
    expect(Pantry).to.be.a("function");
  });

  it("should be an instance of Recipe", function() {
    expect(pantry).to.be.an.instanceof(Pantry);
  });

  it("should instantiate with contents", function() {
    expect(pantry.contents).to.deep.equal(user.pantry);
  });

  it("should", function() {});

  it("should", function() {});

  it("should", function() {});

  it("should", function() {});

  it("should", function() {});

  it("should", function() {});
});
