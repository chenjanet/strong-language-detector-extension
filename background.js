chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set(
    {
      censorLevel: 'word',
      censoredPages: [ ],
    }
  );
  console.log("Successfully installed");
});