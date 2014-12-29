function getMm5(lat, lon, callback) {
  var date = new Date();
  
  var params = {
    date: getMm5DateString(date),
    type: 'skewt',
    domain: 'd3',
    height: 100,
    lat: lat,
    lon: lon,
    station: 'NA',
    hours: 12
  }
  
  $.get('/mm5', params, function(data) {
    if (data.success) {
      return callback(null,data.imgUrl);
    }
    
    callback('Could not get mm5 data');
  });
  
}

function getMm5DateString(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  
  return (year.toString() + month.toString() + day.toString() + '12');
}