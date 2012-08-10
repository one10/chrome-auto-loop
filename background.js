// Auto-loop over URLs
// https://github.com/one10/chrome-auto-loop
// based on chrome ext. examples

var defaultPause = 3000; // e.g., 3000 is 3 seconds

var urlJsonFilename = 'urls.json';
var min = 1;
var max = 5;
var current = min;
var i = 0;
var isRunning = 0;

// just in case...
updateIcon();

// load JSON file with URLs
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = parseJson;
xhr.open("GET", chrome.extension.getURL(urlJsonFilename), true);
xhr.send(null);

// kick of perpetual visitUrl with the default interval
var interval = setInterval(visitUrl, defaultPause);

// allow disabling the loop via icon click
chrome.browserAction.onClicked.addListener(toggleRunning);

// helpers
function visitUrl() {

    if (isRunning == 1) {
	    // alert('visiting url: ' + urlJson.urls[i].url);
	    chrome.tabs.getSelected(null, function(tab) {
	        chrome.tabs.update(tab.id, {url: urlJson.urls[i].url});
	    });
	    updateIcon();

        // re-set the interval to either default or from JSON
        clearInterval(interval);
        if (urlJson.urls[i].pause) {
	        // alert("resetting interval to one from JSON: " + urlJson.urls[i].pause);
            interval = setInterval(visitUrl, urlJson.urls[i].pause);
        }
        else {
            interval = setInterval(visitUrl, defaultPause);
        }

        // increment or roll over the URL counter
        i = i == (urlJson.urls.length - 1) ? 0 : i + 1;
    }
}

function toggleRunning() {
    isRunning = isRunning == 1 ? 0 : 1;
    updateIcon();
}

function updateIcon() {
    chrome.browserAction.setIcon({path:"images/icon" + current + ".png"});
    current = current == max ? min : current + 1;
}

function parseJson() { 
    if (xhr.readyState == 4) {
        if (xhr.responseText)
            urlJson = JSON.parse(xhr.responseText);
        
        if (!xhr.responseText || !urlJson || urlJson.urls.length == 0) {
            alert("Error loading the URL JSON, extension not running");
            isRunning = 0;
        }
        else {
            isRunning = 1;
        }
    }
}
