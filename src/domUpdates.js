import $ from 'jquery';

const dom = {
  displayWelcomeMsg: (firstName) => {
    $('#user-name').text(firstName)
  },

  displayPantry: (pantry) => {

  },

  createCards: (recipeData) => {
    recipeData.forEach(recipe => {
      const recipeCard = `
        <article class="recipe-card" id=${recipe.id}>
          <h3 maxlength="40">${recipe.name}</h3>
          <section class="card-photo-container">
            <img src=${recipe.image} class="card-photo-preview" alt="${recipe.name} recipe" title="${recipe.name} recipe">
            <p class="text">Click for Instructions</p>
          </section>
          <h4>${recipe.tags.join(', ')}</h4>
          <img src="../images/apple-logo-outline.png" alt="unfilled apple icon" class="card-apple-icon">
        </article>
      `
      $('main').append(recipeCard)
    });
  }
}

export default dom;
