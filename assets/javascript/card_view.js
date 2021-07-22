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

        parent.document.getElementById('CreateCardOption').style.display = "block";
    }
    if (urlParams.has('bg'))
    {
        bgColor = urlParams.get('bg')
        document.body.style.backgroundColor = bgColor;
    }
}

/********************* Custom functions below *********************/

/**
 * Extra fields processor for the quote card
 * @param {json obj} URL Params
 */
function processQuoteExtraParams(urlParams) {
    if (urlParams.has('n')) // Name
    {
        let decryptedDataParam = atou(urlParams.get('n')); // base64 decode
        let parsedMessage = parseTenorCardsMessage(decryptedDataParam);
        document.getElementById('mtName').innerHTML = parsedMessage + '<BR />';
    }
    if (urlParams.has('d')) // Description
    {
        let decryptedDataParam = atou(urlParams.get('d')); // base64 decode
        let parsedMessage = parseTenorCardsMessage(decryptedDataParam);
        document.getElementById('mtDesc').innerHTML = parsedMessage;
    }
}
