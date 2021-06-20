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
		document.getElementById("CardSelector").value = urlParams.get('ct');
		document.getElementById("CardSelectorForm").style.display = "none";
	}

	loadCard();
}

/**
 * Loads the card page selected in 'CardSelectorForm' 
 */
function loadCard() {
	let cname = document.getElementById("CardSelector").value;
	let cpath = ctToFilename(cname);
	document.getElementById('MainCard').src = cpath;
}
