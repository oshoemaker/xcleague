$(document).ready(function() {
 
  status('Choose a file :)');
  $('#igcFile').change(function(e){
    $('#uploadForm').submit();
  })
 
  $('#uploadForm').submit(function() {
    status('uploading the file ...');
    console.log(this);
    
    $(this).ajaxSubmit({                                                                                                                 
      error: function(xhr) {
		    status('Error: ' + xhr.status);
      },
      success: function(response) {
		    status('File uploaded!')
      }
	  });
 
	  // Have to stop the form from submitting and causing
	  // a page refresh - don't forget this                                                                                                                      
	  return false;
  });
 
  function status(message) {
	  $('#status').text(message);
  }
  
});