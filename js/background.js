// simple log to see script status!
console.log(`[Google Meet Math Support] Sciprt started!`);


// create parser instance
const tm = texmath.use(katex);
const md = markdownit({
    html: true,
    linkify: true,
    typographer: true,
    quotes: '>',
    highlight: function(str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str).value;
            } catch (__)  { }
        }
        return '';
    }
}).use(markdownitEmoji)
.use(tm, {
    throwOnError: true,
    engine: katex,
    delimiters:'dollars',
    katexOptions: { 
        macros: {"\\RR": "\\mathbb{R}"}
    },
});


// create input element
let checkbox = document.createElement(`input`);
checkbox.setAttribute(`type`, `checkbox`);
checkbox.setAttribute(`id`, `tex_parser_toggler`);
checkbox.checked = false;
let span = document.createElement(`span`);
span.innerText = "Parse Message";
span.setAttribute(`style`, `font-size: 18px;`)
let container = document.createElement(`div`);
container.classList.add(`tex_parser_toggler_container`);
container.appendChild(checkbox);
container.appendChild(span);



// adds  the styles to the head
function addStyles() {
    // get the head
    let head = document.getElementsByTagName('head')[0];
    // check if head is available
    if (!head)  return;
    // add the CSS for beautiful display
    head.innerHTML += `
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex/dist/katex.min.css">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/markdown-it-texmath/css/texmath.min.css">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.13.0/dist/katex.css" integrity="sha384-b1jwlKx2fZPr3OngW6CqA3niWl98suSWQIspVVyrImbCVlqAN4FS0K3kMQxWrFTy" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/github-markdown-css/2.2.1/github-markdown.css"/>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.6.0/build/styles/default.min.css">        
        <style>
        </style>
        `;
    }


// parses the text
function parseText(item) {
    let text = item.innerText;
    try{
        let html = md.render(text);
        item.innerHTML = html;    
    } catch (error) {
        console.log(text);
    }
}

// adds the parser toggler to the footer!
function addParseToggler() {
    let interval = setInterval(function(){
        // get the item to place checkbox
        let checkDiv = document.querySelector(`div[jsname="x1nnfb"]`);
        // check if item is available
        if (!checkDiv)  return;
        // if available then add child
        checkDiv.appendChild(container);
        // clear the interval
        clearInterval(interval);
    }, 1000);
};


// parses the Tex in ChatBox
function addTexParser() {
    // a simple log!
    console.log('[Google Meet Math Support] addTexParser()');
    // add styles
    addStyles();
    // add parser toggler
    addParseToggler();
    // wait until the chat window is opened
    let interval = setInterval(()=>{
        const messageClass = `oIy2qc`;
        // get the message container
        let messageDiv = document.querySelector(`div[jsname="xySENc"]`);
        // check if message container is available
        if (!messageDiv)  return;

        // parses the equations into latex
        function eventHandler(event){
            // check if parsing is enabled
            if (!checkbox || !checkbox.checked)   return;
            // get the target
            let target = event.target;
            let classList = target.classList;
            if (!classList) return;
            // check if target's classList contains oIy2qc
            if (classList.length === 1 && classList[0] === messageClass) {
                parseText(target);
            } else {
                // query the children with this class then
                let items = target.querySelectorAll(`div[class="${messageClass}"]`);
                // iterate through messages
                for (const item of items) parseText(item);
            }
        };
        // update message whenever a new message is received
        messageDiv.addEventListener(`DOMNodeInserted`, eventHandler);
        // stop waiting for chat window!
        clearInterval(interval);
    }, 1000);
}

// when document is loaded execute script
document.onreadystatechange = (event)=>{
    if (document.readyState === 'complete' || document.readyState === 'interactive'){
        // wait for the chat screen to appear!
        let mainInterval = setInterval(function(){
            // get the item to place checkbox
            let checkDiv = document.querySelector(`div[jsname="x1nnfb"]`);
            // check if item is available
            if (!checkDiv)  return;
            // stop waiting for this item!
            clearInterval(mainInterval);
            // add the tex-parser
            addTexParser();
        }, 1000);
    }
}

