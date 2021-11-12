/**
  shave - Shave is a javascript plugin that truncates multi-line text within a html element based on set max height
  @version v2.5.9
  @link https://github.com/yowainwright/shave#readme
  @author Jeff Wainwright <yowainwright@gmail.com> (jeffry.in)
  @license MIT
**/
(function (global, factory) {
	typeof exports === "object" && typeof module !== "undefined"
		? (module.exports = factory())
		: typeof define === "function" && define.amd
		? define(factory)
		: ((global = global || self), (global.shave = factory()));
})(this, function () {
	"use strict";

	function shave(target, maxHeight) {
		var opts =
			arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
		if (typeof maxHeight === "undefined" || isNaN(maxHeight))
			throw Error("maxHeight is required");
		var els =
			typeof target === "string" ? document.querySelectorAll(target) : target;
		if (!els) return;
		var character = opts.character || "&mldr;";
		var classname = opts.classname || "js-shave";
		var spaces = typeof opts.spaces === "boolean" ? opts.spaces : true;
		var charHtml = '<span class="js-shave-char">'.concat(character, "</span>");
		if (!("length" in els)) els = [els];

		for (var i = 0; i < els.length; i += 1) {
			var el = els[i];
			var styles = el.style;
			var span = el.querySelector(".".concat(classname));
			var textProp = el.textContent === undefined ? "innerText" : "textContent"; // If element text has already been shaved

			if (span) {
				// Remove the ellipsis to recapture the original text
				el.removeChild(el.querySelector(".js-shave-char"));
				el[textProp] = el[textProp]; // eslint-disable-line
				// nuke span, recombine text
			}

			var fullText = el[textProp];
			var words = spaces ? fullText.split(" ") : fullText; // If 0 or 1 words, we're done

			if (words.length < 2) continue; // Temporarily remove any CSS height for text height calculation

			var heightStyle = styles.height;
			styles.height = "auto";
			var maxHeightStyle = styles.maxHeight;
			styles.maxHeight = "none"; // If already short enough, we're done

			if (el.offsetHeight <= maxHeight) {
				styles.height = heightStyle;
				styles.maxHeight = maxHeightStyle;
				continue;
			} // Binary search for number of words which can fit in allotted height

			var max = words.length - 1;
			var min = 0;
			var pivot = void 0;

			while (min < max) {
				pivot = (min + max + 1) >> 1; // eslint-disable-line no-bitwise

				el[textProp] = spaces
					? words.slice(0, pivot).join(" ")
					: words.slice(0, pivot);
				el.insertAdjacentHTML("beforeend", charHtml);
				if (el.offsetHeight > maxHeight) max = pivot - 1;
				else min = pivot;
			}

			el[textProp] = spaces ? words.slice(0, max).join(" ") : words.slice(0, max);
			el.insertAdjacentHTML("beforeend", charHtml);
			var diff = spaces
				? " ".concat(words.slice(max).join(" "))
				: words.slice(max);
			var shavedText = document.createTextNode(diff);
			var elWithShavedText = document.createElement("span");
			elWithShavedText.classList.add(classname);
			elWithShavedText.style.display = "none";
			elWithShavedText.appendChild(shavedText);
			el.insertAdjacentElement("beforeend", elWithShavedText);
			styles.height = heightStyle;
			styles.maxHeight = maxHeightStyle;
		}
	}

	return shave;
});

let text = document.getElementsByClassName('card_text')[0].innerText;
let card_text = document.getElementsByClassName('card_text')[0];
let card_text_p = document.getElementsByClassName('card_text')[0].innerHTML;
let btn = document.getElementById('btn');

function truncateText(text, letters = 100) {
	if (letters > text.length) {
		return text;		
	}
	
	let truncate =  `<p class="truncate">${text.slice(0, letters)}...</p>`;
	return truncate;
}

card_text.innerHTML = truncateText(text);

btn.addEventListener('click', function () {
	if (card_text.firstChild.className == 'truncate') {
		card_text.innerHTML = card_text_p;
	} else {
		card_text.innerHTML = truncateText(text);
	}
})

// card_text.innerHTML = card_text_p;

// let nuevo_p = document.createElement("p");
// nuevo_p.append("aslkdjasd");

// card_text.append(nuevo_p);

// alert();
// console.log(card_text_p);
// card_text.innerHTML = "hoo";
// console.log(card_text_p);
// alert();


// card_text.append = `${card_text_p[0]} ${card_text_p[1]}`;

// let module = document.getElementsByClassName("clamp");
// shave(module, 90);

// let contentHeight = document.getElementsByClassName("clamp")[0].offsetHeight;

// let content = document.getElementsByClassName("card_text");

// for (let i = 0; i < content.length; i++) {
// 	content[i].style.height = contentHeight + 14 + "px";
// }

// let shaveDots = document.getElementsByClassName("js-shave-char");
// let shaves = document.getElementsByClassName("js-shave");

// let btn = document.getElementById("btn")

// btn.addEventListener('click', function () {
// 	for (let i = 0; i < content.length; i++) {
// 		shaveDots[i].remove();
// 		shaves[i].style.display = 'inline';
// 		content[i].style.height = "auto";
// 	}
// });