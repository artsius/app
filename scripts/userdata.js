var userdata = {
	/* returns an object containing all data stored in the cookie, or empty object if the cookie doesn't exist yet */
	getall: function() {
		var cookies = document.cookie;
		if (cookies == "") {
			return {
				level: 0,
				next_level: 101,
				exp: 0,
				searched: 0,
				visited: 0,
				ordered: 0,
				ordered5: 0,
				cnt_searched: 0,
				cnt_visited: 0,
				cnt_ordered: 0,
				cnt_ordered5: 0,
				messages: 0,
				unknown: 0
			};
		}

		var pair;
		var userdata = "";
		var ca = cookies.split(";");
		for (var i = 0; i < ca.length; i++) {
			pair = ca[i].split("=");
			if(pair[0].replace(/\s/g,'') == "userdata") {
				userdata = pair[1];
			}
		}
		if (userdata == "") return {};
		return JSON.parse(decodeURIComponent(userdata));
	},

	/* returns the value of a specific key stored in cookie object or undefined if such a key doesn't exist */
	get: function(varname) {
		var userdata = this.getall();
		return userdata[varname];
	},

	/* stores a key-value pair to cookie object */
	set: function(varname, value) {
		var currentdata = this.getall();
		currentdata[varname] = value;
		var newdata = "userdata=" + encodeURIComponent(JSON.stringify(currentdata)) + "; max-age=3153600000; path=/";
		document.cookie = newdata;
	},

	setdemo() {
		var demoData = {
			level: 14,
			next_level: 196,
			exp: 11,
			searched: 3,
			visited: 2,
			ordered: 1,
			ordered5: 0,
			cnt_searched: 97,
			cnt_visited: 46,
			cnt_ordered: 1,
			cnt_ordered5: 0,
			messages: 4,
			unknown: 0
		};
		var newdata = "userdata=" + encodeURIComponent(JSON.stringify(demoData)) + "; max-age=3153600000; path=/";
		document.cookie = newdata;
	},

	/* deletes the cookie object */
	delall: function() {
		document.cookie = "userdata=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
	}
}
