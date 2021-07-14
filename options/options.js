let censorLevelSelect =  document.forms["censorLevelSelector"];

chrome.storage.sync.get('censorLevel', (data) => {
    censorLevelSelect[data.censorLevel].checked = true;
});

censorLevelSelect.onchange = (event) => {
    chrome.storage.sync.set({censorLevel: event.target.value});
    chrome.tabs.reload();
}