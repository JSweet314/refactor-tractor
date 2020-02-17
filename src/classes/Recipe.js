class Recipe {
  constructor(recipe) {
    this.id = recipe.id;
    this.image = recipe.image;
    this.ingredients = recipe.ingredients;
    this.instructions = recipe.instructions;
    this.name = recipe.name;
    this.tags = recipe.tags;
  }
  // could pass in ingredients parameter to use globally and find cost of missing ingredients as well
  calculateCost(data) {
    const ingredientCosts = this.ingredients.map(ingredient => {
      let match = data.find(ingr => ingr.id === ingredient.id);
      if (match) {
        return ingredient.quantity.amount * match.estimatedCostInCents;
      } else {
        throw new Error('Ingredient cost not found')
      }
    })
    const totalCost = ingredientCosts.reduce((total, cost) => {
      return total + cost;
    }, 0)
    const costInDollars = totalCost / 100;
    return `$${costInDollars}`
  }
  getInstructions() {
    return this.instructions;
  }
}

export default Recipe;
