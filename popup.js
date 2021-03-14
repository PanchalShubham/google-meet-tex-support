chrome.tabs.executeScript(null, {file: `js/highlight.min.js`}, () => {
    chrome.tabs.executeScript(null, {file: `js/markdown-it.min.js`}, () => {
        chrome.tabs.executeScript(null, {file: `js/katex.min.js`}, () => {
            chrome.tabs.executeScript(null, {file: `js/texmath.min.js`}, () => {
                chrome.tabs.executeScript(null, {file: `js/index.js`}, () => {

                });
            });
        });
    });
});
