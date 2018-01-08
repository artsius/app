$(document).ready( function() {
	$("#level-holder").text("Level " + userdata.get("level"));
	$("#exp-text").text("exp: " + userdata.get("exp") + "/" + userdata.get("next_level"));

	var fullW = $("#exp-holder").width();
	var ratio = userdata.get("exp") / userdata.get("next_level");

	console.log(fullW);
	console.log(ratio);

	$("#exp-bar").css("width", fullW * ratio);
});
