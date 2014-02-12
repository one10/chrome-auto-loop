// Auto-loop over URLs
// https://github.com/one10/chrome-auto-loop
// based on chrome ext. examples

var defaultPause = 3000; // e.g., 3000 is 3 seconds
var urlsObj;

var urlFilename = 'urls';
if (localStorage["filetype"] == "json") {
   urlFilename = urlFilename + ".json";
} else {
   urlFilename = urlFilename + ".txt";
}

var firstIcon = 1;
var lastIcon = 5;
var currentIcon = firstIcon;
var i = 0;
var isRunning = 0;

// just in case...
updateIcon();

// load JSON file with URLs
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = parseInput;
xhr.open("GET", chrome.extension.getURL(urlFilename), true);
xhr.send(null);

// kick off perpetual visitUrl with the default interval
var interval = setInterval(visitUrl, defaultPause);
// allow disabling the loop via icon click
chrome.browserAction.onClicked.addListener(toggleRunning);
// helpers
function visitUrl() {

    if (isRunning == 1) {
	    chrome.tabs.getSelected(null, function(tab) {
            full_url = localStorage["url_prefix"] + localStorage["query_prefix"] + urlsObj.urls[i].url;
	        chrome.tabs.update(tab.id, {url: full_url});
	    });
	    updateIcon();

        // re-set the interval to either default or from JSON
        clearInterval(interval);
        if (urlsObj.urls[i].pause) {
            interval = setInterval(visitUrl, urlsObj.urls[i].pause);
        }
        else {
            interval = setInterval(visitUrl, defaultPause);
        }

        // increment or roll over the URL counter
        i = i == (urlsObj.urls.length - 1) ? 0 : i + 1;
    }
}

function toggleRunning() {
    isRunning = isRunning == 1 ? 0 : 1;
    updateIcon();
}

function updateIcon() {
    chrome.browserAction.setIcon({path:"images/icon" + currentIcon + ".png"});
    currentIcon = currentIcon == lastIcon ? firstIcon : currentIcon + 1;
}

function parseInput() { 
    if (xhr.readyState == 4) {
        if (xhr.responseText) {
            // expecting either JSON or plaintext with urls
            if (localStorage["filetype"] == "json") {
                urlsObj = JSON.parse(xhr.responseText);
            }
            else {
                // for plaintext, mimic the JSON structure
                urlsObj = { "urls":[] };
                var urls = xhr.responseText.trim().split('\n');
                for (var i in urls) {
                    var url = new Object();
                    url.url  = urls[i];
                    urlsObj.urls.push(url);
                }
            }
        }
        
        if (!xhr.responseText || !urlsObj || urlsObj.urls.length == 0) {
            alert("Error loading the URL JSON, extension not running");
            isRunning = 0;
        }
        else {
            isRunning = 1;
        }
    }
}
