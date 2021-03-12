console.log(`sciprt started!`);
// parses the Tex in ChatBox
function addTexParser() {
    console.log('invoked addTexParser!');
    // get the head
    let head = document.getElementsByTagName('head')[0];
    // check if head is available
    if (!head)  return;
    // add the CSS for beautiful display
    head.innerHTML += `
    <link  rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex/dist/katex.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/markdown-it-texmath/css/texmath.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.13.0/dist/katex.css" integrity="sha384-b1jwlKx2fZPr3OngW6CqA3niWl98suSWQIspVVyrImbCVlqAN4FS0K3kMQxWrFTy" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/github-markdown-css/2.2.1/github-markdown.css"/>    <style>
        .jtgSgd{
            display: flex;
            align-items: center;
        }
        .oIy2qc:first-child{
            margin: 0px !important;
            display: inline-block !important;
            white-space: none;
        }
        .tex_parser_toggler_container{
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 10px;
            background: #f1f3f4;
        }
        #tex_parser_toggler {
          position: relative;
          appearance: none;
          outline: none;
          width: 40px;
          height: 18px;
          border-radius: 10px;
          background: gray;
          box-shadow: none;
          cursor: pointer;
          overflow: hidden;
          transition: 0.8s;
        }
        #tex_parser_toggler:checked {
          background: #66aaa2;
        }
        #tex_parser_toggler::after {
          content: '';
          position: absolute;
          border-radius: inherit;
          width: 18px;
          height: 18px;
          background: #ffffff;
          transition: inherit;
        }
        #tex_parser_toggler:checked::after {
          left: calc(100% - 18px);
          background: #00796b;
        }        
    </style>
    `;
    const tm = texmath.use(katex);
    const md = markdownit().use(tm, {
        throwOnError: true,
        engine: katex,
        delimiters:'dollars',
        katexOptions: { 
            macros: {"\\RR": "\\mathbb{R}"}
        },
    });

    // parses the text
    function parseText(item) {
        let text = item.innerText;
        let html = md.render(text);
        item.innerHTML = html;
    }

    // wait until the chat window is opened
    let interval = setInterval(()=>{
        console.log('waiting!');
        const messageClass = `oIy2qc`;
        // get the message container
        let messageDiv = document.querySelector(`div[jsname="xySENc"]`);
        // check if message container is available
        if (!messageDiv)  return;
        // get the item to place checkbox
        let checkDiv = document.querySelector(`div[jsname="x1nnfb"]`);
        // check if item is available
        if (!checkDiv)  return;
        // create input element
        let checkbox = document.createElement(`input`);
        checkbox.setAttribute(`type`, `checkbox`);
        checkbox.setAttribute(`id`, `tex_parser_toggler`);
        let span = document.createElement(`span`);
        span.innerText = "Parse Tex";
        span.setAttribute(`style`, `font-size: 18px;`)
        let container = document.createElement(`div`);
        container.classList.add(`tex_parser_toggler_container`);
        container.appendChild(checkbox);
        container.appendChild(span);
        checkDiv.appendChild(container);


        // parses the equations into latex
        function eventHandler(event){
            // check if parsing is enabled
            if (!checkbox.checked)   return;
            // get the target
            let target = event.target;
            let classList = target.classList;
            if (!classList) return;
            // check if target's classList contains oIy2qc
            if (classList.length === 1 
                    && classList[0] === messageClass) {
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

// invoke the addTexParser!
addTexParser();
