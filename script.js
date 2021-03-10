/* ***********************************************************************************
MIT License

Copyright (c) 2021 panchalshubham

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
**************************************************************************************** */

// ==UserScript==
// @name         Google Meet Tex Support
// @namespace    https://meet.google.com/
// @version      0.1
// @description  "Adds Tex parsing for Google Meet"
// @author       Shubham Panchal (shubhampanchal9773@gmail.com)
// @match        https://meet.google.com/*
// @require      https://cdn.jsdelivr.net/npm/katex@0.13.0/dist/katex.js
// ==/UserScript==

// logging the startup of script
console.log('[Google Meet Tex Support]: Started Script!');

// parses the Tex in ChatBox
function addTexParser() {
    // get the head
    let head = document.getElementsByTagName('head')[0];
    // check if head is available
    if (!head)  return;
    // add the CSS for beautiful display
    head.innerHTML += `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.13.0/dist/katex.css" integrity="sha384-b1jwlKx2fZPr3OngW6CqA3niWl98suSWQIspVVyrImbCVlqAN4FS0K3kMQxWrFTy" crossorigin="anonymous">`;
    // wait until the chat window is opened
    let interval = setInterval(()=>{
        // get the message container
        let div = document.querySelector(`div[jsname="o4MlPd"]`);
        // check if message container is available
        if (!div)  return;
        // parses the equations into latex
        function eventHandler(){
            // get all the messages
            let items = document.querySelectorAll(`div[class="oIy2qc"]`);
            // iterate through messages
            for (let i = 0; i < items.length; ++i){
                // get the message text
                let text = items[i].innerText;
                // check if this is of the $...$
                if (text.startsWith('$') && text.endsWith('$')){
                    // parse the equation using KaTex
                    let html = katex.renderToString(text.substring(1, text.length - 1), {throwOnError: false});
                    // update the message to display the equation
                    if (html)   items[i].innerHTML = html;
                }
            }
        };
        // update message whenever a new message is received
        div.addEventListener(`DOMNodeInserted`, eventHandler);
        // stop waiting for chat window!
        clearInterval(interval);
    }, 1000);
}

// when document is loaded execute script
document.onreadystatechange = (event)=>{
    if (document.readyState === 'complete' || document.readyState === 'interactive'){
        setTimeout(addTexParser, 1000);
    }
}
