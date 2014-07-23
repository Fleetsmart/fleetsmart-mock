

$(document).ready(function(){
	$(".selectReportbutton").click(function(e){
		e.preventDefault();
		$("#reportsBox").hide();
		$("#reportsBox2").show();
	});
	$(".selectVehicles li").click(function(e){
		e.preventDefault();
		if ( $(this).hasClass("active")) {
			$(this).removeClass("active");
		}
		else {
			$(this).addClass("active");
		}

	});
});