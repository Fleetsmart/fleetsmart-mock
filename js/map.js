var map;
function initialize() {
	google.maps.visualRefresh = true;
	var mapOptions = {
	center: new google.maps.LatLng(53.551839, -2.634257),
	zoom: 16
};
map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);
}
google.maps.event.addDomListener(window, 'load', initialize);

