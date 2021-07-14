const sentenceReg = new RegExp("[^\.!\?\n]+[\.!\?\n]+", "g");
const wordReg = new RegExp("[A-Za-z0-9_]+", "g");

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        chrome.storage.sync.get('censorLevel', function(data) {
            if (data.censorLevel == "word") {
                censorWords();
            } else if (data.censorLevel == "sentence") {
                censorSentences();
            } else {
                censorPage();
            }
            console.log("url", request.url);
        }); 
    }
);

function censorWords() {
    const words = new Set(document.body.innerText.match(wordReg));
    console.log(words);
}

function censorSentences() {
    const sentences = new Set(document.body.innerText.match(sentenceReg));
    console.log(sentences);
} 

function censorPage() {
    const page = document.body.innerText;
    console.log(page);
}