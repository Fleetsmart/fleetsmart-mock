$(document).ready(function(){
	$("#vehiclesBox").css('display', 'block');

	$("#side-menu a").click(function() {
		$("#sidebar").css('display', 'block');
		$("#map-canvas").removeClass('showMap');
		if ($(this).hasClass("fullWidth")) {
			$("#sidebar").css({width: '100%'});
			$("#sidebar").addClass("full");
		}
		else {
			$("#sidebar").css({width: ''});
			$("#sidebar").removeClass("full");
		}
	});

	$(".mapLink a").click(function(){
		$("#sidebar").css('display', 'none');
		$("#map-canvas").addClass('showMap');
		google.maps.event.trigger(map, 'resize');
		$('#showLeftPush').removeClass("active");
	});

	$("#side-menu a").click(function() {
	$(".sideContainer").css('display', 'none');
});

	$("#vehicleNav").click(function() {
		$("#vehiclesBox").css('display', 'block');
	});

	$("#poiNav").click(function() {
		$("#poiBox").css('display', 'block');
	});

	$("#settingsNav").click(function() {
		$("#settingsBox").css('display', 'block');
	});

	$("#tabButton").click(function(){
		$("a").removeAttr("href");
		$("#tabs").toggleClass("showTabs");
	});
});

$( window ).resize(function() {
	if ($(window).width() > 800) {
		$("#sidebar").css('display', 'block');
		$("#map-canvas").removeClass('showMap');
	}



});