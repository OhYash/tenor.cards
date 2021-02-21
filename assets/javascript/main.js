const absolutePath = 'https://tenor.cards/';

// To encode, use this
// btoa(encodeURIComponent(""))

/**
 * ASCII to Unicode (decode Base64 to original data)
 * @param {string} b64
 * @return {string}
 */
function atou(b64) {
	return decodeURIComponent(escape(atob(b64)));
}

/**
 * Unicode to ASCII (encode data to Base64)
 * @param {string} data
 * @return {string}
 */
function utoa(data) {
	return btoa(unescape(encodeURIComponent(data)));
}

function processPathParams() {
	var urlParams = new URLSearchParams(location.search);
	if (urlParams.has('p'))
	{
		document.getElementById('dispMsg').style.display = "block";
		document.getElementById('getMsg').style.display = "none";
		console.log("gothere");
		let decryptedDataParam = atou(urlParams.get('p')); // base64 decode

		document.getElementById('MessageText').innerHTML = decryptedDataParam;
	}
}

function generateProcessedLink() {
	let text = document.getElementById("textInput").value;
	if(text != undefined && text.length != 0) {
		let encodedString = utoa(text);
		let url = absolutePath + "?p=" + encodedString;
		
		document.getElementById('browsableLink').value = url;
		document.getElementById('urlAccess').style.display = "block";
	}
}

function copyToClipboard() {
	var copyText = document.getElementById("browsableLink");

	copyText.select();
	copyText.setSelectionRange(0, 99999); // For mobile devices

	document.execCommand("copy");
}

function dispTextCount() {
	let text = document.getElementById("textInput").value;
	let textLength = text.length;
	//if (length === 140)
		// set color of 'inputCountStat' object to light red  	
	document.getElementById("inputCountStat").innerHTML = textLength;
}
