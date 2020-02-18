import $ from 'jquery';

const domUpdates = {
  displayWelcomeMsg: (firstName) => {
    $('#user-name').text(firstName)
  }

  
}

export default domUpdates;
