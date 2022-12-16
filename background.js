chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({url:chrome.extension.getURL("index.html")});
});

// chrome.browserAction.onClicked.addListener(function()) {
// chrome.tabs.query({}, function (tabs) {
//   for (var i = 0; i < tabs.length; i++) {
//       chrome.tabs.remove(tabs[i].id);
//   }
// });
// }
