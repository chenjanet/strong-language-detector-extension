chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set(
    {
      censorLevel: 'word',
      censoredPages: [ ],
    }
  );
  console.log("Successfully installed");
});

chrome.tabs.query({ active: true }, function(tab) {
  getStrongLanguage(tab.url);
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.tabs.query({ active: true }, function(tab) {
    getStrongLanguage(tab[0].url);
  });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  getStrongLanguage(tab.url);
});

chrome.tabs.onCreated.addListener(function(tab) { 
  console.log(document);
  getStrongLanguage(tab.url);
});

function getStrongLanguage(url) {
  console.log(url);
}