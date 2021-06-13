const absolutePath = 'https://tenor.cards/';

/**
 * Unicode to ASCII (encode data to Base64)
 * @param {string} data
 * @return {string}
 */
function utoa(data) {
	return btoa(encodeURIComponent(data));
}

/**
 * Generate the processed link for the input text converted to Base64 
 */
function generateProcessedLink() {
	let text = document.getElementById("textInput").value;

	document.getElementById('urlAccess').style.display = "none";

	if(text != undefined && text.length != 0) {
		let encodedString = utoa(text).replaceAll("[^\\p{L}\\p{N}\\p{P}\\p{Z}]", "");
		let url = absolutePath + "?p=" + encodedString;
		
		setTimeout(() => {
			document.getElementById('browsableLink').value = url;
			document.getElementById('urlAccess').style.display = "block"; 
		}, 320);
	}
}

/**
 * Utitlity method to select and copy text from box to system clipboard
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
	//if (length === 140)
		// set color of 'inputCountStat' object to light red  	
		// Also, revert back to original color if not present
	document.getElementById("inputCountStat").innerHTML = textLength;
}