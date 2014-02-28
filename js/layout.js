$(document).ready(function(){
	$(window).resize(function(){
		var pageHeight = $(window).height()
		$('#wrapper').css('height', pageHeight);
		$('#sidebar').css('height', pageHeight - 56);
		$('#side-menu').css('height', pageHeight - 61);
		$('#page-wrapper').css('height', pageHeight - 51);
		$('#map-canvas').css('height', pageHeight - 56);
		$('.listContainer').css('height', pageHeight - 99);
		$('.tabBox').css('height', pageHeight - 172);

		if ($(window).width() < 800) {
			$('.dropdown-menu').css('width', $(window).width());
		}
		else {
			$('.dropdown-menu').css('width', '400px');
		}
		if ($('#sidebar').hasClass("hideBar")) {
			if ($(window).width() < 1199) {
				$('#map-canvas').css('width', $(window).width() - 0);
			}
			else {
				$('#map-canvas').css('width', $(window).width() - 205);
			}
		}
		else {
			if ($(window).width() < 1199) {
				$('#map-canvas').css('width', $(window).width() - 505);
			}
			else {
				$('#map-canvas').css('width', $(window).width() - 705);
			}
		}
		if ($(window).width() < 1199) {
			$('#cbp-spmenu-s1').addClass('cbp-spmenu cbp-spmenu-vertical cbp-spmenu-left');
			$('#cbp-spmenu-s1').removeClass('navbar-static-side');
			$('#showLeftPush').css("display", "block");
			$("body").addClass("cbp-spmenu-push");
		}
		else {
			$('#cbp-spmenu-s1').addClass('navbar-static-side');
			$('#cbp-spmenu-s1').removeClass('cbp-spmenu cbp-spmenu-vertical cbp-spmenu-left');
			$('#showLeftPush').css("display", "none");
			$("body").removeClass("cbp-spmenu-push");
		 }
		 if ($(window).width() < 800) {
		 			$('#sidebar').css({marginLeft: '0'}, 800);
		}
	});
	$(".hideSide").click(function(){
		$('#sidebar').animate({marginLeft: '-101%'}, 800);
		$('#sidebar').addClass("hideBar");

		if ($(window).width() < 1199) {
			$('#map-canvas').css('width', $(window).width());
		}
		else {
			$('#map-canvas').css('width', $(window).width() - 205);
		}
		// now resize the map-canvas
		google.maps.event.trigger(map, 'resize');
	});
	$("#side-menu a").click(function(){
		var button = $(this)
		$("#side-menu a").removeClass("navSelected");
		$("#cbp-spmenu-s1").removeClass("cbp-spmenu-open");
		$(body).removeClass("cbp-spmenu-push-toright");
		$(this).addClass("navSelected");
		if ($('#sidebar').hasClass("hideBar")) {
			if ($(this).hasClass("fullWidth")) {

			$('#sidebar').css({marginLeft: '-0px'}, 800);
			}
			else {
			$('#sidebar').animate({marginLeft: '-0px'}, 800);
			}
			if ($(window).width() < 1199) {
					$('#map-canvas').css('width', $(window).width() - 505);
			}
			else {
					$('#map-canvas').css('width', $(window).width() - 705);
			}
			$('#sidebar').removeClass("hideBar");
		};
		
	
	});

	$(window).resize();

	var menuLeft = document.getElementById( 'cbp-spmenu-s1' ),
		showLeft = document.getElementById( 'showLeft' ),

	body = document.body;

	showLeftPush.onclick = function() {
		classie.toggle( this, 'active' );
		classie.toggle( body, 'cbp-spmenu-push-toright' );
		classie.toggle( menuLeft, 'cbp-spmenu-open' );
		disableOther( 'showLeftPush' );
	};

	function disableOther( button ) {
		if( button !== 'showLeftPush' ) {
			classie.toggle( showLeftPush, 'disabled' );
		}
	}
});