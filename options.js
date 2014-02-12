// Auto-loop over URLs
// https://github.com/one10/chrome-auto-loop
// based on chrome ext. examples

// Saves options to localStorage.
function save_options() {
  var select = document.getElementById("filetype");
  var filetype = select.children[select.selectedIndex].value;
  localStorage["filetype"] = filetype;

  var input = document.getElementById("url_prefix");
  var url_prefix = input.value;
  localStorage["url_prefix"] = url_prefix;

  input = document.getElementById("min_default_sleep");
  var min_default_sleep = input.value;
  localStorage["min_default_sleep"] = min_default_sleep;

  input = document.getElementById("max_default_sleep");
  var max_default_sleep = input.value;
  localStorage["max_default_sleep"] = max_default_sleep;

  input = document.getElementById("query_prefix");
  var query_prefix = input.value;
  localStorage["query_prefix"] = query_prefix;

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  var filetype = localStorage["filetype"];
  if (!filetype) {
    return;
  }

  var url_prefix = localStorage["url_prefix"];
  if (!url_prefix) {
    return;
  }

  var max_default_sleep = localStorage["max_default_sleep"];
  if (!max_default_sleep) {
    return;
  }

  var min_default_sleep = localStorage["min_default_sleep"];
  if (!min_default_sleep) {
    return;
  }

  var query_prefix = localStorage["query_prefix"];
  if (!query_prefix) {
    return;
  }

  var input = document.getElementById("url_prefix");
  input.value = url_prefix;

  input = document.getElementById("query_prefix");
  input.value = query_prefix;

  input = document.getElementById("min_default_sleep");
  input.value = min_default_sleep;

  input = document.getElementById("max_default_sleep");
  input.value = max_default_sleep;

  var select = document.getElementById("filetype");
  for (var i = 0; i < select.children.length; i++) {
    var child = select.children[i];
    if (child.value == filetype) {
      child.selected = "true";
      break;
    }
  }
}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
