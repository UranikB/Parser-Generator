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

function getNonTerminalSymbols(){
    const container = document.getElementById("input-form");
    let nonTerminalInput = container.getElementsByClassName("nonterminal");
    let nonTerminalSymbols = [];
    for (let i = 0; i < nonTerminalInput.length; i++) {
        if (!(nonTerminalSymbols.includes(nonTerminalInput[i].value))
        && (nonTerminalInput[i].value === (nonTerminalInput[i].value).toUpperCase())) {
            nonTerminalSymbols.push(nonTerminalInput[i].value);
        }
    }
    return nonTerminalSymbols;
}

function getNonTerminalSymbolsWithDoubles(){
    const container = document.getElementById("input-form");
    let nonTerminalInput = container.getElementsByClassName("nonterminal");
    let nonTerminalSymbols = [];
    for (let i = 0; i < nonTerminalInput.length; i++) {
        if (nonTerminalInput[i].value === (nonTerminalInput[i].value).toUpperCase()) {
            nonTerminalSymbols.push(nonTerminalInput[i].value);
        }
    }
    return nonTerminalSymbols;
}

function getAllProductionRules(){
    const container = document.getElementById("input-form");
    let productionInput = container.getElementsByClassName("production-rule");
    let productionRules = [];
    for (let i = 0; i < productionInput.length; i++) {
        productionRules.push(productionInput[i].value);
    }
    return productionRules;
}

function getProductionRulesOf(nonTerminalSymbol){
    if(nonTerminalSymbol === "S\'"){
        return 'S';
    }
    let nonTerminalSymbols = getNonTerminalSymbolsWithDoubles();
    let nonTerminalString = "S\'";
    let allProductionRules = getAllProductionRules();
    let productionRules = [];
    for (let i = 1; i < nonTerminalSymbols.length; i++) {
        nonTerminalString += nonTerminalSymbols[i];
    }
    for (let i = 2; i < nonTerminalString.length; i++) {
        if (nonTerminalString[i] === nonTerminalSymbol) {
            productionRules.push(allProductionRules[i - 1]); //Because "S'" needs two slots
        }
    }
    return productionRules;
}

function getTerminalSymbols(){
    let allProductionRules = getAllProductionRules();
    let terminalAsString = "";
    let terminalSymbols = [];
    for (let i = 0; i < allProductionRules.length; i++) {
        terminalAsString += allProductionRules[i];
    }
    for (let i = 0; i < terminalAsString.length; i++) {
        if ((!terminalSymbols.includes(terminalAsString[i]))
        && (terminalAsString[i] === terminalAsString.toLowerCase()[i])){
            terminalSymbols.push(terminalAsString[i]);
        }
    }
    return terminalSymbols;
}

function getProductionRules() {
    let nonTerminalSymbols = getNonTerminalSymbols();

    let productionRulesTable = [];
    let productionRulesOfNonTerminal = [];

    for (let i = 0; i < nonTerminalSymbols.length; i++) {
        productionRulesOfNonTerminal = getProductionRulesOf(nonTerminalSymbols[i]);
        productionRulesTable[i] = nonTerminalSymbols[i].toString() + ": " + productionRulesOfNonTerminal.toString() + "\; ";
    }
    return productionRulesTable;
}

function showTable(){
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

    const container = document.getElementById("table");
    container.insertBefore(table, null);
}

function showAutomaton(){
    const automaton = document.getElementById("automaton-container");
    automaton.style.visibility = "visible";
}

function showFollowOf(terminalSymbol){
    const container = document.getElementById("input-form");
    let nonTerminalInput = container.getElementsByClassName("nonterminal");
    let productionRules = container.getElementsByClassName("production-rule");

    let follow = [];
    let memory = [];

    for (let i = 0; i < nonTerminalInput; i++) {
        if(nonTerminalInput[i].value.toString() === terminalSymbol.toString()){

        }
    }

    let nonTerminalSymbols = [];
    for (let i = 0; i < nonTerminalInput.length; i++) {
        if (!(nonTerminalInput[i].value in nonTerminalSymbols)) {
            let firstProductionSymbol = Array.from(productionRules[i].value)[0]
            if(firstProductionSymbol.match(/[a-zäöüß]$/)){                        // -> Terminal Symbol
                nonTerminalSymbols.push([nonTerminalInput[i].value][firstProductionSymbol]);
            }
            else if (firstProductionSymbol.match(/[A-ZÄÖÜ]$/)){                   // -> non Terminal Symbol

            }
            nonTerminalSymbols.push([nonTerminalInput[i].value][productionRules[i].value]);
        }
    }
}