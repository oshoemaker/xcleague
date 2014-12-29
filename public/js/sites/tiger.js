$(document).ready(function() {
  var markers = {
    'North Launch': {
      lat: 47.499722,
      lng: -122.0085278
    },
    'South Launch': {
      lat: 47.4966667,
      lng: -122.0105556
    },
    'LZ': {
      lat: 47.5004444,
      lng: -122.0219722
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

  getMm5(
    markers['North Launch'].lat,
    markers['North Launch'].lng, 
    function(err,imgUrl){
      if (err) {
        return 
      }
      
      $('#mm5').attr('src',imgUrl);
    }
  );
  
  getBlipspot('blipspotTiger.html', function(err,blipspot,date){
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