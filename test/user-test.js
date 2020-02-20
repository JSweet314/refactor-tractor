import chai, { expect } from 'chai';
import spies from 'chai-spies';
import User from "../src/classes/User";
import Recipe from "../src/classes/Recipe";
import Pantry from "../src/classes/Pantry";
import mockUsers from "../data/mock-user-data";
import mockRecipes from "../data/mock-recipe-data";
import mockIngredients from "../data/mock-ingredient-data";

chai.use(spies);

describe("User", function() {
  let user;
  let recipe;
  let recipe2;
  let recipe3;
  let ingredients;

  beforeEach(function() {
    const mockUser = mockUsers.wcUsersData[0];
    user = new User(mockUser);
    const mockRecipe = mockRecipes.recipeData[0];
    recipe = new Recipe(mockRecipe);
    const mockRecipe2 = mockRecipes.recipeData[1];
    recipe2 = new Recipe(mockRecipe2);
    const mockRecipe3 = mockRecipes.recipeData[2];
    recipe3 = new Recipe(mockRecipe3);
    ingredients = mockIngredients.ingredientsData;
    global.localStorage = {};
    chai.spy.on(localStorage, ['setItem', 'getItem'], () => {})
  });

  it("should be a function", function() {
    expect(User).to.be.a("function");
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
    expect(user.pantry).to.be.an.instanceof(Pantry);
    expect(user.pantry.contents[0].ingredient).to.eq(11477);
  });

  it("should initialize with an empty favoriteRecipes array", function() {
    expect(user.favoriteRecipes).to.deep.equal([]);
  });

  it("should initialize with an empty recipesToCook array", function() {
    expect(user.recipesToCook).to.deep.equal([]);
  });

  describe("add and remove recipes", function() {
    it("should be able to save a recipe to favoriteRecipes", function() {
      user.addRecipe(recipe, "favoriteRecipes");
      expect(localStorage.setItem).to.be.called(1);
      expect(localStorage.setItem).to.be.called.with('favoriteRecipes', JSON.stringify(user.favoriteRecipes));
      expect(user.favoriteRecipes[0].id).to.equal(595736);
    });

    it("shouldn't be able to save recipe to favorites if it has already been saved", function() {
      user.addRecipe(recipe, "favoriteRecipes");
      expect(user.favoriteRecipes[0].id).to.equal(595736);
      expect(user.addRecipe.bind(user, recipe, "favoriteRecipes")).to.throw(
        "Recipe already in favoriteRecipes"
      );
      expect(user.favoriteRecipes.length).to.equal(1);
    });

    it("should be able to add recipes to cook", function() {
      user.addRecipe(recipe, "recipesToCook");
      expect(localStorage.setItem).to.be.called(1);
      expect(localStorage.setItem).to.be.called.with('recipesToCook', JSON.stringify(user.recipesToCook));
      expect(user.recipesToCook[0].id).to.equal(595736);
    });

    it("shouldn't be able to save recipe to cook it has already been saved", function() {
      user.addRecipe(recipe, "recipesToCook");
      expect(user.recipesToCook[0].id).to.equal(595736);
      expect(user.addRecipe.bind(user, recipe, "recipesToCook")).to.throw(
        "Recipe already in recipesToCook"
      );
      expect(user.recipesToCook.length).to.equal(1);
    });

    it("should be able to remove a recipe from favoriteRecipes", function() {
      user.addRecipe(recipe, "favoriteRecipes");
      expect(user.favoriteRecipes[0].id).to.equal(595736);
      user.removeRecipe(recipe, "favoriteRecipes");
      expect(localStorage.setItem).to.be.called(2);
      expect(localStorage.setItem).to.be.called.with('favoriteRecipes', JSON.stringify(user.favoriteRecipes))
      expect(user.favoriteRecipes.length).to.equal(0);
    });

    it("shouldn't be able to remove recipe from favorites if doesn't exist", function() {
      expect(user.removeRecipe.bind(user, recipe, "favoriteRecipes")).to.throw(
        `Recipe doesn't exist in favoriteRecipes`
      );
      expect(user.favoriteRecipes.length).to.equal(0);
    });

    it("should be able to remove recipes to cook", function() {
      user.addRecipe(recipe, "recipesToCook");
      expect(user.recipesToCook[0].id).to.equal(595736);
      user.removeRecipe(recipe, "recipesToCook");
      expect(localStorage.setItem).to.be.called(2);
      expect(localStorage.setItem).to.be.called.with('recipesToCook', JSON.stringify(user.recipesToCook))
      expect(user.recipesToCook.length).to.equal(0);
    });

    it("shouldn't be able to remove recipe to cook if it doesn't exist", function() {
      expect(user.removeRecipe.bind(user, recipe, "recipesToCook")).to.throw(
        `Recipe doesn't exist in recipesToCook`
      );
      expect(user.recipesToCook.length).to.equal(0);
    });
  });

  it("should be able to filter favorite recipes by tag", function() {
    user.addRecipe(recipe, "favoriteRecipes");
    user.addRecipe(recipe2, "favoriteRecipes");
    user.addRecipe(recipe3, "favoriteRecipes");
    expect(user.filterRecipes(["snack"], user.favoriteRecipes)).to.deep.equal([
      recipe,
      recipe3
    ]);
  });

  it("should return an empty array if the tag doesn't match any favorite recipes", function() {
    user.addRecipe(recipe, "favoriteRecipes");
    expect(user.filterRecipes(["cupcake"], user.favoriteRecipes)).to.deep.equal(
      []
    );
  });

  it("should be able to filter recipes to cook by tag", function() {
    user.addRecipe(recipe, "recipesToCook");
    user.addRecipe(recipe2, "recipesToCook");
    user.addRecipe(recipe3, "recipesToCook");
    expect(user.filterRecipes(["lunch"], user.recipesToCook)).to.deep.equal([
      recipe2
    ]);
  });

  it("should return an empty array if the tag doesn't match any recipes to cook", function() {
    user.addRecipe(recipe, "recipesToCook");
    expect(user.filterRecipes(["italian"], user.recipesToCook)).to.deep.equal(
      []
    );
  });

  it("should be able to search favorite recipes by name", function() {
    user.addRecipe(recipe, "favoriteRecipes");
    user.addRecipe(recipe2, "favoriteRecipes");
    user.addRecipe(recipe3, "favoriteRecipes");
    expect(
      user.searchRecipes(ingredients, "chocolate", user.favoriteRecipes)
    ).to.deep.equal([recipe]);
  });

  it("should be able to search favorite recipes by ingredient", function() {
    user.addRecipe(recipe, "favoriteRecipes");
    user.addRecipe(recipe2, "favoriteRecipes");
    user.addRecipe(recipe3, "favoriteRecipes");
    //16124
    expect(
      user.searchRecipes(ingredients, "soy sauce", user.favoriteRecipes)
    ).to.deep.equal([recipe2]);
  });

  it("should be able to search recipes to cook by name", function() {
    user.addRecipe(recipe, "recipesToCook");
    user.addRecipe(recipe2, "recipesToCook");
    user.addRecipe(recipe3, "recipesToCook");
    expect(
      user.searchRecipes(ingredients, "dijon", user.recipesToCook)
    ).to.deep.equal([recipe2]);
  });

  it("should be able to search recipes to cook by ingredient", function() {
    user.addRecipe(recipe, "recipesToCook");
    user.addRecipe(recipe2, "recipesToCook");
    user.addRecipe(recipe3, "recipesToCook");
    // 2026
    expect(
      user.searchRecipes(ingredients, "onion powder", user.recipesToCook)
    ).to.deep.equal([recipe3]);
  });
});
