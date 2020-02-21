import $ from "jquery";

const dom = {
  bindEvents(state) {
    $(".filter-btn").on("click", null, state.recipes, dom.handleFilterClick);

    $("[data-hook='search--button']").on("click", dom.handleSearchButtonClick);
  },

  displayWelcomeMsg(firstName) {
    $("#user-name").text(firstName);
  },

  renderPantry(pantry) {},

  renderTags(tags) {
    tags.forEach(tag => {
      const upperCaseTag = tag.charAt(0).toUpperCase() + tag.substring(1);

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
