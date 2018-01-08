$(document).ready( function() {
	$("#level-holder").text("Level " + userdata.get("level"));
	$("#exp-text").text("exp: " + userdata.get("exp") + "/" + userdata.get("next_level"));

	var fullW = $("#exp-holder").width();
	var ratio = userdata.get("exp") / userdata.get("next_level");

	$("#exp-bar").css("width", fullW * ratio);

	var icons = [	"/assets/unknown.svg",
								"/assets/ach-bronze.svg",
								"/assets/ach-silver.svg",
								"/assets/ach-gold.svg",
								"/assets/ach-diamond.svg",
								"/assets/ach-diamond.svg",
								"/assets/ach-diamond.svg"];

	var achNames = ["searched", "visited", "ordered", "messages", "unknown", "unknown", "unknown", "unknown", "unknown"];
	var achTitles = ["Nifty explorer", "Sharp eye", "Craft scavenger", "Chatty Cathy", "Hidden", "Hidden", "Hidden", "Hidden", "Hidden"];

	achievs = [];
	var achCount = achNames.length;
	for (var i = 0; i < achCount; i++) {
		achievs[i] = $("#achiev").clone();
		achievs[i].css("display", "block");

		var achLevel = parseInt(userdata.get(achNames[i]));
		if (achLevel >= icons.length) achLevel = icons.length - 1;

		if (achLevel > 0) achievs[i].find(".ach-text").removeClass("ach-locked");

		achievs[i].find(".ach-icon").attr("src", icons[achLevel]);
		achievs[i].find(".ach-title").text(achTitles[i] + " (" + achLevel + ")");

		var achText, scores;
		if (achLevel == 0) {
			achText = "Explore around to uncover this achievement.";
		} else {
			switch (achNames[i]) {
				case "searched":	scores = [0, 10, 20, 50, 100, 500, 1000];
													achText = "You have made " + scores[achLevel] + " searches."
													break;

				case "visited":		scores = [0, 10, 20, 50, 100, 500, 1000];
													achText = "You have visited the profiles of " + scores[achLevel] + " artists."
													break;

				case "ordered":		scores = userdata.get("cnt_ordered");
													achText = "You have ordered " + scores + " works of art."
													break;

				case "messages":	scores = [0, 10, 20, 50, 100, 500, 1000];
													achText = "You have sent " + scores[achLevel] + " messages."
													break;

				default: 					achText = "Explore around to uncover this achievement."
													break;
			}
		}

		achievs[i].find(".ach-content").text(achText);


		achievs[i].appendTo("#achiev-holder")

		if (i < achCount - 1) {
			var spacer = $("#spacer").clone();
			spacer.css("display", "block");
			spacer.appendTo("#achiev-holder");
		}
	}


});
