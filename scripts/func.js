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
    // const container = document.getElementById("input-form");
    // let nonTerminalInput = container.getElementsByClassName("nonterminal");
    // let nonTerminalSymbols = [];
    // for (let i = 0; i < nonTerminalInput.length; i++) {
    //     if(!(nonTerminalInput[i].value === "")) {
    //         if (!nonTerminalSymbols.includes(nonTerminalInput[i].value)) {
    //             nonTerminalSymbols.push(nonTerminalInput[i].value);
    //         }
    //     }
    // }
    // let table = document.getElementById("table");
    // alert("ja");
    // if(table){
    //     alert("nein");
    //     table.parentNode.removeChild(table);
    // }
    // alert("oh");
    // table = document.createElement("table");
    // const thead = document.createElement("thead");
    // const theadRow = document.createElement("tr");
    // for (let i = 0; i < nonTerminalSymbols.length; i++) {
    //     let headElement = document.createElement("th");
    //     headElement.innerHTML = nonTerminalSymbols[i];
    //     theadRow.append(headElement);
    // }
    // thead.append(theadRow);
    // table.append(thead);
    // document.getElementById("table-container").appendChild(table);
    const table = document.getElementById("table-container");
    table.style.visibility = "visible";
}

function showAutomaton(){
    const automaton = document.getElementById("automaton-container");
    automaton.style.visibility = "visible";
}