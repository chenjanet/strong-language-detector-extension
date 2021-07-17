const wordReg = new RegExp("[A-Za-z0-9_]+", "g");

const wordsList = () => { return Array.from(new Set(document.body.innerText.match(wordReg))); }

const getBaseUrl = (url) => {
    if (url.includes("/search?q=")) {
        return url.split(/&/g)[0];
    } else {
        const pathArr = url.split('/');
        return pathArr[0] + "//" + pathArr[2];
    }
}
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    chrome.storage.sync.get('censorLevel', (data) => {
        let texts = wordsList();
        chrome.runtime.sendMessage({ message: 'get_strong_language', data: { "text": Array.from(texts) } }, (response) => {
            texts = texts.filter((word, index) => { return response.data.is_strong[index] === 1 });
            if (texts.length > 0) {
                if (data.censorLevel === "word") {
                    const elements = document.getElementsByTagName("*");
                    for (let element of elements) {
                        for (let node of element.childNodes) {
                            if (node.nodeType === 3) {
                                const text = node.nodeValue;
                                let replacedText = text;
                                texts.forEach(text => {
                                    const replacement = text.replace(/./g, "*");
                                    const textReg = new RegExp(text, "g");
                                    replacedText = replacedText.replace(textReg, replacement);
                                });
                                if (replacedText !== text) {
                                    element.replaceChild(document.createTextNode(replacedText), node);
                                }
                            }
                        }
                    }
                } else {
                    alert('This page contains strong language. It will now be closed');
                    chrome.runtime.sendMessage({ message: 'close_tab' });
                }
                chrome.storage.sync.get('censoredPages', (censorData) => {
                    for (let page of censorData.censoredPages) {
                        if (request.url.includes(page.url)) {
                            page.visitCount++;
                            return chrome.storage.sync.set({ censoredPages: censorData.censoredPages });
                        }
                    }
                    let url = getBaseUrl(request.url);
                    censorData.censoredPages.push({
                        url,
                        visitCount: 1
                    });
                    chrome.storage.sync.set({ censoredPages: censorData.censoredPages });
                });
            }
        });
    }); 
});
