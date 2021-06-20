
/**
 * ASCII to Unicode (decode Base64 to original data)
 * @param {string} b64
 * @return {string}
 */
function atou(b64) {
	return decodeURIComponent(atob(b64));
}

/**
 * Main processor for the input parameters. i.e. Generate text from base64 to ASCII, apply formatting, and display.
 * @param {function callback} customFunc
 */
function processPathParams(customFunc = null) {
    var urlParams = new URLSearchParams(location.search);

    if (urlParams.has('p'))
    {
        let decryptedDataParam = atou(urlParams.get('p')); // base64 decode
        let parsedMessage = parseTenorCardsMessage(decryptedDataParam);
        document.getElementById('MessageText').innerHTML = parsedMessage;

        if (customFunc)
            customFunc(urlParams);

        parent.document.getElementById('createCardOption').style.display = "block";
    }
    if (urlParams.has('bg'))
    {
        bgColor = urlParams.get('bg')
        document.body.style.backgroundColor = bgColor;
    }
}
