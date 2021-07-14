let extensionStats = document.getElementById("extensionStats");

chrome.storage.sync.get((data) => {
    const censoredPages = data.censoredPages;
    if (censoredPages.length == 0) {
        extensionStats.innerHTML = "No webpages with strong language have been visited";
        return;
    }
    censoredPages.sort((a, b) => {
        return a.visitCount - b.visitCount;
    });
    let extensionStatsSummary = `<b>${censoredPages.length}</b> webpage(s) visited have had strong language.<br>`;
    extensionStatsSummary = `${extensionStatsSummary}Most frequently-visited webpages with strong language:`;
    extensionStatsSummary = `${extensionStatsSummary}<ul>`;
    extensionStatsSummary = `${extensionStatsSummary}<li>${censoredPages[0].url}: visited ${censoredPages[0].visitCount} times`;
    if (censoredPages[1]) extensionStatsSummary = `${extensionStatsSummary}<li>${censoredPages[1].url}: visited ${censoredPages[1].visitCount} times`;
    if (censoredPages[2]) extensionStatsSummary = `${extensionStatsSummary}<li>${censoredPages[2].url}: visited ${censoredPages[2].visitCount} times`;
    extensionStatsSummary = `${extensionStatsSummary}</ul>`;
    document.getElementById("extensionStats").innerHTML = extensionStatsSummary;
});
