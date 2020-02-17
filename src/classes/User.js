class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.pantry = user.pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }

  addRecipe(recipe, list) {
    if (!this[list].includes(recipe)) {
      this[list].push(recipe);
    } else {
      throw new Error(`Recipe already in ${list}`);
    }
  }

  removeRecipe(recipe, list) {
    if (this[list].includes(recipe)) {
      const recipeIndex = this[list].indexOf(recipe);
      this[list].splice(recipeIndex, 1);
    } else {
      throw new Error(`Recipe doesn't exist in ${list}`);
    }
  }

  filterRecipes(tag) {

  }

  searchRecipes(query) {

  }


  // saveRecipe(recipe) {
  //   this.favoriteRecipes.push(recipe);
  // }
  //
  // removeRecipe(recipe) {
  //   let i = this.favoriteRecipes.indexOf(recipe);
  //   this.favoriteRecipes.splice(i, 1);
  // }
  //
  // decideToCook(recipe) {
  //   this.recipesToCook.push(recipe);
  // }
  // filterRecipes(type) {
  //   return this.favoriteRecipes.filter(recipe => recipe.type.includes(type));
  // }
  // searchForRecipe(keyword) {
  //   return this.favoriteRecipes.filter(recipe => recipe.name.includes(keyword) || recipe.ingredients.includes(keyword));
  // }
}

module.exports = User;
