class RecipeFinder {
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

  searchRecipes(ingredientData, query, recipes) {
    query = query.toLowerCase();
    return recipes.filter(recipe => {
      const recipeName = recipe.name.toLowerCase();
      const recipeIngredients = recipe.ingredients.map(ingredient => {
        let match = ingredientData.find(ingr => ingr.id === ingredient.id);
        return match.name.toLowerCase();
      });
      return recipeName.includes(query) || recipeIngredients.includes(query);
    });
  }
}

export default RecipeFinder;
