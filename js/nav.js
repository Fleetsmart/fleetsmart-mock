$(document).ready(function(){
	$(".mapLink a").click(function(){
		$("#sidebar").css('display', 'none');
		$("#map-canvas").addClass('showMap');
		google.maps.event.trigger(map, 'resize');
		$('#showLeftPush').removeClass("active");
	});

	$("#side-menu a").click(function() {
		if ($(this).hasClass("fullWidth")) {
			$("#sidebar").css({width: '100%'});
			$("#sidebar").addClass("full");
		}
		else {
			$("#sidebar").css({width: ''});
			$("#sidebar").removeClass("full");
		}
	});
});
$( window ).resize(function() {
	if ($(window).width() > 800) {
		$("#sidebar").css('display', 'block');
		$("#map-canvas").removeClass('showMap');
	}

});