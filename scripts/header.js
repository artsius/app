$(document).ready( function() {
	/* This loads our shared header and places the contents of this page inside it. */
	$("#header").load("/shared/header.html", function() {
		$("#this-page").detach().appendTo(".page-content");	// move page content inside the proper spot in layout
		componentHandler.upgradeDom();											// upgrade all loaded components to properly use MDL js
		$(".pagetitle").text("Artsius")
		controller.initPopup();
	});
	$("#search-btn").click(function() {
		$("#search-result").css({'visibility':'visible'});
	});
});

var controller = {

	/*	Init the popup
	 *
	 *	To show popup: $("dialog")[0].showModal(); */
	initPopup: function() {
		var dialog = document.querySelector('dialog');
		var showDialogButton = document.querySelector('#show-dialog');
		if (! dialog.showModal) {
			dialogPolyfill.registerDialog(dialog);
		}
		dialog.querySelector('.close').addEventListener('click', function() {
			dialog.close();
			controller.levelCheck();
		});
	},


	/*	Unlock an achievement. Shows the popup and sets needed user data.
	 * */
	achieve: function(ach, lvlStr) {
		var lvl = parseInt(lvlStr);
		var vals, exp;

		$("#popup-title").text("Achievement unlocked!");

		switch (ach) {
			case "visited":
				//if (userdata.get(ach) <= lvl) break;
				vals = [10, 20, 50, 100, 1000];										// visited profiles per achievement level
				exp = [20, 30, 40, 50, 100];											// exp per achievement level

				$("#popup-text").text("Sharp eye");
				$("#popup-desc").text("Visited " + vals[lvl] + " artist profiles.");
				break;

			default:
				console.log("UNDEFINED ACHIEVEMENT: "+ach);
				return;

		}

		userdata.set("exp", userdata.get("exp") + exp[lvl]);	// add exp
		userdata.set(ach, lvl);																// set achievement level
		$("dialog")[0].showModal();														// show achievement dialog
	},


	/*	Check for a levelup when user accepts the achievement.
	 * */
	levelCheck: function() {
		var current = userdata.get("exp");
		var level = userdata.get("level");
		var nextLvl = controller.levelFun(level + 1);

		if (current >= nextLvl) {
			level += 1;
			userdata.set("level", level);
			userdata.set("exp", current - nextLvl);

			$("#popup-title").text("Level up!");
			$("#popup-text").text("You have reached level " + level + "!");
			$("#popup-desc").text("Congratulations!");
			$("dialog")[0].showModal();														// show achievement dialog
		}
	},


	/*	Calculate exp needed for a given levelup.
	 * */
	levelFun: function(x) {
		return Math.round(10 * (Math.log(x) * 3 + (x / 10) + 10));
	}

}
