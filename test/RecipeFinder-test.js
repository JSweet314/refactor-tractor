import chai, { expect } from 'chai';
import RecipeFinder from '../src/classes/RecipeFinder';
import Recipe from '../src/classes/Recipe';
import mockIngredients from '../data/mock-ingredient-data';
import mockRecipes from '../data/mock-recipe-data';

describe('RecipeFinder', function() {
  let ingredients;
  let recipes;
  let finder;
  let recipe;
  let recipe2;
  let recipe3;

  beforeEach(function() {
    ingredients = mockIngredients.ingredientsData;
    recipes = mockRecipes.recipeData;
    finder = new RecipeFinder();
    const mockRecipe = mockRecipes.recipeData[0];
    recipe = new Recipe(mockRecipe);
    const mockRecipe2 = mockRecipes.recipeData[1];
    recipe2 = new Recipe(mockRecipe2);
    const mockRecipe3 = mockRecipes.recipeData[2];
    recipe3 = new Recipe(mockRecipe3);
  });

  it('should be able to filter recipes by tag', function() {
    expect(finder.filterRecipes(['snack'], recipes)).to.deep.equal([
      recipe,
      recipe3
    ]);
  });

  it("should return an empty array if the tag doesn't match any favorite recipes", function() {
    expect(finder.filterRecipes(['cupcake'], recipes)).to.deep.equal([]);
  });

  it('should be able to filter recipes to cook by tag', function() {
    expect(finder.filterRecipes(['lunch'], recipes)).to.deep.equal([recipe2]);
  });

  it("should return an empty array if the tag doesn't match any recipes to cook", function() {
    expect(finder.filterRecipes(['italian'], recipes)).to.deep.equal([]);
  });

  it('should be able to search favorite recipes by name', function() {
    expect(
      finder.searchRecipes(ingredients, 'chocolate', recipes)
    ).to.deep.equal([recipe]);
  });

  it('should be able to search favorite recipes by ingredient', function() {
    //16124
    expect(
      finder.searchRecipes(ingredients, 'soy sauce', recipes)
    ).to.deep.equal([recipe2]);
  });

  it('should be able to search recipes to cook by name', function() {
    expect(finder.searchRecipes(ingredients, 'dijon', recipes)).to.deep.equal([
      recipe2
    ]);
  });

  it('should be able to search recipes to cook by ingredient', function() {
    // 2026
    expect(
      finder.searchRecipes(ingredients, 'onion powder', recipes)
    ).to.deep.equal([recipe3]);
  });
});
