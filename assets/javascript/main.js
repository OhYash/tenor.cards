const absolutePath = 'https://ohyash.github.io/webcard/';

// To encode, use this
// btoa(encodeURIComponent(""))

function processData() {
	var urlParams = new URLSearchParams(location.search);
	if (urlParams.has('data'))
	{
		let dataParam = atob(urlParams.get('data')); // Get and URI decode
		let decryptedDataParam = decodeURIComponent(dataParam); // base64 decode

		document.getElementById('MessageText').innerHTML = decryptedDataParam;
	}
	else if(window.location.href != absolutePath)
	{
		window.location.href = absolutePath;
	}
}
