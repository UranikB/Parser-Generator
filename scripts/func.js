function addField(){
    const container = document.getElementById("input-form");

    const inputField = document.createElement("div");
    inputField.classList.add("input-field");

    const input1 = document.createElement("input");
    input1.classList.add("nonterminal");
    input1.maxLength = 1;
    input1.type = "text";

    const arrow = document.createElement("span");
    arrow.innerHTML = "&#8594;";


    const input2 = document.createElement("input");
    input2.classList.add("production-rule");
    input2.type = "text";

    inputField.innerHTML = "<button class=\"button\" onclick=\"deleteField(this)\"><img src=\"../resources/trash.svg\"/></button>";
    inputField.appendChild(input1);
    inputField.appendChild(arrow);
    inputField.appendChild(input2);

    container.insertBefore(inputField, document.getElementById("add-field-button"));
}

function deleteField(button){
    let field = button.parentNode;
    field.parentElement.removeChild(field)
}

function showFirst(){
    const container = document.getElementById("first-form");
    container.innerHTML = "";

    for (let i = 0; i < nonTerminals.length; i++) {
        if(nonTerminals[i] !== STARTSYMBOL) {
            const firstField = document.createElement("div");
            firstField.classList.add("first-field");

            firstField.innerHTML = "<text class=\"symbol-text\">" + nonTerminals[i] + "</text" +
                "><input type=\"text\" class=\"first-input\"" +
                "/><button class=\"button\" onclick=\"\">C</button" +
                "><input disabled type=\"text\" class=\"first-output\"/>";

            container.appendChild(firstField);
        }
    }
    document.getElementById("first-container").style.visibility = "visible";
}

function showFollow(){
    const container = document.getElementById("follow-form");
    container.innerHTML = "";

    let symbols = nonTerminals.concat(terminals);

    for (let i = 0; i < symbols.length; i++) {
        if(symbols[i] !== "-" && symbols[i] !== STARTSYMBOL) {
            const followField = document.createElement("div");
            followField.classList.add("follow-field");

            followField.innerHTML = "<text class=\"symbol-text\">" + symbols[i] + "</text" +
                "><input type=\"text\" class=\"follow-input\"" +
                "/><button class=\"button\" onclick=\"\">C</button" +
                "><input disabled type=\"text\" class=\"follow-output\"/>";

            container.appendChild(followField);
        }
    }
    document.getElementById("follow-container").style.visibility = "visible";


}