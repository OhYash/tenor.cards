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

function captureCard() {
    var canvs = document.getElementById('capturable');
    html2canvas(canvs, {allowTaint : true}).then(function(canvas) {
                var link = document.createElement("a");
                document.body.appendChild(link);
                link.download = "html_image.png";
                link.href = canvas.toDataURL("image/png");
                link.target = '_blank';
                link.click();
            });
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

/**
 * Extra fields processor for the tss rofit card
 * @param {json obj} URL Params
 */
function processTssExtraParams(urlParams) {
    if (urlParams.has('m')) // market: Eg: USDT
    {
        let decryptedDataParam = atou(urlParams.get('m')); // base64 decode
        let parsedMessage = parseTenorCardsMessage(decryptedDataParam);
        document.getElementById('mtMkt').innerHTML = parsedMessage;
    }
    if (urlParams.has('d')) // Desc, Eg: T1 Done
    {
        let decryptedDataParam = atou(urlParams.get('d')); // base64 decode
        let parsedMessage = parseTenorCardsMessage(decryptedDataParam);
        document.getElementById('mtMsg').innerHTML = parsedMessage;
    }
    if (urlParams.has('en') && urlParams.has('ex')) // Entry and Exit prices. Eg: 35000.0, 36000.0
    {
        let entryPriceParam = parseFloat(urlParams.get('en'));
        let exitPriceParam = parseFloat(urlParams.get('ex'));
        let leverage = 1;

        document.getElementById('mtEntP').innerHTML = entryPriceParam;
        document.getElementById('mtExtP').innerHTML = exitPriceParam;

        if (urlParams.has('l')) // Leverage/Margin. Eg: 3
            leverage = parseInt(urlParams.get('l'));

        let profitPercentage = (((100 * Math.max(entryPriceParam, exitPriceParam)) / Math.min(entryPriceParam, exitPriceParam)) - 100) * leverage;
        document.getElementById('mtPerc').innerHTML = profitPercentage.toFixed(2)+'%';

        if (entryPriceParam > exitPriceParam)
        {
            let directionObj = document.getElementById('mtDir');
            directionObj.innerHTML = 'Short';
            directionObj.classList.remove("text-green-200");
            directionObj.classList.add('text-red-300');
        }

        if (leverage != 1)
            document.getElementById('mtLev').innerHTML = 'With ' + leverage + 'x leverage';
    }
}
