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

		let parentCreateCardOptn = parent.document.getElementById('CreateCardOption');
		if (parentCreateCardOptn)
			parentCreateCardOptn.style.display = "block";
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
 * Extra param to load up the selected background into the card body.
 * @param {json obj} URL Params
 */
 function processBgExtraParam(urlParams) {
	if (urlParams.has('cbg')) // Background
	{
		let colorCode = '';
		switch (urlParams.get('cbg')) {
			case 'lgray':
			colorCode = "bg-gray-200";
			break;
			case 'lgreen':
			colorCode = "bg-green-400";
			break;
			case 'lblue':
			colorCode = "bg-blue-400";
			break;
			case 'orange':
			colorCode = "bg-yellow-500";
			break;
			case 'yellow':
			colorCode = "bg-yellow-200";
			break;
			case 'red':
			colorCode = "bg-red-600";
			break;
			case 'dblue':
			colorCode = "bg-blue-900";
			break;
			case 'dgreen':
			colorCode = "bg-green-800";
			break;
			case 'purple':
			colorCode = "bg-purple-600";
			break;
			case 'pink':
			colorCode = "bg-pink-400";
			break;
			default:
			colorCode = "bg-white";
		}
		document.getElementById('capturable').classList.add(colorCode);
	}
}

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

		let profitPercentage = (Math.abs(exitPriceParam - entryPriceParam) / entryPriceParam) * leverage * 100;
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

		if (urlParams.has('tp')) // Timeperiod eg: 3 Days
			document.getElementById('mtPrd').innerHTML = 'in ' + atou(urlParams.get('tp'));
	}
}

/**
 * Extra fields processor for the KD instagram post card (2x1 left)
 * @param {json obj} URL Params
 */
 function processKD2x1ExtraParams(urlParams) {
	if (urlParams.has('d')) // Desc
	{
		let decryptedDataParam = atou(urlParams.get('d')); // base64 decode
		let parsedMessage = parseTenorCardsMessage(decryptedDataParam);
		document.getElementById('mtDesc').innerHTML = parsedMessage;
	}
	if (urlParams.has('i')) // Hero Image
	{
		let decryptedDataParam = atou(urlParams.get('i')); // base64 decode
		document.getElementById('mtImage').src = decryptedDataParam;
	}
	if (urlParams.has('n')) // Issue number
	{
		let issueNum = urlParams.get('n');
		document.getElementById('mtIssue').innerHTML = issueNum;
	}
	processBgExtraParam(urlParams);
}
