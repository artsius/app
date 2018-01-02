var userdata = {
	/* returns an object containing all data stored in the cookie, or empty object if the cookie doesn't exist yet */
	getall: function() {
		var cookies = document.cookie;
		if (cookies == "") return {};

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

	/* deletes the cookie object */
	delall: function() {
		document.cookie = "userdata=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
	}
}