================
chrome-auto-loop
https://github.com/one10/chrome-auto-loop
================

A Chrome extension to auto-loop over URLs for simple testing or traffic gen

Public domain

================
Install
================
Go to chrome://chrome/extensions/ and install. Starts auto-looping through urls.json 
right away. Press changing color icon to stop/start. Modify urls.json with your urls and
timeout values for each if necessary.

This extension provides a quick way to simulate page loads leveraging the real browser
to also load all images, JS, CSS, etc., making it more realistic than, say, curl or ab.

================
Files
================
README.txt  
background.js - code
images/
manifest.json - standard Chrome manifest
urls.json - sample URL input file, modify for your usage
