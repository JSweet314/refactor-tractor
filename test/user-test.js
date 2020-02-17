import { expect } from "chai";
import User from "../src/classes/User";
import data from "../data/users-data";

describe("User", function() {
  let user;

  beforeEach(function() {
    user = new User();
  });

  it("should be a an instance of User", function() {
    expect(user).to.be.an.instanceof(User);
  });

  it.skip("should initialize with a name", function() {
    expect(user.name).to.eq("Saige O'Kon");
  });

  it.skip("should initialize with an id", function() {
    expect(user.id).to.eq(1);
  });

  it.skip("should initialize with a pantry", function() {
    expect(user.pantry[0].ingredient).to.eq(11477);
  });

  it.skip("should initialize with an empty favoriteRecipes array", function() {
    expect(user.favoriteRecipes).to.deep.equal([]);
  });

  it.skip("should initialize with an empty recipesToCook array", function() {
    expect(user.recipesToCook).to.deep.equal([]);
  });

  it.skip("should be able to save a recipe to favoriteRecipes", function() {
    user.saveRecipe(recipe);
    expect(user.favoriteRecipes[0].name).to.equal("Chicken Parm");
  });

  it.skip("should be able to decide to cook a recipe", function() {
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
