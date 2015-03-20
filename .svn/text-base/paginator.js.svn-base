require(['jquery'], function($) {
	var hideTxt = "display: none;";
	var showTxt = "display: table-row;";

	var pidCounter = 0;

	var generateCss = function() {
		var self = this;

		var data = self.data("paginator");
		var css = "";

		if (!data.alwaysShow) {
			//hide all
			css += data.selector + " " + data.lines + "{" + hideTxt + "} ";

			//show current page
			css += data.selector + " " + data.lines +
					(data.curPage > 0 ? ":nth-child(n+" + (data.curPage * data.linesPerPage + 1) + ")" : "") + //start of page
					(data.curPage < data.numPages - 1 ? ":nth-child(-n+" + (data.curPage+1) * data.linesPerPage + ")" : "") + //end of page
					"{" + showTxt + "}";
		} else {
			var always = $(data.alwaysShow, self).removeClass("earlierRow laterRow");
			var included = false;
			if (always.index() > (data.curPage+1) * data.linesPerPage) {
				always.addClass("laterRow");
			} else if (always.index() < data.curPage * data.linesPerPage) {
				always.addClass("earlierRow");
			} else {
				included = true; //set this flag so the CSS is set to show the additional line(s) since the always-showing lines are part of the showing page
				//Apparently CSS4 has a :nth-match selector that would replace this functionality, but until then this works fine
			}

			//hide all
			css += data.selector + " " + data.lines + ":not(" + data.alwaysShow + ")" + "{" + hideTxt + "} ";

			//show current page
			css += data.selector + " " + data.lines + ":not(" + data.alwaysShow + ")" +
					(data.curPage > 0 ? ":nth-child(n+" + (data.curPage * data.linesPerPage + 1) + ")" : "") + //start of page
					(data.curPage < data.numPages - 1 ? ":nth-child(-n+" + ((data.curPage+1) * data.linesPerPage + (included ? always.length : 0)) + ")" : "") + //end of page
					"{" + showTxt + "}";
		}

		data.style.html(css);
	};

	var methods = {
		init: function(params) {
			var self = this;
			var data = self.data("paginator");

			if (!params) {
				params = {};
			}

			var defaults = {
				"maxHeight": 1000,
				"dom": self.siblings(".paginatorFooter"),
				"selector": (self.attr("id") ? "#" + self.attr("id") : ".paginator-" + data.pid),
				"lines": "tbody tr",
				"curPage": 0
			};
			$.extend(defaults, data); //override any normal defaults with pre-existing values

			//check for reserved keys
			if (params.style) {
				delete params.style;
			}
			if (params.pid) {
				delete params.pid;
			}

			var opts;

			if (Utils_toType(params) == "object") {
				opts = $.extend({}, defaults, params);
			} else {
				opts = $.extend({}, defaults, {"maxHeight": +params}); //if a single value was passed in instead of an object, take it to be the max height
			}
			opts.dom = $(opts.dom);

			$.extend(data, opts); //copy into data storage

			if (!data.dom.length) { //no DOM provided, make our own
				data.dom = $("<div>").addClass("paginatorFooter");
				self.after(data.dom);
			}

			methods.calcPages.call(self);
			generateCss.call(self);

			data.dom.off("click.paginator").on("click.paginator", ".prevPage", function() {
				if ($(this).hasClass("disabled")) {
					return;
				}
				methods.page.call(self, data.curPage - 1);
			}).on("click.paginator", ".nextPage", function() {
				if ($(this).hasClass("disabled")) {
					return;
				}
				methods.page.call(self, data.curPage + 1);
			}).on("click.paginator", ".pageInd", function() {
				if ($(this).hasClass("disabled selected")) {
					return;
				}
				methods.page.call(self, $(this).data("page"));
			});

			return self;
		},

		maxHeight: function(newMax) {
			var self = this;
			var data = self.data("paginator");

			if (arguments.length) {
				data.maxHeight = newMax;
				methods.calcPages.call(self);
				return generateCss.call(self);
			} else {
				return data.maxHeight;
			}
		},

		page: function(newPage) {
			var self = this;
			var data = self.data("paginator");

			if (arguments.length) {
				newPage = +newPage;
				if (newPage >= 0 && newPage < data.numPages) {
					data.curPage = newPage;
					generateCss.call(self);
				}
				methods.setStates.call(self);
				return self;
			} else {
				return data.curPage;
			}
		},

		calcPages:  function() {
			var self = this;
			var data = self.data("paginator");

			var oldNumPages = data.numPages;

			var lines = $(data.lines, self);
			if (lines.length) {
				var lineHeight = lines.outerHeight();
				var linesPerPage = Math.floor(data.maxHeight/lineHeight);
				if (linesPerPage === 0) {
					linesPerPage = 1; //can't have zero lines per page, so we'll just have to overflow a little bit
				}
				var numPages = Math.ceil(lines.length/linesPerPage);

				data.linesPerPage = linesPerPage;
				data.numPages = numPages;
			} else {
				data.linesPerPage = 0;
				data.numPages = 0;
			}

			if (data.alwaysShow) {
				var always = lines.filter(data.alwaysShow);
				data.linesPerPage -= always.length;
				data.numPages = Math.ceil((lines.length - always.length)/data.linesPerPage);
			}

			if (data.numPages !== oldNumPages) {
				data.dom.html("<div class='prevPage'></div><div class='pages'></div><div class='nextPage'></div>");
				var pagesDiv = $(".pages", data.dom);
				for (var i = 0; i < data.numPages; ++i) {
					var ind = $("<div>").addClass("pageInd");
					ind.data("page", i);
					pagesDiv.append(ind);
				}
				if (data.numPages === 0) {
					pagesDiv.html("<div class='pageInd disabled'></div>");
				}
			}
			data.ghost = lines.hasClass("ghost");
			if (data.ghost) {
				$(".pages", data.dom).html("<div class='pageInd disabled'></div>");
			}

			if (data.curPage >= data.numPages) { //the page we used to be on no longer exists
				methods.page.call(self, data.numPages - 1);
			}

			generateCss.call(this);
			return methods.setStates.call(self);
		},

		setStates: function() {
			var self = this;
			var data = self.data("paginator");
			var curPage = data.curPage;

			var inds = $(".pageInd", data.dom);
			inds.removeClass("selected");

			if (!data.ghost) {
				$(".disabled", data.dom).removeClass("disabled");
			}

			if (curPage === 0 || data.ghost) {
				$(".prevPage", data.dom).addClass("disabled");
			}
			if (curPage >= data.numPages - 1 || data.ghost) {
				$(".nextPage", data.dom).addClass("disabled");
			}
			if (data.numPages !== 0 && !data.ghost) {
				inds.eq(curPage).addClass("selected");
			}

			return self;
		},

		lines: function(l) {
			var self = this;
			var data = self.data("paginator");

			if (arguments.length) {
				data.lines = l;
				return methods.init.call(self);
			} else {
				return data.lines;
			}
		},

		filter: function(selector) {
			var self = this;
			var data = self.data("paginator");

			if (!("unfiltered" in data)) {
				data.unfiltered = $(data.lines, self).clone(true);
				data.unfilteredParent = $(data.lines, self).parent();
			}

			//reset lines before filtering
			var parent = data.unfilteredParent;
			$(data.lines, self).remove();
			parent.append(data.unfiltered.clone(true));
			
			if (arguments.length) { //has a selector passed in
				if ($.isFunction(selector)) {
					$(data.lines, self).each(function(i, el) {
						if (!selector(el)) {
							$(el).remove();
						}
					});
				} else {
					$(data.lines, self).not(selector).remove();
				}
			}
			methods.calcPages.call(self);

			return self;
		},

		resetUnfiltered: function() {
			//Resets the internal storage of unfiltered lines
			//ONLY CALL THIS IF THE CURRENT LINES AREN'T ALREADY FILTERED
			var self = this;
			var data = self.data("paginator");

			data.unfiltered = $(data.lines, self).clone(true);
			data.unfilteredParent = $(data.lines, self).parent();

			return self;
		}
	};

	$.fn.paginator = function(method) {
		if (!this.hasClass("hasPaginator")) {
			var data = {};
			this.data("paginator", data).addClass("hasPaginator");
			data.style = $("<style type='text/css'>");
			$("body").prepend(data.style);

			data.pid = pidCounter++;
			this.addClass("paginator-" + data.pid);
			return methods.init.apply(this, arguments);
		} else if (Utils_toType(method) == "object" || !method) {
			return methods.init.apply(this, arguments);
		} else if (method in methods) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else {
			return this.data("paginator")[method];
		}
	};
});
