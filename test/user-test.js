import { expect } from "chai";
import User from "../src/classes/User";
import Recipe from "../src/classes/Recipe";
import mockUsers from "../data/mock-user-data";
import mockRecipes from "../data/mock-recipe-data";

describe("User", function() {
  let user;
  let recipe;

  beforeEach(function() {
    const mockUser = mockUsers.wcUsersData[0];
    user = new User(mockUser);
    const mockRecipe = mockRecipes.recipeData[0];
    recipe = new Recipe(mockRecipe)
  });

  it("should be a function", function() {
    expect(User).to.be.a('function');
  });

  it("should be a an instance of User", function() {
    expect(user).to.be.an.instanceof(User);
  });

  it("should initialize with an id", function() {
    expect(user.id).to.eq(1);
  });

  it("should initialize with a name", function() {
    expect(user.name).to.eq("Saige O'Kon");
  });

  it("should initialize with a pantry", function() {
    expect(user.pantry[0].ingredient).to.eq(11477);
  });

  it("should initialize with an empty favoriteRecipes array", function() {
    expect(user.favoriteRecipes).to.deep.equal([]);
  });

  it("should initialize with an empty recipesToCook array", function() {
    expect(user.recipesToCook).to.deep.equal([]);
  });

  it("should be able to save a recipe to favoriteRecipes", function() {
    user.addFavoriteRecipe(recipe);
    expect(user.favoriteRecipes[0].id).to.equal(595736);
  });

  it("shouldn't be able to save recipe if it has already been saved", function() {
    user.addFavoriteRecipe(recipe);
    expect(user.favoriteRecipes[0].id).to.equal(595736);
    expect(user.addFavoriteRecipe.bind(user, recipe)).to.throw(new Error('Recipe already in favorites'))
    expect(user.favoriteRecipes.length).to.equal(1);
  });

  it("should be able to decide to cook a recipe", function() {
    user.decideToCook(recipe);
    // expect(user.recipesToCook[0].name).to.equal("Chicken Parm");
  });

  it.skip("should be able to filter recipes by type", function() {
    user.saveRecipe(recipe);
    expect(user.filterRecipes("italian")).to.deep.equal([recipe]);
  });

  it.skip("should be able to search recipes by name", function() {
    user.saveRecipe(recipe);
    expect(user.searchForRecipe("Chicken Parm")).to.deep.equal([recipe]);
  });
});
