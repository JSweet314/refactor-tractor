import Pantry from "./Pantry";
import RecipeFinder from './RecipeFinder';


class User extends RecipeFinder {
  constructor(user) {
    super();
    this.id = user.id;
    this.name = user.name;
    this.pantry = new Pantry(user.pantry);
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }

  addRecipe(recipe, list) {
    if (!this[list].includes(recipe)) {
      this[list].push(recipe);
      localStorage.setItem(list, JSON.stringify(this[list]));
    } else {
      throw new Error(`Recipe already in ${list}`);
    }
  }

  removeRecipe(recipe, list) {
    if (this[list].includes(recipe)) {
      const recipeIndex = this[list].indexOf(recipe);
      this[list].splice(recipeIndex, 1);
      localStorage.setItem(list, JSON.stringify(this[list]));
    } else {
      throw new Error(`Recipe doesn't exist in ${list}`);
    }
  }
}

export default User;
