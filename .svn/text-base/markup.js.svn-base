//Markup Man is here to save the day! Semantically! Along with his trusty sidekick, CSS Lad!
define([
		"jquery"
	], function($) {
		var html = "<header><div class='face'>:)</div></header><div class='body'><div class='arm arm-1'></div><div class='torso'><figure class='logo'>&lt;MM&gt;</figure><div class='belt'><img class='buckle'/></div></div><div class='arm arm-2'></div><div class='leg leg-1'></div><div class='leg leg-2'></div><div class='cape'></div></div><footer><div class='foot foot-1'></div><div class='foot foot-2'></div>",
			buckle = "data:image/png;base64,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",
			height = 400,
			width = 250,
			fontSize = 24,
			styles = {
				"*": {
					"box-sizing": "border-box",
					"position": "relative",
					"padding": "0",
					"margin": "0"
				},
				"> *": {
					"background": "white" //maybe his race should be customizable? Although if I translate certain races to colors that might get me in trouble...
				},
				"header": {
					"width": "3em",
					"height": "3em",
					"border-radius": "1.5em",
					"border": "1px solid black",
					"z-index": "1", //in front of the cape

					"position": "absolute",
					"top": "0",
					"left": (width - 3*fontSize)/2 + "px"
				},
					"header .face": {
						"width": "100%",
						"height": "100%",
						"transform": "rotate(90deg)",
						"line-height": "2.7em",
						"letter-spacing": "0.5em",
						"padding-left": "0.4em",
						"text-align": "center",
						"margin": "0",
						"font-weight": "bold"
					},
						"header .face code": {
							"-webkit-transform": "rotate(-90deg)",
							"-moz-transform": "rotate(-90deg)",
							"transform": "rotate(-90deg)"
						},
				".body": {
					"position": "absolute",
					"left": "0",
					"right": "0",
					"top": "3em",
					"bottom": "1em",
					"background": "transparent"
				},
					".body > *": {
						"background": "white",
						"z-index": "1" //in front of the cape
					},
					".arm": {
						"width": "1.5em",
						"position": "absolute",
						"top": "0",
						"bottom": "50%",
						"border-radius": "1em"
					},
					".arm-1": {
						"left": "0.05em"
					},
					".arm-2": {
						"right": "0.05em"
					},
					".torso": {
						"position": "absolute",
						"left": "1.7em",
						"right": "1.7em",
						"top": "0",
						"bottom": "50%",
						"text-align": "center",
						"border": "1px solid black",
						"border-bottom": "none"
					},
						".logo": {
							"line-height": (fontSize * 4) + "px",
							"font-weight": "bold",
							"font-style": "italic",
							"letter-spacing": "0.2em",
							"text-shadow": "0 0 0.2em #22f, 0 1px 1px black, 1px 0 1px black, 0 -1px 1px black, -1px 0 1px black",
							"font-size": "1.4em",
							"color": "rgba(255, 255, 255, 0.9)"
						},
						".belt": {
							"position": "absolute",
							"bottom": "0",
							"left": "0",
							"right": "0",
							"height": "1.5em",
							"background": "#00B",
							"border": "3px solid gold"
						},
							".buckle": {
								"height": "2em",
								"position": "absolute",
								"left": "50%",
								"top": "50%",
								"transform": "translate(-50%, -50%)"
							},
					".leg": {
						"position": "absolute",
						"top": "50%",
						"bottom": "0",
						"width": "1.5em",
						"border": "1px solid black",
						"border-top": "none",
						"border-bottom": "none"
					},
					".leg-1": {
						"left": "1.7em"
					},
					".leg-2": {
						"right": "1.7em"
					},
					".cape": { //Markup Man is a big fan of Cory Doctorow
						"position": "absolute",
						"z-index": "0",
						"top": "-0.1em",
						"bottom": "1.5em",
						"left": "0",
						"right": "0",
						"background": "#B00",
						"border-radius": "1em 1em 0 0",
						"transition": ["-webkit-transform 0.7s, bottom 0.7s",
										"-moz-transform 0.7s, bottom 0.7s",
										"transform 0.7s, bottom 0.7s"],
						"transform-origin": "top"
					},
						".cape.windy": {
							"transform": "skew(30deg)",
							"bottom": "4em",
							"background-image": "linear-gradient(to bottom, transparent 0%, rgba(100, 100, 100, 0.3) 50%, transparent 100%)",
							"background-size": "100% 1.2em",
							"animation": "flutter 1s linear 0s infinite"
						},
						".cape.windy code": {
							"transform": "skew(-30deg)"
						},
				"footer": {
					"position": "absolute",
					"bottom": "0",
					"left": "0",
					"right": "0",
					"height": "1em",
					"background": "transparent"
				},
					"footer > *": {
						"background": "white"
					},
					".foot": {
						"position": "absolute",
						"width": "3.2em",
						"top": "0",
						"bottom": "0",
						"border": "1px solid black"
					},
					".foot-1": {
						"left": "0"
					},
					".foot-2": {
						"right": "0"
					},
				"code": {
					"font-size": "0.5em",
					"position": "absolute",
					"bottom": "0",
					"left": "0",
					"right": "0",
					"text-align": "center",
					"color": "#999",
					"background": "rgba(200, 200, 200, 0.4) !important",

					"z-index": "10 !important",
					"pointer-events": "none",

					"letter-spacing": "normal",
					"line-height": "1",
					"display": "none"
				},
				"code ~ * code": {
					"margin-top": "1em"
				},
				"code ~ * code ~ * code": {
					"margin-top": "2em"
				},
				":hover > code": {
					"display": "block"
				},
				"code:first-child": {
					"bottom": "auto",
					"top": "0"
				},
				"code:before": {
					"content": "\"</\""
				},
				"code:first-child:before": {
					"content": "\"<\""
				},
				"code:after": {
					"content": "\">\""
				}
			},
			baseStyles = {
				"z-index": 99999999,
				"font-size": fontSize + "px",
				"position": "absolute",
				"bottom": "20px",
				"left": "20px",
				"height": height + "px",
				"width": width + "px"
			},
			domID = "manOfManyMarks",
			prefixes = {
				"transform": ["-webkit-", "-moz-"],
				"transform-origin": ["-webkit-", "-moz-"],
				"animation": ["-webkit-", "-moz-"]
			},
			animations = {
				"flutter": [
					{
						"time": "from",
						"props": {
							"background-position": "0 0"
						}
					},
					{
						"time": "to",
						"props": {
							"background-position": "0 100%"
						}
					}
				]
			};

		var markupMan,
			trustySidekick;

		function oneProp(prop, val, addPrefixes) {
			str = "";
			if (arguments.length < 3) {
				addPrefixes = true;
			}
			if (addPrefixes && prop in prefixes) {
				for (var i=0; i<prefixes[prop].length; ++i) {
					str += oneProp(prefixes[prop][i] + prop, val);
				}
			}
			if ($.isArray(val)) {
				for (var i=0; i<val.length; ++i) {
					str += oneProp(prop, val[i], false);
				}
			} else {
				str += prop + ": " + val + "; ";
			}
			return str;
		}

		function dictToRules(d) {
			var str = "";
			for (var prop in d) {
				str += oneProp(prop, d[prop]);
			}
			return str;
		}

		function animationCSS(prefix) {
			if (!arguments.length) {
				return animationCSS("-moz-") + animationCSS("-webkit-") + animationCSS("");
			}
			var str = "";
			for (var name in animations) {
				var steps = animations[name];
				str += "@" + prefix + "keyframes " + name + " {";
				for (var i=0; i<steps.length; ++i) {
					var step = steps[i];
					str += step.time + " {" + dictToRules(step.props) + "} ";
				}
				str += "}\n";
			}
			return str;
		}

		return {
			init: function() {
				markupMan = $("<div>").html(html).attr("id", domID);

				//apply the styles
				var cssText = animationCSS() + "#" + domID + " {" + dictToRules(baseStyles) + "}\n";
				//programattically generated CSS! Wooohooooo!
				for (var selector in styles) {
					cssText += "#" + domID + " " + selector + " {" + dictToRules(styles[selector]) + "}\n";
				}
				trustySidekick = $("<style>").html(cssText);

				markupMan.find(".buckle").attr("src", buckle);

				//add nifty <code> tags showing the markup of the bodyparts
				markupMan.find("*").each(function() {
					var bodypart = $(this),
						tagName = bodypart.prop("tagName").toLowerCase(),
						open = $("<code>").text(tagName).prependTo(bodypart),
						close = $("<code>").text(tagName).appendTo(bodypart);

					if (bodypart.attr("class")) {
						open.append(" class='" + bodypart.attr("class") + "'");
					}
				});

				$(document.body).append(markupMan).append(trustySidekick);
			},
			wind: function() {
				markupMan.find(".cape").toggleClass("windy");
			}
		};
	}
);