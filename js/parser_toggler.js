// adds the parser toggler to the footer!
function addParseToggler() {
    // get the item to place checkbox
    let checkDiv = document.querySelector(`div[jsname="x1nnfb"]`);
    // check if item is available
    if (!checkDiv)  return;
    // create input element
    let checkbox = document.createElement(`input`);
    checkbox.setAttribute(`type`, `checkbox`);
    checkbox.setAttribute(`id`, `tex_parser_toggler`);
    checkbox.checked = true;
    let span = document.createElement(`span`);
    span.innerText = "Parse Message";
    span.setAttribute(`style`, `font-size: 18px;`)
    let container = document.createElement(`div`);
    container.classList.add(`tex_parser_toggler_container`);
    container.appendChild(checkbox);
    container.appendChild(span);
    checkDiv.appendChild(container);
};

// invoke the addTexParser!
if (!document.getElementById(`tex_parser_toggler`)) addParseToggler();
