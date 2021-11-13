/**
 * Truncate a string
 * @param {string} text - text you want to be truncate 
 * @param {number} letters - number of letters in the truncated text
 * @returns {string} - returns an truncated text within an <p> element to be insert as HTML
 */
function truncateText(text, letters = 130) {
	let truncatedText = text.slice(0, letters);
	let truncatedToHTML = `<p class="truncate">${truncatedText}...</p>`;
	
	return truncatedToHTML;
}

/* Select all card text containers */
let cards = document.getElementsByClassName('card_text');

/* Save texts within the cards as plain text */
let plainText = [];
for (let i = 0; i < cards.length; i++) {	
	plainText[i] = cards[i].innerText;
}

/* Save the original card texts */
let htmlText = [];
for (let i = 0; i < cards.length; i++) {	
	htmlText[i] = cards[i].innerHTML;
}

/* Add truncated text inside the cards */
for (let i = 0; i < cards.length; i++) {
	cards[i].innerHTML = truncateText(plainText[i]);
}

/* Add events to all buttons */
let btns = document.getElementsByClassName('card_btn');

for (let i = 0; i < cards.length; i++){
	btns[i].addEventListener('click', function () {
		
		/* If the first child in the card text container has 'truncate' class... */
		if (cards[i].firstChild.className == 'truncate') {

			/* Add their full text */
			cards[i].innerHTML = htmlText[i];
		} else {

			/* Add their truncated text */
			cards[i].innerHTML = truncateText(plainText[i]);
		}
	})	
}