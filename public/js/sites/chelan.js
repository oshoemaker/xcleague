$(document).ready(function() {
  var markers = {
    'Launch': {
      lat: 47.8056806,
      lng: -120.0377139
    },
    'Soccer Field LZ': {
      lat: 47.7982306,
      lng: -119.9855500
    },
    'Lone Pine LZ': {
      lat: 47.8273361,
      lng: -120.0506306
    }
  }
  
  var map = new GMaps({
    draggable: false,
    scrollwheel: false,
    panControl: false,
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
  
  getBlipspot('blipspotChelan.html', function(err,blipspot,date){
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