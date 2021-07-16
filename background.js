chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set(
        {
            censorLevel: 'word',
            censoredPages: [ ],
        }
    );
    chrome.tabs.query({ active: true }, (tabs) => {
        if (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { "message": "tab_change", "url": tabs[0].url });
        }
    });
});

chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { "message": "tab_change", "url": tabs[0].url });
        }
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") {
        chrome.tabs.sendMessage(tabId, { "message": "tab_change", "url": tab.url });
    }
});

chrome.tabs.onCreated.addListener((tab) => {
    chrome.tabs.sendMessage(tab.id, { "message": "tab_change", "url": tab.url });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.message) {
        case 'get_strong_language': {
            postData("http://localhost:5000/is_strong", request.data)
                .then(data => {
                    sendResponse({ data });
                });
            break;
        }
        case 'close_tab': {
            chrome.tabs.goBack();
            break;
        }
    }
    return true;
});

const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return response.json();
}