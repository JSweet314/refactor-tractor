// libs
import $ from "jquery";
import { capitalize, getTags } from "./lib/utils";

// components
import Recipe from "./classes/Recipe";
import RecipeFinder from "./classes/RecipeFinder";

const dom = {
  init(state) {
    dom.displayWelcomeMsg(state);
    dom.createCards(state.recipes, state.currentUser);
    dom.renderTags(state);
    dom.bindEvents(state);
  },

  addToFavorites(e) {
    let recipe = dom.toggleApple(e);
    e.data.currentUser.addRecipe(recipe, "favoriteRecipes");
  },

  bindEvents(state) {
    $(".filter-btn").on("click", () => {
      dom.handleFilterClick(state);
    });
    $("main").on("click", () => {
      dom.handleRecipeCardClicks(state);
    });
    $("[data-hook='button--search']").on("click", e => {
      dom.handleSearchSubmit(e, state);
    });
    $("[data-hook='input--search']").on("submit", "#search", e => {
      dom.handleSearchSubmit(e, state);
    });
    $('[data-hook="button--show-all"]').on("click", e => {
      dom.handleShowAllClick(e, state);
    });
  },

  displayWelcomeMsg(state) {
    const firstName = state.currentUser.name.split(" ", 1);
    $("#user-name").text(firstName);
  },

  handleRecipeCardClicks(e) {
    if (
      $(e.target).hasClass("card-apple-icon") &&
      $(e.target).hasClass("active")
    ) {
      dom.removeFromFavorites(e);
    } else if ($(e.target).hasClass("card-apple-icon")) {
      dom.addToFavorites(e);
    } else if ($(e.target).attr("id") === "exit-recipe-btn") {
      dom.exitRecipe();
    } else if (
      $(e.target).hasClass("card-photo-preview") ||
      $(e.target).hasClass("text")
    ) {
      dom.renderExpandedRecipeCard(e.data);
    }
  },

  toggleApple(e, action) {
    const imgEnd = action === "remove" ? "-outline" : "";
    let cardId = parseInt(
      $(e.target)
        .parent(".recipe-card")
        .attr("id")
    );
    let recipe = e.data.recipes.find(recipe => recipe.id === cardId);
    $(e.target).attr("src", `./images/apple-logo${imgEnd}.png`);
    $(e.target).toggleClass("active");
    return recipe;
  },

  removeFromFavorites(e) {
    let recipe = dom.toggleApple(e, "remove");
    e.data.currentUser.removeRecipe(recipe, "favoriteRecipes");
  },

  matchRecipeIdWithName(e) {
    // event.path logs the path of the event from the most to least specific
    // The function below then finds the event in that group that has an id and
    // assigned that id to the recipe card
    let recipeId = parseInt(event.path.find(e => e.id).id);
    let recipe = data.recipes.find(recipe => recipe.id === recipeId);
    const matched = recipe.ingredients.map(ingredient => {
      let match = data.ingredients.find(ingr => ingr.id === ingredient.id);
      return {
        name: match.name,
        amount: ingredient.quantity.amount,
        unit: ingredient.quantity.unit
      };
    });
    return matched;
  },

  renderExpandedRecipeCard(data) {
    const matched = dom.matchRecipeIdWithName(e);
    $(".recipe-instructions").toggleClass("is-hidden");
    let ingredients = matched.map(
      ingredient =>
        `${capitalize(ingredient.name)} (${ingredient.amount} ${
          ingredient.unit
        })`
    );
    let instructions = recipe
      .getInstructions()
      .map(instr => `<li>${instr.instruction}</li>`);
    let recipeHTML = `
      <button class="button button--close-recipe" id="exit-recipe-btn">X</button>
      <h3 id="recipe-title">${recipe.name}</h3>
      <h4>Ingredients</h4>
      <p>${ingredients.join(", ")}</p>
      <h4>Instructions</h4>
      <ol>${instructions.join("")}</ol>`;
    $(".recipe-instructions").html(recipeHTML);
    $(".recipe-instructions").before(`<section id='overlay'></div>`);
    $("#recipe-title").css("background-image", `url(${recipe.image})`);
  },

  exitRecipe() {
    $(".recipe-instructions").toggleClass("is-hidden");
    $("#overlay").remove();
  },

  renderPantry(pantry) {},

  renderTags(state) {
    const tags = getTags(state);
    tags.forEach(tag => {
      const upperCaseTag = capitalize(tag);

      let tagHtml = `
        <li>
          <input type="checkbox" class="checked-tag" id="${tag}">
          <label for="${tag}">${upperCaseTag}</label>
        </li>
      `;
      $(".tag-list").append(tagHtml);
    });
  },

  filterTags() {
    return $(".checked-tag")
      .toArray()
      .filter(checkbox => {
        return $(checkbox).is(":checked");
      });
  },

  filterRecipes(selectedTags, recipeData) {
    const filteredRecipes = selectedTags.reduce((list, tag) => {
      const filtered = recipeData.filter(recipe => {
        return recipe.tags.includes(tag);
      });
      return [...list, ...filtered];
    }, []);

    return new Set(filteredRecipes);
  },

  createCards(recipeData, userData) {
    const favorites = userData.favoriteRecipes.map(
      recipe => new Recipe(recipe)
    );
    const favIds = favorites.map(recipe => recipe.id);
    recipeData.forEach(recipe => {
      const imgEnd = !favIds.includes(recipe.id) ? "-outline" : "";
      const recipeCard = `
        <article class="recipe-card" id=${recipe.id}>
          <h3 maxlength="40">${recipe.name}</h3>
          <section class="card-photo-container">
            <img src=${recipe.image}
                 class="card-photo-preview"
                 alt="${recipe.name} recipe"
                 title="${recipe.name} recipe">
            <p class="text">Click for Instructions</p>
          </section>
          <h4>${recipe.tags.join(", ")}</h4>
          <img src="../images/apple-logo${imgEnd}.png"
               alt="unfilled apple icon"
               class="card-apple-icon">
          </article>
          `;
      $("main").append(recipeCard);
    });
  },

  clearCards() {
    $("main").html("");
  },

  handleFilterClick(state) {
    const selectedTags = $(dom.filterTags()).toArray();
    const tagIds = selectedTags.map(tag => tag.id);
    const selectedRecipes = dom.filterRecipes(tagIds, state.recipes);
    dom.clearCards();
    dom.createCards(selectedRecipes, state.currentUser);
  },

  handleSearchSubmit(e, state) {
    e.preventDefault();
    const recipeFinder = new RecipeFinder();
    const query = $("[data-hook='input--search']").val();
    const queryResults = recipeFinder.searchRecipes(
      state.ingredients,
      query,
      state.recipes
    );

    dom.clearCards();
    dom.createCards(queryResults, state.currentUser);
    $("[data-hook='input--search']").val("");
  },

  handleShowAllClick(e, state) {
    dom.clearCards();
    dom.createCards(state.recipes, state.currentUser);
  }
};

export default dom;

// TODO move this method to the DOM? Was in Pantry
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
