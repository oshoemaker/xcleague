var regex = {
  lettersOnly: /^[a-zA-Z]+$/,
  numbersOnly: /^[0-9]+$/,
  containsLetters: /[a-zA-Z]/,
  containsNumber: /[0-9]/,
  containsCapital: /[A-Z]/,
  email: /^[0-9a-z_.+\-]+@(?:[0-9a-z\-]+\.)+[a-z0-9]+$/i,
  url: /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/
}

var validationObj = {
  first: (function() {
    var errors = [];
    var first = $('#first').val();
    
    if (first.length < 1) {
      errors.push('Please enter your first name');
    }
    
    if (!regex.lettersOnly.test(first)) {
      errors.push('Your name must contain only letters');
    }
    
    return errors;
  }),
  
  last: (function() {
    var errors = [];
    var last = $('#last').val();
    
    if (last.length < 1) {
      errors.push('Please enter your last name');
    }
    
    if (!regex.lettersOnly.test(last)) {
      errors.push('Your name must contain only letters');
    }
    
    return errors;
  }),
  
  email: (function() {
    var errors = [];
    var email = $('#email').val();
    
    if (!regex.email.test(email)) {
      errors.push('Please enter a valid email address');
    }
    
    return errors;
  }),
  
  phone: (function() {
    var errors = [];
    var phone = $('#phone').val();
    
    if (!regex.numbersOnly.test(phone)) {
      errors.push('Your phone number should be numbers only');
    }
    
    if (phone.length !== 10) {
      errors.push('Please enter a 10 digit phone number');
    }
    
    return errors;
  }),
  
  carrier: (function() {
    var errors = [];
    var carrier = $('#carrier').val();
    
    if (!regex.containsLetters.test(carrier)) {
      errors.push('Please select a carrier');
    }
    
    return errors;
  }),
  
  password: (function() {
    var errors = [];
    var password = $('#password').val();
    
    if (password.length < 8) {
      errors.push('Must contain 8 characters');
    }
    
    if (!regex.containsNumber.test(password)) {
      errors.push('Must contain a number');
    }
    
    if (!regex.containsCapital.test(password)) {
      errors.push('Must contain a capital');
    }
    
    return errors
  }),

  verifyPassword: (function() {
    var errors = [];
    
    var password = $('#password').val();
    var verifyPassword = $('#verifyPassword').val();
    
    if (password !== verifyPassword) {
      errors.push('Passwords must match');
    }
    
    return errors;
  }),
  
  type: (function() {
    var errors = [];
    var type = $('#type').val();
    
    if (!regex.lettersOnly.test(type)) {
      errors.push('Please select a type');
    }
    
    return errors;
  }),
  
  year: (function() {
    var type = $('#type').val();
    var year = $('#year').val();
    var errors = [];
  
    if (type === 'pilot') {
      return errors;
    }
    
    if (year.length === 0) {
      errors.push('Vehicle year required');
    }
    
    return errors;
  }),
  
  make: (function() {
    var type = $('#type').val();
    var make = $('#make').val();
    var errors = [];
    
    if (type === 'pilot') {
      return errors;
    }
    
    if (make.length === 0) {
      errors.push('Vehicle make required');
    }
    
    return errors;
  }),
  
  model: (function(){
    var type = $('#type').val();
    var model = $('#model').val();
    var errors = [];
    
    if (type === 'pilot') {
      return errors;
    }
    
    if (model.length === 0) {
      errors.push('Vehicle model required');
    }
    
    return errors;
  }),
  
  ushpaNumber: (function() {
    var errors = [];
    var ushpaNumber = $('#ushpaNumber').val();
    
    if (type === 'driver') {
      return errors;
    }
    
    if (!regex.numbersOnly.test(ushpaNumber) || ushpaNumber.length === 0) {
      errors.push('Please enter a valid USHPA number');
    }
    
    return errors;
  }),
  
  gpsUrl: (function() {
    var errors = [];
    var gpsUrl = $('#gpsUrl').val();
    
    if (type === 'driver') {
      return errors;
    }
    
    if (!regex.url.test(gpsUrl)) {
      errors.push('Please enter a valid URL');
    }
    
    return errors;
  }),
  
  emergencyName: (function() {
    var errors = [];
    var emergencyName = $('#emergencyName').val();
    
    if (type === 'driver') {
      return errors;
    }
    
    if (!regex.containsLetters.test(emergencyName)) {
      errors.push('Please enter an emergency contact');
    }
    
    return errors;
  }),
  
  emergencyPhone: (function() {
    var errors = [];
    var emergencyPhone = $('#emergencyPhone').val();
    
    if (!regex.numbersOnly.test(emergencyPhone)) {
      errors.push('Your number should be numbers only');
    }
    
    if (emergencyPhone.length !== 10) {
      errors.push('Please enter a 10 digit emergency hone number');
    }
    
    return errors;
  }),
  
  emergencyRelation: (function() {
    var errors = [];
    var emergencyRelation = $('#emergencyRelation').val();
    
    if (emergencyRelation.length === 0) {
      errors.push('Please add your relation to the contact');
    }
    
    return errors;
  }),
}

function getBasicUser() {
  
  var basic = {
    first: $('#first').val(),
    last: $('#last').val(),
    email: $('#email').val(),
    phone: $('#phone').val(),
    carrier: $('#carrier').val(),
    password: $('#password').val(),
    verifyPassword: $('#verifyPassword').val(),
    driver: false,
    pilot: false,
    type: $('#type').val()
  }  

  return basic;
}

function getPilotInfo() {
  var pilot = {
    ushpaNumber: $('#ushpaNumber').val(),
    rating: $('#rating').val(),
    gpsUrl: $('#gpsUrl').val(),
    emergencyName: $('#emergencyName').val(),
    emergencyPhone: $('#emergencyPhone').val(),
    emergencyRelation: $('#emergencyRelation').val(),
    bloodType: $('#bloodType').val(),
    insurance: $('#insurance').val()
  }
  
  return pilot;
}

function getDriverInfo() {
  var driver = {
    hasLicense: $('#hasLicense').prop('checked'),
    hasSmartphone: $('#hasSmartphone').prop('checked'),
    hasVehicle: $('#hasVehicle').prop('checked'),
    year: $('#year').val(),
    make: $('#model').val(),
    model: $('#model').val()
  }
  
  return driver;
}

function getFormData() {
  var type = $('#type').val();
  var user = getBasicUser();
  
  if (type === 'pilot') {
    var pilot = getPilotInfo();

    user.pilot = true;

    user = merge(user,pilot);
  }
  
  if (type === 'driver') {
    var driver = getDriverInfo();

    user.driver = true;

    user = merge(user,driver);
  }
  
  if (type === 'pilot_driver') {
    var pilot = getPilotInfo();
    var driver = getDriverInfo();
    
    user.pilot = true;
    user.driver = true;
    
    user = merge(user,pilot);
    user = merge(user,driver);
  }
  
  return user;
}

function userCreated() {
  $('#signupForm').fadeOut(500, function(){
    $('#userCreated').hide();
    $('#userCreated').removeClass('hidden');
    $('#userCreated').fadeIn(500);
  });
}

function userError(errors) {
  var errorsDiv = $('#errors-div')
  errorsDiv.html('<ul>');
  for (var i = 0; errors.length > i; i++) {
    errorsDiv.append('<li>' + errors[i] + '</li>');
  }
  
  $('#signupForm').fadeOut(500, function(){
    $('#userError').hide();
    $('#userError').removeClass('hidden');
    $('#userError').fadeIn(500);
    
  });
}

function tryAgain() {
  $('#userError').fadeOut(500, function(){
    $('#signupForm').fadeIn(500);
  });
}

function createUser(formData) {
  $.post( "/signup.json", formData, function(data) {
    if (data.success) {
      $('#submit-btn').removeAttr('disabled','');
      userCreated();
    } else {
      userError(data.errors)
    }
  }).fail(function() {
    
  });
}

function showFields() {
  var type = $('#type').val();
  console.log('Showing fields for type: ' + type)
  
  if (type === 'driver') {
    $('#pilot').addClass('hidden');
    $('#driver').removeClass('hidden');
    return
  }
  
  if (type === 'pilot') {
    $('#driver').addClass('hidden');
    $('#pilot').removeClass('hidden');
    return
  }
  
  if (type === 'pilot_driver') {
    $('#driver').removeClass('hidden');
    $('#pilot').removeClass('hidden');
    return
  }
}

function validate(id) {
  if (!validationObj[id]) {
    console.log('No validation check for: ' + id); 
    return;
  }
  
  var errors = validationObj[id]();
  console.log(errors);
  
  if (errors.length === 0) {
    $('#' + id).removeClass('input-warning');
    $('#' + id +'Warning').html('');
  }
  
  if (errors.length > 0) {
    $('#' + id).addClass('input-warning');
    
    var warningDiv = $('#' + id +'Warning')
    warningDiv.html('<ul>');
    
    for (var i = 0; i < errors.length; i++ ) {
      warningDiv.append('<li>' + errors[i] + '</li>')
    }
    
    warningDiv.append('</ul>');
  }

}

$(function() {

  var types = {
    pilot: "Pilot",
    driver: "Driver",
    pilot_driver: "Pilot & Driver" 
  }
  
  var $typeSelect = $('#type').selectize({
    create: true,
    sortField: 'text'
  });
  
  var $carrierSelect = $('#carrier').selectize({
    create: true,
    sortField: 'text'
  });
  
  var $ratingSelect = $('#rating').selectize({
    create: true,
    sortField: 'text'
  });
  
  var typeSelect = $typeSelect[0].selectize;
  var carrierSelect = $carrierSelect[0].selectize;
  var ratingSelect = $ratingSelect[0].selectize;
  
  Object.keys(types).forEach(function(key){
    typeSelect.addOption({
      value:key,
      text:types[key]
    });
  });
  
  typeSelect.on('change',function(){
    showFields();
  });
  
  $("input[type=text],input[type=password]").focusout(function() {
    validate(this.id);
  });
  
  $('input[type=text],input[type=password]').keyup(function() {
  
    if (!this.id) {
      return;
    }
    
    if ($('#' + this.id).val().length === 0) {
      return;
    }
    validate(this.id);
  });
  
  $('#hasVehicle').click(function() {
    var isChecked = $(this).prop('checked');
    
    if (isChecked) {
      $('#vehicleInfo').removeClass('hidden');
      return;
    }
    
    $('#vehicleInfo').addClass('hidden');
    
  });
  
  $('#terms-checkbox').click(function() {
    var isChecked = $(this).prop('checked');
    
    if (isChecked) {
      $('#submit-btn').removeAttr('disabled');
      return;
    }
    
    $('#submit-btn').attr('disabled','');
    
  });
  
  $('#try-again-btn').click(function() {
    tryAgain();
  });
  
  $('#submit-btn').click(function() {
    var userData = getFormData();
    createUser(userData);
  });
  
});