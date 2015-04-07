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