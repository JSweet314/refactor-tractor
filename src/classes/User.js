import Pantry from "./Pantry";

class User {
  constructor(user) {
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

  filterRecipes(searchTags, list) {
    if (!list.length) {
      throw new Error(`No recipes saved to ${list}`);
    }
    const filtered = [];
    list.forEach(recipe => {
      const inList = searchTags.every(tag => {
        return recipe.tags.includes(tag);
      });
      if (inList) {
        filtered.push(recipe);
      }
    });
    return filtered;
  }

  searchRecipes(data, query, list) {
    query = query.toLowerCase();
    return list.filter(recipe => {
      const recipeName = recipe.name.toLowerCase();
      const recipeIngredients = recipe.ingredients.map(ingredient => {
        let match = data.find(ingr => ingr.id === ingredient.id);
        return match.name.toLowerCase();
      });
      return recipeName.includes(query) || recipeIngredients.includes(query);
    });
  }
}

export default User;
