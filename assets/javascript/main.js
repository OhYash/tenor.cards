var urlParams;

/**
 * Utility method to get card name based on card type provided
 * @return {string}
 */
function ctToFilename(ctName) {
	let cardSuffix = urlParams.has('p') ? "view" : "create";
	let pathSuffix = urlParams.toString();

	if (!ctName || ctName.length === 0)
		ctName = "simple";

	return `./cards/${ctName}_${cardSuffix}.html?${pathSuffix}`;
}

/**
 * Main processor for the parent page. loads the appropriate card frame with params. 
 */
function pageLoadMain() {
	if (!urlParams)
		urlParams = new URLSearchParams(location.search);

	// hide the dropdown, set card html, set params, call the iframe
	if (urlParams.has('ct')) // Card Type
	{
		let ctval = urlParams.get('ct');
		let cardSelector = document.getElementById("CardSelector");

		if (ctval.startsWith('h_'))
		{
			let opt = document.createElement('option');
			ctval = ctval.substring(2);
			opt.value = ctval;
			opt.innerHTML = opt.value;
			cardSelector.appendChild(opt);
		}

		cardSelector.value = ctval;
		document.getElementById("CardSelectorForm").style.display = "none";
	}

	loadCard();
}

/**
 * Hide iFrame and show shimmer
 */
function hideIFrame() {
	document.getElementById("CardShimmer").style.display = "block";
	document.getElementById("MainCard").style.display = "none";
}

/**
 * Hide shimmer and show iFrame data
 */
function showIFrame() {
	document.getElementById("CardShimmer").style.display = "none";
	document.getElementById("MainCard").style.display = "block";
}

/**
 * Loads the card page selected in 'CardSelectorForm' 
 */
function loadCard() {
	hideIFrame();
	let cname = document.getElementById("CardSelector").value;
	let cpath = ctToFilename(cname);
	let cardIFrame = document.getElementById('MainCard');
	if (cardIFrame.src !== cpath)
		cardIFrame.src = cpath;
}

/**
 * This is required to prevent iframe from collapsing when screen size is small.
 * Doens't seem to make too much a differenc, can be removed if entirely useless.
 * Source: https://stackoverflow.com/a/9976309/11846245
 */
function resizeAndShowIframe(obj) {
	showIFrame();
    obj.style.height = obj.contentWindow.document.documentElement.scrollHeight + 'px';
}
