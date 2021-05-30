const absolutePath = 'https://tenor.cards/';
const squareViewPath = 'https://tenor.cards/views/skew.html';

var urlParams;

function pageLoadMain() {
	if (!urlParams)
		urlParams = new URLSearchParams(location.search);

	// Show "Create Card" option on msg view page
	if (urlParams.has('p')) // Message view
		document.getElementById('CreateCardOption').style.display = "block";

	// hide the dropdown, set card html, set params, call the iframe
	if (urlParams.has('ct')) // Card Type
	{
		document.getElementById("CardSelector").value = urlParams.get('ct');
		document.getElementById('CardSelector').style.display = "none";

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

