var mm5urls = {
  tiger: 'http://www.atmos.washington.edu/mm5rt/data/current_gfs/images_d3/ps07.09.0000.snd.gif',
  blanchard: 'http://www.atmos.washington.edu/mm5rt/data/current_gfs/images_d3/ps13.09.0000.snd.gif',
  saddle: 'http://www.atmos.washington.edu/mm5rt/data/current_gfs/images_d3/othll.09.0000.snd.gif',
  chelan: 'http://www.atmos.washington.edu/mm5rt/data/current_gfs/images_d3/drycr.09.0000.snd.gif'
}

function getMm5(url,requestedHour,callback) {
  var date = new Date();
  var hour = date.getHours();
  
  if (hour < 6) {
    return callback('tooEarly');
  }
  
  if (!requestedHour) {
    requestedHour = '09';
  }
  var newUrl = url.replace(/\.\d{2}\./,'.' + requestedHour + '.');
  
  callback(null,newUrl);
}

function getMm5Url() {
  var site = window.location.href.match(/sites\/(.*)\.html/)[1];
  var mm5url = mm5urls[site];
  return mm5url;
}

$(document).ready(function() {
  var mm5url = getMm5Url();
  
  var $mm5hour = $('#mm5hour').selectize({
    create: true
  });
  
  var mm5selectize = $mm5hour[0].selectize;
  
  var mm5hour = $('#mm5hour').val();
  
  getMm5(
    mm5url,
    mm5hour,
    function(err,imgUrl){
      if (err === 'tooEarly') {
        return 
      }
      
      $('#mm5').attr('src',imgUrl);
    }
  );
  
  mm5selectize.on('change', function() {
    var mm5hour = $('#mm5hour').val();
    
    getMm5(
      mm5url,
      mm5hour,
      function(err,imgUrl){
        if (err === 'tooEarly') {
          return 
        }
      
        $('#mm5').attr('src',imgUrl);
      }
    );
  });
});