const absolutePath = 'https://tenor.cards/';
const squareViewPath = 'https://tenor.cards/views/skew.html';

var urlParams;

function pageLoadMain() {
	if (!urlParams)
		urlParams = new URLSearchParams(location.search);

	// hide the dropdown, set card html, set params, call the iframe
	if (urlParams.has('ct')) // Card Type
	{
		document.getElementById("CardSelector").value = urlParams.get('ct');
		document.getElementById("CardSelectorForm").style.display = "none";

		loadCard();
	}
	else
	{
		document.getElementById("CardSelectorForm").style.display = "block";
	}

	// Show "Create Card" option on msg view page
	if (urlParams.has('p')) // Message view
	{
		document.getElementById('CreateCardOption').style.display = "block";
		loadCard();
	}
}

function cttofilename(ctName) {
	let cardSuffix = urlParams.has('p') ? "view" : "create";
	let pathSuffix = urlParams.toString();

	switch(ctName) {
	    case 'skew':
	    	return `./cards/skew_${cardSuffix}.html?${pathSuffix}`
	    	break;
	  	case 'quote':
	    	return `./cards/quote_${cardSuffix}.html?${pathSuffix}`
	    	break;
	  	default:
	    	return `./cards/simple_${cardSuffix}.html?${pathSuffix}`
	} 
}

function loadCard() {
	let cname = document.getElementById("CardSelector").value;
	let cpath = cttofilename(cname);
	document.getElementById('MainCard').src = cpath;
}
