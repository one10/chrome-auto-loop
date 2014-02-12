================
chrome-auto-loop
https://github.com/one10/chrome-auto-loop
================

A Chrome extension to auto-loop over URLs for simple testing or traffic gen

Public domain

This extension provides a quick way to simulate page loads - leveraging the real 
browser to also load all images, JS, CSS, etc., making it more realistic than, say, 
curl or ab.

NB: need to disable cache to ensure pages are really fetched every time

================
Install
================
Go to chrome://chrome/extensions/ and install. Starts auto-looping through urls.json 
right away. Press changing color icon to stop/start. Modify urls.json with your urls 
and timeout values for each if necessary.

================
Configuration Options
================
* Filetype - take input either from JSON or from TXT input file
* URL prefix - if values from the input TXT need to be tacked on some URL, example: Alexa file info for all sites from TXT, or Google queries that mention URLs from TXT
* Query prefix - string between the URL prefix and values from input TXT, e.g. Google query "site:facebook.com%20"
* Max sleep, ms - default upper bound on random sleeps between pages, unless input JSON provides

================
Limitations/Todo
================
* JS timers are not reliable, therefore request generation timing is not very precise
* doesn't handle POSTs (yet)
* doesn't do multiple tabs/concurrent requests (yet)
* doesn't interact with the actual page very much - could use a content script
* auto-dsable cache
* does not yet re-load the input files, even if the filetype was changed in options

================
Files
================
README.txt  
background.js - code
images/
manifest.json - standard Chrome manifest
urls.json - sample URL input file, modify for your usage
options.html - options layout page
options.js - script to save options
urls.txt - sample input txt with URLs
