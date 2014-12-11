// Info anzeigen
function showInfo(object, text) {
    var top = 0;
    var left = 0;
    var width = object.offsetWidth;
    var height = object.offsetHeight;
    var distance = 5;
    var bodyWidth = document.body.offsetWidth;
    
    for (top = object.offsetTop, left = object.offsetLeft; 
         object = object.offsetParent; 
         top += object.offsetTop, left += object.offsetLeft) 

    document.getElementById('info_box').style.display = 'block';
    var infoWidth = document.getElementById('info_box').offsetWidth;

    if (left < (bodyWidth - infoWidth - distance)) {
        document.getElementById('info_box').style.left = (left + width) + distance + 'px';
        document.getElementById('info_box').style.top = (top + height) + distance + 'px';
    } else {
        document.getElementById('info_box').style.left = left - distance - infoWidth + 'px';
        document.getElementById('info_box').style.top = (top + height) + distance + 'px';
    }
    document.getElementById('info_text').innerHTML = text;
}

// Info ausblenden
function hideInfo() {
	document.getElementById('info_box').style.display = 'none';
}

//Elemente einblenden
//Mit show_elements() können einzelne oder mehrere Elemente
//via show_elements('ElementIDone','ElementIDtwo','ElementIDthree')
//eingeblendet werden.
function showElements() {
	var elementNames = arguments;
	for (var i=0; i < elementNames.length; i++) {
		var elementName = elementNames[i];
		document.getElementById(elementName).style.display = 'block';
	}
}

//Elemente ausblenden
//Mit show_elements() können einzelne oder mehrere Elemente
//via hide_elements('ElementIDone','ElementIDtwo','ElementIDthree')
//ausgeblendet werden.
function hideElements() {
	var elementNames = arguments;
	for (var i=0; i < elementNames.length; i++) {
		var elementName = elementNames[i];
		document.getElementById(elementName).style.display = 'none';
	}
}