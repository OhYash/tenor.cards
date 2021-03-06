const absolutePath = 'https://tenor.cards/';

/**
 * Unicode to ASCII (encode data to Base64) + Some regex based filterations.
 * @param {string} data
 * @return {string}
 */
function utoa(data) {
	return btoa(encodeURIComponent(data));
}

/**
 * Generate the processed link for the input text converted to Base64 
 * @param {string} cardName
 */
function generateProcessedLink(cardName = null) {
	let text = document.getElementById("textInput").value;

	document.getElementById('urlAccess').style.display = "none";

	if(text && text.length != 0) {
		let filteredText = text.replaceAll("[^\\p{L}\\p{N}\\p{P}\\p{Z}]", "");
		let encodedString = utoa(filteredText);
		let url = absolutePath + "?p=" + encodedString;
		
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
