import RecipeFinder from "./RecipeFinder";

class Pantry extends RecipeFinder {
  constructor(contents) {
    super();
    this.contents = contents;
  }

  hasEnoughIngredients(recipe) {
    const pantryHasAllAndAmount = recipe.ingredients.every(ingredient => {
      return this.contents.contents.find(pantryIngredient => {
        return (
          pantryIngredient.ingredient === ingredient.id &&
          pantryIngredient.amount >= ingredient.quantity.amount
        );
      });
    });
    return pantryHasAllAndAmount;
  }

  findIngredientsNeeded(recipe, data) {
    const missingAmounts = recipe.ingredients.map(ingr => {
      const matched = this.contents.contents.find(
        cont => cont.ingredient === ingr.id
      );
      return {
        id: ingr.id,
        amount: !matched
          ? -ingr.quantity.amount
          : matched.amount - ingr.quantity.amount,
        unit: ingr.quantity.unit
      };
    });

    const namedIngredients = missingAmounts.map(ingredient => {
      let match = data.find(ingr => ingr.id === ingredient.id);
      return {
        name: match.name.toLowerCase(),
        amount: ingredient.amount,
        unit: ingredient.unit,
        cost: match.estimatedCostInCents
      };
    });
    return namedIngredients;
  }

  updateIngredients(ingredientID, amount, id) {
    const modification = {
      userID: id,
      ingredientID,
      ingredientModification: amount
    };
    const base = "https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/";
    const userEndpoint = "users/wcUsersData";
    window
      .fetch(base + userEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(modification)
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(err => console.log(err.message));
  }
}

export default Pantry;
