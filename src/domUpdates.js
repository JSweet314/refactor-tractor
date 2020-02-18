import $ from 'jquery';

const dom = {
  displayWelcomeMsg: (firstName) => {
    $('#user-name').text(firstName)
  },

  displayPantry: (pantry) => {

  },

  createCards: () => {
    recipeData.forEach(recipe => {
      let recipeInfo = new Recipe(recipe);
      // let shortRecipeName = recipeInfo.name;
      // recipes.push(recipeInfo);
      // if (recipeInfo.name.length > 40) {
      //   shortRecipeName = recipeInfo.name.substring(0, 40) + "...";
      // }
      addToDom(recipeInfo, shortRecipeName);
    });
  }
}

export default dom;
