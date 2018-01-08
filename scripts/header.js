$(document).ready( function() {
	/* This loads our shared header and places the contents of this page inside it. */
	$("#header").load("/shared/header.html", function() {
		$("#this-page").detach().appendTo(".page-content");	// move page content inside the proper spot in layout
		componentHandler.upgradeDom();											// upgrade all loaded components to properly use MDL js
		controller.initPopup();

		$("#userData").text("Username, lvl " + userdata.get("level"));

		$(".order_btn").click(function() {
			controller.counterCheck("ordered");
		});

		/* Check if artist profile is visited. */
		if ($('.artist-profile').length) {
			$("#search-result").css({'visibility':'hidden'});
			controller.counterCheck("visited");
		}

		$("#search-btn").click(function() {
			$("#search-result").css({'visibility':'visible'});
			controller.counterCheck("searched");
		});

		$("#home-tab").click(function() {
			$("#search-result").css({'visibility':'hidden'});
		});

	});
});

var controller = {

	/* Get and update counter for each achievement. */
	counterCheck: function(ach) {

		var counter;
		var lvl, vals;

		counter = parseInt(userdata.get("cnt_"+ach));
		counter += 1;
		userdata.set("cnt_"+ach, counter);

		switch (ach) {
			case "searched":
				vals = [10, 20, 50, 100, 500, 1000];
				break;

			case "ordered":
				if(counter % 5 == 0){
					if (counter > 5) counter = 5;
					controller.achieve(ach+"5", counter / 5, 1);
					return;
				}
				else {
					if (counter > 5) counter = 5;
					controller.achieve(ach, counter, 1);
					return;
				}

			case "visited":
				vals = [10, 20, 50, 100, 500, 1000];
				break;

			default:
				console.log("UNDEFINED ACHIEVEMENT: "+ach);
				return;
		}

		$.each(vals, function(index, value) {
			if(value == counter) {
				lvl = index;
				controller.achieve(ach, lvl + 1, value);
				return false;
			}
		});

	},

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
	achieve: function(ach, lvlStr, val) {
		var lvl = parseInt(lvlStr);
		var vals, exp;


		switch (ach) {
			case "visited":
				//if (userdata.get(ach) <= lvl) break;
				//vals = [10, 20, 50, 100, 1000];										// visited profiles per achievement level
				exp = [0, 20, 30, 40, 50, 100];											// exp per achievement level

				$("#popup-title").text("Achievement unlocked!");
				$("#popup-text").text("Sharp eye");
				$("#popup-desc").text("Visited " + val + " artist profiles.");
				break;

			case "searched":
				exp = [0, 20, 30, 40, 50, 100];

				$("#popup-title").text("Achievement unlocked!");
				$("#popup-text").text("Nifty explorer");
				$("#popup-desc").text("Searched " + val + " times.");
				break;

			case "ordered":
				exp = [0, 40, 40, 40, 40, 40, 40];

				$("#popup-title").text("Order bonus!");
				$("#popup-text").text("Craft scavenger");
				$("#popup-desc").text("This order brings you 40 exp points!");
				break;

			case "ordered5":
				exp = [0, 80, 80, 80, 80, 80, 80];

				$("#popup-title").text("Massive order bonus!");
				$("#popup-text").text("Craft scavenger");
				$("#popup-desc").text("This order brings you 80 exp points!");
				break;

			default:
				console.log("UNDEFINED ACHIEVEMENT: "+ach);
				return;

		}

		userdata.set("exp", userdata.get("exp") + exp[lvl]);	// add exp
		userdata.set(ach, lvl);																// set achievement level
		console.log(ach + ", level: "+lvl);
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
			userdata.set("next_level", controller.levelFun(level + 1));

			if(level % 5 == 0) {
				$("#popup-title").text("Level up bonus!");
				$("#popup-text").text("You have reached level " + level + "! This grants you a 5% discount on your next order!");
				$("#popup-desc").text("This only happens every 5 levels, so congratulations!");
			} else {
				$("#popup-title").text("Level up!");
				$("#popup-text").text("You have reached level " + level + "!");
				$("#popup-desc").text("Congratulations!");
			}

			$("dialog")[0].showModal();														// show achievement dialog

			$("#userData").text("Username, lvl " + userdata.get("level"));

			/* Every 5th level up
			**
			if(level & 5 == 0) {
				$("#popup-desc").text("Congratulations, you received a new profile background!");
				$("dialog")[0].showModal();
			}
			*/
		}
	},


	/*	Calculate exp needed for a given levelup.
	 * */
	levelFun: function(x) {
		return Math.round(10 * (Math.log(x) * 3 + (x / 10) + 10));
	}

}
