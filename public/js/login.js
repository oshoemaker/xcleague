var logger = debug('xcleague:login.js');

function getFormData() {
  var userData = {
    email: $('#email').val(),
    pass: $('#pass').val(),
    rememberme: $('#rememberme').val()
  };
  
  return userData;
}

function userError(errors) {
  var errorsDiv = $('#errors-div')
  errorsDiv.html('<ul>');
  for (var i = 0; errors.length > i; i++) {
    errorsDiv.append('<li>' + errors[i] + '</li>');
  }
}

function login() {
  disableSubmit();
  var formData = getFormData();
  
  logger('Posting to /login.json')
  
  $.post( "/login.json", formData, function(data) {
    logger('Received response: ');
    logger(data);
  
    if (!data.success) {
      enableSubmit();
      return userError(data.errors);
    }

    logger('Successfully logged in: ');
    logger(data);
    
    setToken(data.token);

  }).fail(function() {
  
    enableSubmit();
  });

}

function disableSubmit() {
  $('#submit-btn').attr('disabled','');
}

function enableSubmit() {
  $('#submit-btn').removeAttr('disabled');
}

function setToken(token) {
  logger('Setting token in local storage');
  window.sessionStorage.token = token;
}

$(function() {
  
  $('#submit-btn').click(function() {
    // Clear out the errors from before
    $('#errors-div').html('');
    
    // Get the form data
    var userData = getFormData();
    logger('The form data object: ');
    logger(userData);
    
    // Submit the form
    login(userData);
  });
  
});