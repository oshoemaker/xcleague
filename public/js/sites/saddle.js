$(document).ready(function() {
  var markers = {
    'Launch': {
      lat: 46.8175000,
      lng: -119.8750000
    },
    'LZ': {
      lat: 46.8291667,
      lng: -119.8725000
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
});