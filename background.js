chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set(
    {
      censorLevel: 'word',
      censoredPages: [ ],
    }
  );
  console.log("Successfully installed");
  chrome.tabs.query({ active: true }, function(tab) {
    chrome.scripting.executeScript({
      target: { tabId: tab[0].id },
      function: getStrongLanguage
    });
  });
  chrome.permissions.getAll(function(perms) {
    console.log(perms);
  })
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.tabs.query({ active: true }, function(tab) {
    chrome.scripting.executeScript({
      target: { tabId: tab[0].id },
      function: getStrongLanguage
    });
  });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  chrome.scripting.executeScript({
    target: { tabId },
    function: getStrongLanguage
  });
});

chrome.tabs.onCreated.addListener(function(tab) {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: getStrongLanguage
  });
});

function getStrongLanguage() {
  
}