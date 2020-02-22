import $ from "jquery";

import {
  capitalize,
  getTags
} from "./lib/utils";

// openRecipeInfo()
// generateRecipeTitle()
// addRecipeImage()
// generateInstructions()
// exitRecipe()
// addToMyRecipes()
// Actually part of the pantry class
//

const dom = {
  bindEvents(state) {
    $(".filter-btn").on("click", null, state.recipes, dom.handleFilterClick);
    $('main').on('click', null, state, dom.handleRecipeCardClicks);
    $('.pantry-btn').on('click', null, state, dom.findPantryInfo);
    $("[data-hook='search--button']").on("click", dom.handleSearchButtonClick);
  },

  displayWelcomeMsg(state) {
    const firstName = state.currentUser.name.split(' ', 1);
    $('#user-name').text(firstName);
  },

  handleRecipeCardClicks(e) {
    if ($(e.target).hasClass('card-apple-icon') && $(e.target).hasClass('active')) {
      dom.removeFromFavorites(e);
    } else if ($(e.target).hasClass('card-apple-icon')) {
      dom.addToFavorites(e);
    } else if ($(e.target).attr('id') === 'exit-recipe-btn') {
      dom.exitRecipe();
    } else if ($(e.target).hasClass('card-photo-preview') || $(e.target).hasClass('text')) {
      dom.renderExpandedRecipeCard(e.data);
    }
  },

  toggleApple(e, action) {
    const imgEnd = action === 'remove' ? '-outline' : ''
    let cardId = parseInt($(e.target).parent('.recipe-card').attr('id'));
    let recipe = e.data.recipes.find(recipe => recipe.id === cardId);
    $(e.target).attr('src', `./images/apple-logo${imgEnd}.png`)
    $(e.target).toggleClass('active');
    return recipe;
  },

  addToFavorites(e) {
    let recipe = dom.toggleApple(e);
    e.data.currentUser.addRecipe(recipe, 'favoriteRecipes');
  },

  removeFromFavorites(e) {
    let recipe = dom.toggleApple(e, 'remove');
    e.data.currentUser.removeRecipe(recipe, 'favoriteRecipes');
  },

  renderExpandedRecipeCard(data) {
    $('.recipe-instructions').toggleClass('is-hidden');
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
        unit: ingredient.quantity.unit,
      };
    });
    let ingredients = matched.map(ingredient => `${capitalize(ingredient.name)} (${ingredient.amount} ${
      ingredient.unit})`);
    let instructions = recipe.getInstructions().map(instr => `<li>${instr.instruction}</li>`)
    let recipeHTML = `
      <button class="button button--close-recipe" id="exit-recipe-btn">X</button>
      <h3 id="recipe-title">${recipe.name}</h3>
      <h4>Ingredients</h4>
      <p>${ingredients.join(', ')}</p>
      <h4>Instructions</h4>
      <ol>${instructions.join('')}</ol>`;
    $('.recipe-instructions').html(recipeHTML);
    $('.recipe-instructions').before(`<section id='overlay'></div>`)
    $('#recipe-title').css('background-image', (`url(${recipe.image})`))
  },

  exitRecipe() {
    $('.recipe-instructions').toggleClass('is-hidden');
    $('#overlay').remove();
  },

  findPantryInfo(state) {
    state.data.currentUser.pantry.contents.forEach(item => {
      let itemInfo = state.data.ingredients.find(ingredient => {
        return item.ingredient === ingredient.id
      })
      console.log(itemInfo)
      // let itemInfo = item.ingredient === state.data.ingredients.id;
      // console.log(itemInfo)
      // let itemInfo = item.find(ingredient => {
      //   return ingredient.id === item.ingredient;
      });
      // let originalIngredient = pantryInfo.find(ingredient => {
      //   if (itemInfo) {
      //     return ingredient.name === itemInfo.name;
      //   }
      // });
      // if (itemInfo && originalIngredient) {
      //   originalIngredient.count += item.amount;
      // } else if (itemInfo) {
      //   pantryInfo.push({ name: itemInfo.name, count: item.amount });
      // }

    dom.renderPantry();
    // renderPantry(pantryInfo.sort((a, b) => a.name.localeCompare(b.name)));
  },

  renderPantry(pantry) {
    $('.drop-menu').toggleClass('is-hidden');
    // $('.pantry-list').html(`<li><input type="checkbox" class="pantry-checkbox" id="${ingredient.name}">
    // //       <label for="${ingredient.name}">${ingredient.name}, ${ingredient.count}</label></li>`);
    $('.pantry-list').html(`<li><input type="checkbox" class="pantry-checkbox" id="1">
    //       <label for="pizza">pizza, 2</label></li>`);
  },

  // renderPantry(pantry) {
  //   pantry.forEach(ingredient => {
  //     let ingredientHtml = `<li><input type="checkbox" class="pantry-checkbox" id="${ingredient.name}">
  //       <label for="${ingredient.name}">${ingredient.name}, ${ingredient.count}</label></li>`;
  //     document
  //       .querySelector(".pantry-list")
  //       .insertAdjacentHTML("beforeend", ingredientHtml);
  //   });
  // },

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
      const filtered = recipeData.data.filter(recipe => {
        return recipe.tags.includes(tag);
      });
      return [...list, ...filtered];
    }, []);

    return new Set(filteredRecipes);
  },

  createCards(recipeData) {
    recipeData.forEach(recipe => {
      const recipeCard = `
        <article class="recipe-card" id=${recipe.id}>
          <h3 maxlength="40">${recipe.name}</h3>
          <section class="card-photo-container">
            <img src=${recipe.image} class="card-photo-preview" alt="${
        recipe.name
      } recipe" title="${recipe.name} recipe">
            <p class="text">Click for Instructions</p>
          </section>
          <h4>${recipe.tags.join(", ")}</h4>
          <img src="../images/apple-logo-outline.png" alt="unfilled apple icon" class="card-apple-icon">
        </article>
      `;
      $("main").append(recipeCard);
    });
  },

  clearCards() {
    $("main").html("");
  },

  handleFilterClick(recipeData) {
    const selectedTags = $(dom.filterTags()).toArray();
    const tagIds = selectedTags.map(tag => tag.id);
    const selectedRecipes = dom.filterRecipes(tagIds, recipeData);
    dom.clearCards();
    dom.createCards(selectedRecipes);
  },

  handleSearchButtonClick(recipeData) {
    const query = $("[data-hook='input--search']").val();
    // const list =
  }
};

export default dom;
