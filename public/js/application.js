var map;
var service;
var infoWindow;

window.search_term = window.search_term || 'restaurant';

function initialize() {

	var myLatlng = new google.maps.LatLng(37.79221, -122.406141);
	var mapOptions = {
		zoom: 17,
		center: myLatlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	map = new google.maps.Map(document.getElementById("map-canvas"),
		mapOptions);

	var dbcString = '<div id="content">'+
    '<div id="siteNotice">'+
    '</div>'+
    '<h2 id="firstHeading" class="firstHeading">Dev Bootcamp</h2>'+
    '<div id="bodyContent">'+
    '<p><b>DBC</b>, the center of the Dev Bootcamp world.  North you\'ll' +
    'find the Chinatown YMCA, and food can be found in every direction.</p>'+
    '<p>Attribution: Uluru, <a href="http://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
    'http://en.wikipedia.org/w/index.php?title=Uluru</a> (last visited June 22, 2009).</p>'+
    '</div>'+
    '</div>';

	var dbcwindow = new google.maps.InfoWindow({
		content: dbcString
	});

	var image = '/images/dbc.png';
	var myLatLng = new google.maps.LatLng(37.79221, -122.406141);
	var dbcMarker = new google.maps.Marker({
		position: myLatLng,
		map: map,
		icon: image,
		title: "DBC"
	});

 	google.maps.event.addListener(dbcMarker, 'click', function() {
		dbcwindow.open(map, dbcMarker);
	});

	var image = '/images/ymca.png';
	var myLatLng = new google.maps.LatLng(37.7931187, -122.4068679);
	var ymcMarker = new google.maps.Marker({
		position: myLatLng,
		map: map,
		icon: image
	});

	var image = '/images/pigeon.png';
	var myLatLng = new google.maps.LatLng(37.7921253, -122.4051364);
	var pigMarker = new google.maps.Marker({
		position: myLatLng,
		map: map,
		icon: image
	});

	var image = '/images/pasilla.png';
	var myLatLng = new google.maps.LatLng(37.7915927, -122.4043076);
	var pasMarker = new google.maps.Marker({
		position: myLatLng,
		map: map,
		icon: image
	});

	var image = '/images/chipotle.png';
	var myLatLng = new google.maps.LatLng(37.789634, -122.404052);
	var chiMarker = new google.maps.Marker({
		position: myLatLng,
		map: map,
		icon: image
	});

	var image = '/images/cheesecake.png';
	var myLatLng = new google.maps.LatLng(37.7874978, -122.4074294);
	var cheMarker = new google.maps.Marker({
		position: myLatLng,
		map: map,
		icon: image
	});

	var image = '/images/murphys.png';
	var myLatLng = new google.maps.LatLng(37.7901451, -122.403993);
	var murMarker = new google.maps.Marker({
		position: myLatLng,
		map: map,
		icon: image
	});

	infoWindow = new google.maps.InfoWindow();
  service = new google.maps.places.PlacesService(map);

  google.maps.event.addListenerOnce(map, 'bounds_changed', performSearch);
}

function performSearch() {
  var request = {
    bounds: map.getBounds(),
    keyword: window.search_term
  };
  service.radarSearch(request, callback);
}

function callback(results, status) {
  if (status != google.maps.places.PlacesServiceStatus.OK) {
    alert(status);
    return;
  }
  for (var i = 0, result; result = results[i]; i++) {
    createMarker(result);
  }
}

function createMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: {
      // Star
      path: 'M 0,-24 6,-7 24,-7 10,4 15,21 0,11 -15,21 -10,4 -24,-7 -6,-7 z',
      fillColor: '#ffff00',
      fillOpacity: 1,
      scale: 1/4,
      strokeColor: '#bd8d2c',
      strokeWeight: 1
    }
  });

  google.maps.event.addListener(marker, 'click', function() {
    service.getDetails(place, function(result, status) {
      if (status != google.maps.places.PlacesServiceStatus.OK) {
        alert(status);
        return;
      }
      window.content = "<h1>"+result.name+"</h1>"
      if (result.photos) {
        $.each(result.photos, function(index, photo) {
          if (result.photos.length == 1) {
            window.content += "<img id='last-photo' src='"+photo.getUrl({'maxWidth': 350, 'maxHeight': 350})+"' />";
          } else if (index == (result.photos.length - 1)) {
            window.content += "<img id='last-photo' class='hidden' src='"+photo.getUrl({'maxWidth': 350, 'maxHeight': 350})+"' />";
          } else if (index == 0) {
            window.content += "<img id='image' class='first-photo' src='"+photo.getUrl({'maxWidth': 350, 'maxHeight': 350})+"' />";
          } else {
            window.content += "<img id='image' class='hidden' src='"+photo.getUrl({'maxWidth': 350, 'maxHeight': 350})+"' />";
          }
        });
      }
      infoWindow.setContent(window.content);
      infoWindow.open(map, marker);
    });
  });
}

$(document).ready(function() {
  $("#form").on("submit", function(e) {
    e.preventDefault();
    window.search_term = $("input[name='search_term']").val();
    initialize();
  });
});

$(document).on("click", "#image", function() {
    $(this).next(".hidden").removeClass("hidden");
    $(this).addClass("hidden");
});

google.maps.event.addDomListener(window, 'load', initialize);