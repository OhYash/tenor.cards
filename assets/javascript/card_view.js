
/**
 * ASCII to Unicode (decode Base64 to original data)
 * @param {string} b64
 * @return {string}
 */
function atou(b64) {
	return decodeURIComponent(atob(b64));
}

/**
 * Process the input parameter. i.e. Generate text from base64 to ASCII and display.
 */
function processPathParams(isCustomPage = false) {
    var urlParams = new URLSearchParams(location.search);

    if (urlParams.has('p'))
    {
        if (!isCustomPage)
        {
            document.getElementById('dispMsg').style.display = "block";
            document.getElementById('createCardOption').style.display = "block";
            document.getElementById('inputMsg').style.display = "none";
        }
        
        let decryptedDataParam = atou(urlParams.get('p')); // base64 decode
        let parsedMessage = parseTenorCardsMessage(decryptedDataParam);
        let messageTextElement = document.getElementById('MessageText');
        messageTextElement.innerHTML = parsedMessage;
    }
    if (urlParams.has('bg'))
    {
        bgColor = urlParams.get('bg')
        document.body.style.backgroundColor = bgColor;
    }
}
