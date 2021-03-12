// chrome.tabs.executeScript(null, {file: `js/markdown-it.min.js`}, () => {
//     chrome.tabs.executeScript(null, {file: `js/katex.min.js`}, () => {
//         chrome.tabs.executeScript(null, {file: `js/texmath.min.js`}, () => {
//             chrome.tabs.executeScript(null, {file: `js/index.js`}, () => {

//             });
//         });
//     });
// });

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    console.log(tabId, changeInfo, tab);
    // chrome.tabs.executeScript(null, {file: `js/markdown-it.min.js`}, () => {
    //     chrome.tabs.executeScript(null, {file: `js/katex.min.js`}, () => {
    //         chrome.tabs.executeScript(null, {file: `js/texmath.min.js`}, () => {
    //             chrome.tabs.executeScript(null, {file: `js/index.js`}, () => {
    
    //             });
    //         });
    //     });
    // });
}); 