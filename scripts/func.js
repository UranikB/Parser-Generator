function addField(){
    const container = document.getElementById("input-form");

    const inputField = document.createElement("div");
    inputField.classList.add("input-field");

    const input1 = document.createElement("input");
    input1.classList.add("nonterminal");
    input1.type = "text";
    input1.onchange =  hideAll;

    const arrow = document.createElement("span");
    arrow.innerHTML = "&#8594;";


    const input2 = document.createElement("input");
    input2.classList.add("production-rule");
    input2.type = "text";
    input2.onchange =  hideAll;

    inputField.innerHTML = "<button class=\"button\" onclick=\"deleteField(this)\"><img src=\"../resources/trashcan.png\"/></button>";
    inputField.appendChild(input1);
    inputField.appendChild(arrow);
    inputField.appendChild(input2);

    container.insertBefore(inputField, document.getElementById("add-field-button"));
}

function deleteField(button){
    let field = button.parentNode;
    if(field.children.item(1).value !== "" || field.children.item(3).value !== ""){
        hideAll();
    }
    field.parentElement.removeChild(field);
}

function createTable(){
    let div = document.getElementById("third-row");

    let table = document.createElement('TABLE');
    table.classList.add("parse-table");

    let input = getInput();

    let firstTableHead = document.createElement('TR');
    table.appendChild(firstTableHead);
    let emptyCell = document.createElement('TD');
    let action = document.createElement('TD');
    let jump = document.createElement('TD');
    action.colSpan = input[0].length;
    jump.colSpan = input[1].length;
    emptyCell.classList.add("thickBorderCell");
    action.classList.add("thickBorderCell");
    action.appendChild(document.createTextNode("Aktion"));
    jump.appendChild(document.createTextNode("Sprung"));
    firstTableHead.appendChild(emptyCell);
    firstTableHead.appendChild(action);
    firstTableHead.appendChild(jump);


    let secondTableHead = document.createElement('TR');
    table.appendChild(secondTableHead);
    let state = document.createElement('TD');
    state.appendChild(document.createTextNode("Zustand"));
    state.classList.add("thickBorderCell");
    state.classList.add("headerCell");
    secondTableHead.appendChild(state);
    for (let i = 0; i < input[0].length; i++) {
        let nonTerminalCell = document.createElement('TD');
        nonTerminalCell.appendChild(document.createTextNode(input[0][i]));
        if (i === input[0].length - 1) nonTerminalCell.classList.add("thickBorderCell");
        nonTerminalCell.classList.add("headerCell");
        secondTableHead.appendChild(nonTerminalCell);
    }
    for (let i = 0; i < input[1].length; i++) {
        let terminalCell = document.createElement('TD');
        terminalCell.appendChild(document.createTextNode(input[1][i]));
        terminalCell.classList.add("headerCell");
        secondTableHead.appendChild(terminalCell);
    }


    let tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);
    for (let i = 0; i < 10; i++) {                             //Example for ten states
        let tableRow = document.createElement('TR');
        tableBody.appendChild(tableRow);
        for (let j = 0; j <= input[0].length + input[1].length; j++) {
            let cell = document.createElement('TD');
            if(j === 0){
                let spanNode = document.createElement('SPAN');
                spanNode.innerHTML = "I<sub>" + i + "</sub>";
                cell.appendChild(spanNode);
            }
            if(j === 0 || j === input[0].length){
                cell.classList.add("thickBorderCell");
            }
            tableRow.appendChild(cell);
        }
    }

    div.appendChild(table);
}

function showFirst(){
    const container = document.getElementById("first-form");
    container.innerHTML = "";

    for (let i = 0; i < nonTerminals.length; i++) {
        if(nonTerminals[i] !== STARTSYMBOL) {
            const firstField = document.createElement("div");
            firstField.id = "first-filed-of-" + nonTerminals[i];
            firstField.classList.add("first-field");

            firstField.innerHTML = "<text class=\"symbol-text\">" + nonTerminals[i] + "</text" +
                "><input type=\"text\" id=\"first-input-of-" + nonTerminals[i] + "\" class=\"first-input\"" +
                "/><button class=\"button\" onclick=\"correctFirst(\'" + nonTerminals[i] + "\')\">&check;</button" +
                "><input disabled type=\"text\" id=\"first-output-of-" + nonTerminals[i] + "\" class=\"first-output\"/>";

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
        if(symbols[i] !== EMPTY && symbols[i] !== STARTSYMBOL) {
            const followField = document.createElement("div");
            followField.classList.add("follow-field");
            followField.id = "follow-field-of-" + symbols[i];

            followField.innerHTML = "<text class=\"symbol-text\">" + symbols[i] + "</text" +
                "><input type=\"text\" id=\"follow-input-of-" + symbols[i] + "\" class=\"follow-input\"" +
                "/><button class=\"button\" onclick=\"correctFollow(\'" + symbols[i] + "\')\">&check;</button" +
                "><input disabled type=\"text\" id=\"follow-output-of-" + symbols[i] + "\" class=\"follow-output\"/>";

            container.appendChild(followField);
        }
    }
    document.getElementById("follow-container").style.visibility = "visible";
}

function hideAll(){
    terminals = [];
    nonTerminals = [];
    productionRules = {};
    first = {};
    follow = {};

    document.getElementById("parse-grammar-button").style.backgroundColor = "white";

    let nts = document.getElementsByClassName("nonterminal");
    for (let i = 1; i < nts.length; i++) {
        nts[i].style.backgroundColor = "white";
    }

    document.getElementById("first-container").style.visibility = "collapse";
    document.getElementById("follow-container").style.visibility = "collapse";
    const thirdRow = document.getElementById("third-row");
    thirdRow.innerHTML = "";
}

function resetAll(){
    terminals = [];
    nonTerminals = [];
    productionRules = {};
    first = {};
    follow = {};

    document.getElementById("first-container").style.visibility = "collapse";
    document.getElementById("follow-container").style.visibility = "collapse";
    const container = document.getElementById("input-form");
    container.innerHTML = "<div class=\"title\"><h3>Eingabe</h3>" +
        "                <button class=\"wide-button\" id=\"parse-grammar-button\" onclick=\"parseGrammar()\">\n" +
        "                    <img src=\"../resources/caret-right-fill.svg\"/>\n" +
        "                </button>\n" +
        "                </div>\n" +
        "                <div id=\"disabled-start-field\" class=\"input-field\">\n" +
        "                   <button class=\"button\"></button\n" +
        "                   ><input disabled type=\"text\" class=\"nonterminal\" value=\"X\"\n" +
        "                   /><span>&#8594;</span\n" +
        "                   ><input disabled type=\"text\" class=\"production-rule\" value=\"S\"/>\n" +
        "               </div>\n" +
        "               <div class=\"input-field\">\n" +
        "                   <button class=\"button\" onclick=\"deleteField(this)\"\n" +
        "                   ><img src=\"../resources/trashcan.png\"\n" +
        "                   /></button><input type=\"text\" class=\"nonterminal\" onchange=\"hideAll()\"\n" +
        "                   /><span>&#8594;</span><input type=\"text\" class=\"production-rule\" onchange=\"hideAll()\"/>\n" +
        "               </div>\n" +
        "               <button class=\"wide-button\" id=\"add-field-button\" onclick=\"addField()\">+</button>"

    const thirdRow = document.getElementById("third-row");
    thirdRow.innerHTML = "";
}


function correctAllFirsts(){
    let nonTerminalSymbols = getInput()[1];
    for (let i = 0; i < nonTerminalSymbols.length; i++) {
        if(nonTerminalSymbols[i] !== STARTSYMBOL && nonTerminalSymbols[i] !== EMPTY){
            correctFirst(nonTerminalSymbols[i]);
        }

    }
}

function correctFirst(nonTerminalSymbol){
    let input = document.getElementById("first-input-of-" + nonTerminalSymbol);
    let output = document.getElementById("first-output-of-" + nonTerminalSymbol);

    let result = "";
    result += first[nonTerminalSymbol][0];
    for (let i = 1; i < first[nonTerminalSymbol].length; i++) {
        result += ", " + first[nonTerminalSymbol][i];
    }
    output.value = result;

    let inputArray = [];
    for (let i = 0; i < input.value.length; i++) {
        if(input.value[i] !== "{"
            && input.value[i] !== "}"
            && input.value[i] !== ","
            && input.value[i] !== ";"
            && input.value[i] !== " "){
            inputArray.push(input.value[i]);
        }
    }

    if(compareArrays(inputArray, first[nonTerminalSymbol])){
        output.style.color = "green";
    }
    else{
        output.style.color = "red";
    }

}

function correctAllFollows(){
    let input = getInput();
    for (let i = 0; i < input[1].length; i++) {
        if(input[1][i] !== STARTSYMBOL && input[1][i] !== EMPTY){
            correctFollow(input[1][i]);
        }
    }
    for (let i = 0; i < input[0].length; i++) {
        if(input[0][i] !== STARTSYMBOL && input[0][i] !== EMPTY){
            correctFollow(input[0][i]);
        }
    }
}

function correctFollow(symbol){
    let input = document.getElementById("follow-input-of-" + symbol);
    let output = document.getElementById("follow-output-of-" + symbol);

    let result = "";
    result += follow[symbol][0];
    for (let i = 1; i < follow[symbol].length; i++) {
        result += ", " + follow[symbol][i];
    }
    output.value = result;

    let inputArray;
    let commaCounter = 0;
    let semiColonCounter = 0;
    for (let i = 0; i < input.value.length; i++) {
        if (input.value[i] === "{" || input.value[i] === "}") {
            input.value[i] = "";
        }
        if(input.value[i] === ",") commaCounter++;
        if(input.value[i] === ";") semiColonCounter++;
    }

    if(commaCounter > semiColonCounter) inputArray = input.value.split(", ");
    else if (commaCounter < semiColonCounter) inputArray = input.value.split("; ");
    else inputArray = input.value.split(" ");

    if(compareArrays(inputArray, follow[symbol])){
        output.style.color = "green";
    }
    else{
        output.style.color = "red";
    }
}