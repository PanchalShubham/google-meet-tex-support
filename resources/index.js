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

const keyDownHandler = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
        // send the message
        event.preventDefault();
        let textarea = document.getElementById(`messenger`);
        if (!textarea)  return;
        let text = textarea.value;
        textarea.value = ``;
        let html = md.render(text);
        let div = document.getElementById(`message_container`);
        if (!div)   return;
        div.innerHTML += html;
    }
};

const keyUpHandler = (event) => {
    let element = event.target;
    element.style.height = "1px";
    element.style.height = Math.max(element.scrollHeight, 30) + "px";
    element.focus();
};

document.addEventListener('DOMContentLoaded', () => {
    let textarea = document.getElementById(`messenger`);
    textarea.addEventListener(`keydown`, keyDownHandler);
    textarea.addEventListener(`keyup`, keyUpHandler);
});


// parses all the items on docs
function parseAll() {
    let inputs = document.getElementsByClassName(`parseInput`);
    let outputs = document.getElementsByClassName(`parseOutput`);
    let length = inputs.length;
    for (let i = 0; i < length; ++i) {
        let text = String(inputs[i].innerText).trim();
        let html = md.render(text);
        outputs[i].innerHTML = html;
    }
}; parseAll();