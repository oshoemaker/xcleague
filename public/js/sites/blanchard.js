$(document).ready(function() {
  var markers = {
    'Launch': {
      lat: 48.6094444,
      lng: -122.4261111
    },
    'LZ': {
      lat: 48.5927778,
      lng: -122.4208333
    }
  }
  
  var map = new GMaps({
    div: '#map',
    lat: 48.6094444,
    lng: -122.4261111,
    mapTypeId: google.maps.MapTypeId.TERRAIN 
  });
  
  
  var bounds = [];
  Object.keys(markers).forEach(function(name){
    var site = markers[name];
    
    var latlng = new google.maps.LatLng(site.lat, site.lng);
    bounds.push(latlng);
    
    map.addMarker({
      lat: site.lat,
      lng: site.lng,
      title: name,
      infoWindow: {
        content: '<p>' + name +'</p>'
      }
    });
  });
  
  map.fitLatLngBounds(bounds);
  
  getBlipspot('blipspotBlanchard.html', function(err,blipspot,date){
    var table = document.createElement('table');
    var tbody = document.createElement('tbody');
    table.setAttribute('id','blipTable');
    $(table).addClass('table table-striped');

    $(tbody).html(blipspot);
    $(table).html(tbody);

    cleanBlipspot(table);
    
    $('#blipspot').html(table);
    $('.blipDate').html(date)
  });
});