import $ from "jquery";

const dom = {
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
  }
};

export default dom;
