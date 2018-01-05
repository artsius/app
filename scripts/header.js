$(document).ready( function() {
	/* This loads our shared header and places the contents of this page inside it. */
	$("#header").load("/shared/header.html", function() {
		$("#this-page").detach().appendTo(".page-content");	// move page content inside the proper spot in layout
		componentHandler.upgradeDom();											// upgrade all loaded components to properly use MDL js
		$(".pagetitle").text("Artsius")
		popup.initPopup();
	});
	$("#search-btn").click(function() {
		$("#search-result").css({'visibility':'visible'});
	});
});

var popup = {

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
		});
	},

	/*	Unlock an achievement. Shows the popup and sets needed user data.
	 *
	 * */
	achieve: function(ach, lvlStr) {
		var lvl = parseInt(lvlStr);
		var vals, exp;

		$("popup-title").text("Achievement unlocked:");

		switch (ach) {
			case "visited":
				if (userdata.get(ach) <= lvl) break;
				vals = [10, 20, 50, 100, 1000];										// visited profiles per achievement level
				exp = [20, 30, 40, 50, 100];											// exp per achievement level

				$("#popup-text").text("Sharp eye");
				$("#popup-desc").text("Visited " + vals[lvl] + " artist profiles.");
				break;

			default:
				console.log("UNDEFINED ACHIEVEMENT: "+ach);
				break;

		}

		userdata.set("exp", userdata.get("exp") + exp[lvl]);
		userdata.set(ach, lvl);
		$("dialog")[0].showModal();
	}





}
