class Pantry {
  constructor(contents) {
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

    // TODO move this method to the DOM?
    // return namedIngredients.map(ingr => {
    //   if (ingr.amount < 0) {
    //     const message = `You need ${Math.abs(ingr.amount)} more ${
    //       ingr.unit
    //     } of ${ingr.name}.
    //     It will cost you $${(Math.abs(ingr.amount) * ingr.cost) / 100}`;
    //     console.log(message);
    //     return message;
    //   } else {
    //     const message = `You have plenty of ${ingr.name}`;
    //     console.log(message);
    //     return message;
    //   }
    // });
  }

  updateIngredients(ingredientID, amount) {
    // takes in an ingredient and an amount
      // {
      //   "userId": 50,
      //   "ingredientID": 123,
      //   "ingredientModification": 3
    const modification = {
        userId: user.id,
        ingredientID: ingredientID,
        ingredientModification: amount
      }
      const base = 'https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/';
      const userEndpoint = 'users/wcUsersData'
      fetch(base + userEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(modification)
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(err.message))
    }
  }

}

export default Pantry;

// "pantry": [
//   {
//     "ingredient": 11477,
//     "amount": 4
//   }
// ]

// ingredients": [
// {
//   "id": 20081,
//     "quantity": {
//     "amount": 1.5,
//       "unit": "c"
//   }
