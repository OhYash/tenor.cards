const absolutePath = 'https://tenor.cards/';

// To encode, use this
// btoa(encodeURIComponent(""))

function processPathParams() {
	var urlParams = new URLSearchParams(location.search);
	if (urlParams.has('p'))
	{
		let dataParam = atob(urlParams.get('p')); // Get and URI decode
		let decryptedDataParam = decodeURIComponent(dataParam); // base64 decode

		document.getElementById('MessageText').innerHTML = decryptedDataParam;
	}
	else if(window.location.href != absolutePath)
	{
		// Commenting temporarily as create page is not yet ready
		// window.location.href = absolutePath;
	}
}

function dispTextCount() {
	let text = document.getElementById("textInput").value;
	let textLength = text.length;
	//if (length === 140)
		// set color of 'inputCountStat' object to light red  	
	document.getElementById("inputCountStat").innerHTML = textLength;
}
