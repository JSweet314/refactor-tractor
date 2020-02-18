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
  let mockIngredientsData;

  beforeEach(function() {
    const mockUser = mockUsers.wcUsersData[0];
    const mockRecipe = mockRecipes.recipeData[0];
    user = new User(mockUser);
    recipe = new Recipe(mockRecipe);
    pantry = new Pantry(user.pantry);
    mockIngredientsData = mockIngredients.ingredientsData;
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

  it("should determine if has enough ingredients", function() {
    expect(pantry.hasEnoughIngredients(recipe)).to.equal(false);
  });

  it("should determine which ingredients user needs more of", function() {
    expect(
      pantry.findIngredientsNeeded(recipe, mockIngredientsData)
    ).to.deep.equal([
      { name: "wheat flour", amount: 2.5, unit: "c", cost: 142 },
      { name: "bicarbonate of soda", amount: -0.5, unit: "tsp", cost: 582 },
      { name: "eggs", amount: -1, unit: "large", cost: 472 },
      { name: "sucrose", amount: -0.5, unit: "c", cost: 902 },
      {
        name: "instant vanilla pudding",
        amount: -3,
        unit: "Tbsp",
        cost: 660
      },
      { name: "brown sugar", amount: -0.5, unit: "c", cost: 559 },
      { name: "salt", amount: -0.5, unit: "tsp", cost: 280 },
      { name: "fine sea salt", amount: -24, unit: "servings", cost: 528 },
      { name: "semi sweet chips", amount: -2, unit: "c", cost: 253 },
      { name: "unsalted butter", amount: -0.5, unit: "c", cost: 617 },
      { name: "vanilla", amount: -0.5, unit: "tsp", cost: 926 }
    ]);
  });

  it("should update its contents", function() {
    expect(pantry.updateIngredients()).to.equal();
  });
});
