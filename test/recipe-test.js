import chai, { expect } from 'chai';
import Recipe from '../src/classes/Recipe';
import mockRecipes from '../data/mock-recipe-data';
import mockIngredients from "../data/mock-ingredient-data";


describe('Recipe', function() {
  let recipe;
  let recipeInfo;
  let ingredients;

  beforeEach(function() {
    recipeInfo = mockRecipes.recipeData[0];
    recipe = new Recipe(recipeInfo);
    ingredients = mockIngredients.ingredientsData;
  })

  it('is a function', function() {
    expect(Recipe).to.be.a('function');
  });

  it('should be an instance of Recipe', function() {
    expect(recipe).to.be.an.instanceof(Recipe);
  });

  it('should initialize with an id', function() {
    expect(recipe.id).to.eq(595736);
  });

  it('should initialize with an image', function() {
    expect(recipe.image).to.eq('https://spoonacular.com/recipeImages/595736-556x370.jpg');
  });

  it('should initialize with an array of ingredients', function() {
    const ingredient = {
      "id": 20081,
      "quantity": {
      "amount": 1.5,
      "unit": "c"
      }
    }
    expect(recipe.ingredients[0]).to.deep.eq(ingredient);
  });

  it('should initialize with instructions for the recipe', function() {
    expect(recipe.instructions).to.deep.eq([
    {
    "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
    "number": 1
    },
    {
    "instruction": "Add egg and vanilla and mix until combined.",
    "number": 2
    },
    {
    "instruction": "Add dry ingredients and mix on low just until incorporated. Stir in chocolate chips.Scoop the dough into 1,5 tablespoon size balls and place on a plate or sheet. Cover with saran wrap and chill at least 2 hours or overnight.When ready to bake, preheat oven to 350 degrees.",
    "number": 3
    },
    {
    "instruction": "Place the cookie dough balls into ungreased muffin pan. Sprinkle with sea salt.",
    "number": 4
    },
    {
    "instruction": "Bake for 9 to 10 minutes, or until you see the edges start to brown.",
    "number": 5
    },
    {
    "instruction": "Remove the pan from the oven and let sit for 10 minutes before removing onto a cooling rack.Top with ice cream and a drizzle of chocolate sauce.",
    "number": 6
    }
    ])
  });

  it('should initialize with a name', function() {
    expect(recipe.name).to.eq('Loaded Chocolate Chip Pudding Cookie Cups');
  });

  it('should initialize with recipe tags', function() {
    expect(recipe.tags).to.deep.eq([
    "antipasti",
    "starter",
    "snack",
    "appetizer",
    "antipasto",
    "hor d'oeuvre"
    ])
  });

  it('should calculate the total cost of all of the ingredients', function() {
    expect(recipe.calculateCost(ingredients)).to.eq('$177.76');
  });

  it('should throw an error if recipe calls for an ingredient that does not exist in the database', function() {
    ingredients = [];
    expect(recipe.calculateCost.bind(recipe, ingredients)).to.throw('Ingredient cost not found')
  })

  it('should be able to get recipe instructions', function() {
    expect(recipe.getInstructions()).to.deep.eq([
    {
    "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
    "number": 1
    },
    {
    "instruction": "Add egg and vanilla and mix until combined.",
    "number": 2
    },
    {
    "instruction": "Add dry ingredients and mix on low just until incorporated. Stir in chocolate chips.Scoop the dough into 1,5 tablespoon size balls and place on a plate or sheet. Cover with saran wrap and chill at least 2 hours or overnight.When ready to bake, preheat oven to 350 degrees.",
    "number": 3
    },
    {
    "instruction": "Place the cookie dough balls into ungreased muffin pan. Sprinkle with sea salt.",
    "number": 4
    },
    {
    "instruction": "Bake for 9 to 10 minutes, or until you see the edges start to brown.",
    "number": 5
    },
    {
    "instruction": "Remove the pan from the oven and let sit for 10 minutes before removing onto a cooling rack.Top with ice cream and a drizzle of chocolate sauce.",
    "number": 6
    }
    ])
  })
});
