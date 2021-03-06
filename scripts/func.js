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

    inputField.innerHTML = "<button class=\"delete-field-button\" onclick=\"deleteField(this)\"><img src=\"../resources/trash.svg\"/></button>";
    inputField.appendChild(input1);
    inputField.appendChild(arrow);
    inputField.appendChild(input2);

    container.insertBefore(inputField, document.getElementById("add-field-button"));
}

function deleteField(button){
    let field = button.parentNode;
    field.parentElement.removeChild(field)
}

function parseGrammar() {
    showTable();
    showAutomaton();
}

function showTable(){
    const container = document.getElementById("input-form");
    let nonTerminalInput = container.getElementsByClassName("nonterminal");
    let nonTerminalSymbols = ["S"];
    for (let i = 0; i < nonTerminalInput.length; i++) {
        if (!(nonTerminalInput[i].value in nonTerminalSymbols)) {
            nonTerminalSymbols.push(nonTerminalInput[i].value);
        }
    }
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const theadRow = document.createElement("tr");
    let columns = new Array(nonTerminalSymbols.length);
    for (let i = 0; i < nonTerminalSymbols.length; i++) {
        columns[i] = document.createElement("th");
        columns[i].value = nonTerminalSymbols[i];
        theadRow.append(columns[i]);
    }
    thead.append(theadRow);
    table.append(thead);
}

function showAutomaton(){
    const automaton = document.getElementById("automaton");
    automaton.style.visibility = "visible";
}