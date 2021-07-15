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
            console.log(texts);
        });
    }); 
    
});
