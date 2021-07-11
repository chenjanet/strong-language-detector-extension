chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({censorLevel: 'word'});
  console.log("Successfully installed");
});