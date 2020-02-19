import $ from "jquery";

const dom = {
  bindEvents(recipeData) {
    $(".filter-btn").on('click', function() {
      this.handleFilterClick(recipeData)
    })
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
      const filtered = recipeData.filter(recipe => {
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
      $('main').append(recipeCard);
    });
  },

  clearCards() {
    $('main').html('');
  },

  handleFilterClick(recipeData) {
    const selectedTags = dom.filterTags();
    console.log(selectedTags)
    const selectedRecipes = dom.filterRecipes(selectedTags, recipeData);
    console.log(selectedRecipes)
    dom.clearCards();
    dom.createCards(selectedRecipes);
  }
};

export default dom;
