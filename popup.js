// // chrome.tabs.executeScript(null, )
// chrome.tabs.executeScript(null, {file: `js/highlight.min.js`}, () => {
//     console.log("[Google Meet Math Support] Loaded highlight.min.js");
//     chrome.tabs.executeScript(null, {file: `js/markdown-it.min.js`}, () => {
//         console.log("[Google Meet Math Support] Loaded markdown-it.min.js");
//         chrome.tabs.executeScript(null, {file: `js/markdown-it-emoji.js`}, () => {
//             console.log("[Google Meet Math Support] Loaded markdown-it-emoji.min.js");
//             chrome.tabs.executeScript(null, {file: `js/katex.min.js`}, () => {
//                 console.log("[Google Meet Math Support] Loaded katex.min.js");
//                 chrome.tabs.executeScript(null, {file: `js/texmath.min.js`}, () => {
//                     console.log("[Google Meet Math Support] Loaded highlight.min.js");
//                     chrome.tabs.executeScript(null, {file: `js/index.js`}, () => {
//                         console.log("[Google Meet Math Support] Loaded index.js");    
//                     });
//                 });
//             });    
//         });
//     });
// });

chrome.tabs.executeScript(null, {file: `js/parser_toggler.js`}, () => {})