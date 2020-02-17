class Recipe {
  constructor(recipe) {
    this.id = recipe.id;
    this.image = recipe.image;
    this.ingredients = recipe.ingredients;
    this.instructions = recipe.instructions;
    this.name = recipe.name;
    this.tags = recipe.tags;
  }
  calculateCost(data) {
    const ingredientCosts = this.ingredients.map(ingredient => {
      let match = data.find(ingr => ingr.id === ingredient.id);
      return ingredient.quantity.amount * match.estimatedCostInCents;
    })
    const totalCost = ingredientCosts.reduce((total, cost) => {
      return total + cost;
    }, 0)
    const costInDollars = totalCost / 100;
    return `$${costInDollars}`
  }

}

export default Recipe;
