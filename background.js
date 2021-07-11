chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({censorLevel: 'word'}, function() {
    console.log(`The storage level is word`);
  });
  console.log("Successfully installed");
});