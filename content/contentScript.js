const sentenceReg = new RegExp("[^\.!\?\n]+[\.!\?\n]+", "g");
const wordReg = new RegExp("[A-Za-z0-9_]+", "g");

const censorWords = () => {
    const words = new Set(document.body.innerText.match(wordReg));
    words.forEach((element, index) => {

    });
    console.log(words);
};

const censorSentences = () => {
    const sentences = new Set(document.body.innerText.match(sentenceReg));
    console.log(sentences);
} 

const censorPage = () => {
    const page = document.body.innerText;
    console.log(page);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
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
