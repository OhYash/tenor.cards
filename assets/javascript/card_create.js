const absolutePath = 'https://tenor.cards/';

/**
 * Unicode to ASCII (encode data to Base64) + Some regex based filterations.
 * @param {string} data
 * @return {string}
 */
function utoa(text) {
	let filteredText = text.replaceAll("[^\\p{L}\\p{N}\\p{P}\\p{Z}]", "");
	return btoa(encodeURIComponent(filteredText));
}

/**
 * Generate the processed link for the input text converted to Base64 
 * @param {string} cardName
 */
function generateProcessedLink(cardName = null, customFunc = null) {
	let text = document.getElementById("textInput").value;

	document.getElementById('urlAccess').style.display = "none";

	if(text && text.length != 0) {
		let encodedString = utoa(text);
		let url = absolutePath + "?p=" + encodedString;
		
        if (customFunc)
            url += customFunc();

		if (cardName && cardName.length != 0)
			url += "&ct=" + cardName;

		setTimeout(() => {
			document.getElementById('browsableLink').value = url;
			document.getElementById('urlAccess').style.display = "block"; 
		}, 420);
	}
}

/**
 * Utility method to select and copy text from box to system clipboard
 */
function copyToClipboard() {
	var copyText = document.getElementById("browsableLink");

	copyText.select();
	copyText.setSelectionRange(0, 99999); // For mobile devices

	document.execCommand("copy");
}

/**
 * Count and display input text as the use inputs data on the fly
 */
function dispTextCount() {
	let text = document.getElementById("textInput").value;
	let textLength = text.length;
	document.getElementById("inputCountStat").innerHTML = textLength;
}

/********************* Custom functions below *********************/

/**
 * Extra fields processor for the quote card
 */
function generateQuoteExtraParams() {
	let result = "";
	let name = document.getElementById("mtNameInput").value;
	if(name && name.length != 0) {
        result = "&n=" + utoa(name);
    }

    let desc = document.getElementById("mtDescInput").value;
	if(desc && desc.length != 0) {
        result += "&d=" + utoa(desc);
    }
    return result;
}

/**
 * Extra fields processor for the TSS card
 */
function generateTssExtraParams() {
	let result = "";
	var data = document.getElementById("mtMkt").value;
	if(data && data.length != 0) {
        result = "&m=" + utoa(data);
    }

    data = document.getElementById("mtMsg").value;
	if(data && data.length != 0) {
        result += "&d=" + utoa(data);
    }
    data = document.getElementById("mtEntP").value;
	if(data && data.length != 0) {
        result += "&en=" + data;
    }

    data = document.getElementById("mtExtP").value;
	if(data && data.length != 0) {
        result += "&ex=" + data;
    }
    let lev = document.getElementById("mtLev").value;
	if(lev && lev > 1) {
        result += "&l=" + lev.toString();
    }
    return result;
}
