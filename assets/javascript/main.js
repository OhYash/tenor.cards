var urlParams;

function ctToFilename(ctName) {
	let cardSuffix = urlParams.has('p') ? "view" : "create";
	let pathSuffix = urlParams.toString();

	if (!ctName || ctName.length === 0)
		ctName = "simple";

	return `./cards/${ctName}_${cardSuffix}.html?${pathSuffix}`;
}

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

function loadCard() {
	let cname = document.getElementById("CardSelector").value;
	let cpath = ctToFilename(cname);
	document.getElementById('MainCard').src = cpath;
}
