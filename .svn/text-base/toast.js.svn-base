require(["jquery"], function($) {
	toast = (function() {
		function checkParams(params, required) {
			if (!(params instanceof Object)) {
				throw "Parameters must be passed as an object with the following key(s) required:\n" + required.toString();
			}

			var missing = [];
			for (var i=0; i<required.length; ++i) {
				if (!(required[i] in params))
					missing.push(required[i]);
			}
			if (missing.length) {
				throw "The following required parameters are missing:\n" + missing.toString();
			}
		}

		var requiredParams = {
			notify: ["message"]
		};

		//initialization:
		var settings = {
			speed: 1500,
			duration: 1000
		};

		var bread = $("<div>").attr("id", "toast-bread");
		var msg = $("<div>").attr("id", "toast-msg");
		bread.append(msg).hide(); //start hidden
		$("body").prepend(bread);

		var initBottom = bread.css("bottom");

		//functions:
		var notify = function(params) {
			checkParams(params, requiredParams.notify);

			bread.queue(function(next) {
				msg.html(params.message);
				bread.show();

				next();
			});
			bread.animate({bottom: 0}, settings.speed).delay(settings.duration).animate({bottom: initBottom}, settings.speed);
			bread.queue(function(next) {
				bread.hide();

				next();
			});
		};

		return {
			notify: notify,
			settings: settings
		};
	})();
});