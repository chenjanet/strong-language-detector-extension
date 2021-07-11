let censorLevelSelect =  document.forms["censorLevelSelector"];

chrome.storage.sync.get('censorLevel', function(data) {
    censorLevelSelect[data.censorLevel].checked = true;
});

censorLevelSelect.onchange = function(event) {
    chrome.storage.sync.set({censorLevel: event.target.value});
    chrome.tabs.reload();
}