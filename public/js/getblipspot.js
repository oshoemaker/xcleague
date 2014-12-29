var directions = [
  "N",
  "NNE",
  "NE",
  "ENE",
  "E",
  "ESE",
  "SE",
  "SSE",
  "S",
  "SSW",
  "SW",
  "WSW",
  "W",
  "WNW",
  "NW",
  "NNW",
  "N"
];

function getBlipspot(site,callback) {
  
  $.get('/blipspot/' + site, function(data) {
    if (data.success) {
      return callback(null, data.table, data.date);
    }
    
    callback('Could not get mm5 data');
  
  });
  
}

function cleanBlipspot(table) {
  $(table).find('tbody > tr:eq(0) > td:eq(0)').html('Time');
  $(table).find('tbody > tr:eq(1) > td:eq(0)').html('Wind Direction');
  $(table).find('tbody > tr:eq(2) > td:eq(0)').html('Surface Speed (Kt)');
  $(table).find('tbody > tr:eq(3) > td:eq(0)').html('Tree Top Speed (Kt)');
  $(table).find('tbody > tr:eq(4) > td:eq(0)').html('Up Velocity (FPM)');
  $(table).find('tbody > tr:eq(5) > td:eq(0)').html("Max Soar @ 1.1m/s");
  $(table).find('tbody > tr:eq(6) > td:eq(0)').html("Max Soar AGL");
  $(table).find('tbody > tr:eq(7) > td:eq(0)').html("Max Soar Clouds");

  $(table).find("tr").find('td:gt(12)').remove(); 
  
  $(table).find("tr.direction > td").each(function(i){
    var degreeString = $(this).html();
    
    if (i === 0) {
      $(this).html('Wind Direction');
      return true;
    }
    
    var direction = getDirection(degreeString);
    if (direction) {
      $(this).html(direction + '<br/>' + degreeString);
    }
  });
}

function getDirection(degreeString) {
  var degrees = parseInt(degreeString);
  var direction = directions[parseInt((degrees+11.25)/22.5)]
  return direction;
}