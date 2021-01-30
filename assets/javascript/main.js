function processData() {
	var urlParams = new URLSearchParams(location.search);
	if (urlParams.has('data'))
	{
		document.getElementById('MessageText').innerHTML = urlParams.get('data');
	}
}
