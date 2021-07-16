const sentenceReg = new RegExp("[^\.!\?\n]+[\.!\?\n]+", "g");
const wordReg = new RegExp("[A-Za-z0-9_]+", "g");

const wordsList = () => { return Array.from(new Set(document.body.innerText.match(wordReg))); }

const sentencesList = () => { return Array.from(new Set(document.body.innerText.match(sentenceReg))); }

const pageText = () => { return [ document.body.innerText ] };

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    chrome.storage.sync.get('censorLevel', function(data) {
        let texts;
        if (data.censorLevel == "word") {
            texts = wordsList();
        } else if (data.censorLevel == "sentence") {
            texts = sentencesList();
        } else {
            texts = pageText();
        }
        chrome.runtime.sendMessage({ message: 'get_strong_language', data: { "text": Array.from(texts) } }, (response) => {
            texts = texts.filter((word, index) => { return response.data.is_strong[index] === 1 });
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
        });
    }); 
    
});
