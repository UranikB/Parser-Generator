let EMPTY = "-";

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
    //topologicalSorting(getNonTeminalSymbols(),getProductionRules())
    generateFirsts(getTestTerminalSymbols(), topologicalSorting(getTestNonTerminalSymbols(), getTestProductionRules()), getTestProductionRules());
    generateFirsts(getTestTerminalSymbols(), getTestNonTerminalSymbols(), getTestProductionRules());

    // showTable();
    // showAutomaton();
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


/*FIRSTS*/



let firsts = {};

/**
 *
 * @param nonTerminalSymbols: Array of all nonterminal-symbols represented by uppercase letters
 * @param productionRules: Map of nonterminal-symbols (keys) to array of all production rules of this NT (value)
 * These production rules are stored as strings
 */

function topologicalSorting(nonTerminalSymbols, productionRules){
    var dependencies = {};
    //Initialize dependencies
    for(let i = 0; i < nonTerminalSymbols.length; i++) {
        dependencies[nonTerminalSymbols[i]] = [];
    }
    //Iterate through NTs
    for(let i = 0; i < nonTerminalSymbols.length; i++){
        //Iterate through the according production rules
        console.log(productionRules[nonTerminalSymbols[i]]);
        for(let j = 0; j < productionRules[nonTerminalSymbols[i]].length; j++){
            //Iterate through the characters of the production
            console.log("   "  + productionRules[nonTerminalSymbols[i]][j]);
            for(let k = 0; k < productionRules[nonTerminalSymbols[i]][j].length; k++){
                //Check if production contains NT
                console.log("       " + productionRules[nonTerminalSymbols[i]][j] + "(" + productionRules[nonTerminalSymbols[i]][j].length + ")" + ": " + productionRules[nonTerminalSymbols[i]][j][k]);
                if(isNT(productionRules[nonTerminalSymbols[i]][j][k])){
                    //Add as dependency
                    if(!(nonTerminalSymbols[i] in dependencies)){
                        dependencies[nonTerminalSymbols[i]] = [];
                        dependencies[nonTerminalSymbols[i]].push(productionRules[nonTerminalSymbols[i]][j][k])
                    } else if(!dependencies[nonTerminalSymbols[i]].includes(productionRules[nonTerminalSymbols[i]][j][k])){
                        dependencies[nonTerminalSymbols[i]].push(productionRules[nonTerminalSymbols[i]][j][k])
                    }
                }
            }
        }
    }
    console.log(dependencies);
    let maxDependencies = 0;
    for(let i = 0; i < nonTerminalSymbols.length; i++) {
        if(maxDependencies < dependencies[nonTerminalSymbols[i]].length){
            maxDependencies = dependencies[nonTerminalSymbols[i]].length;
        }
    }
    let sortedNonTerminals = [];
    for(let i = 0; i <= maxDependencies; i++) {
        for (let j = 0; j < nonTerminalSymbols.length; j++) {
            if (dependencies[nonTerminalSymbols[j]].length === i) {
                sortedNonTerminals.push(nonTerminalSymbols[j]);
            }
        }
    }
    return sortedNonTerminals;
}

/**
 * @param terminalSymbols: Array of all terminal-symbols represented by uppercase letters
 * @param nonTerminalSymbols: Array of all nonterminal-symbols represented as uppercase letters
 * @param productionRules: Map of nonterminal-symbols (keys) to array of all production rules of this NT (value)
 * These production rules are stored as strings
 */
function generateFirsts(terminalSymbols, nonTerminalSymbols, productionRules) {
    initFirsts(terminalSymbols, nonTerminalSymbols);
    let changed = true;
    let i = 1;
    while(changed){
        console.log(i + ". iteration");
        changed = false;
        for(let i = 0; i < nonTerminalSymbols.length; i++){
            console.log("Next symbol: " + nonTerminalSymbols[i]);
            if(generateFirstOfNT(nonTerminalSymbols[i], productionRules)){
                changed = true;
                console.log(nonTerminalSymbols[i] + ":    Changes detected");
            } else {
                console.log(nonTerminalSymbols[i] + ":    No changes detected");
            }
        }
        if(changed) console.log("Another iteration needed because of changes");
        i++;
    }
    console.log("Results after " + i + " iterations:");
    console.log(firsts);
}

/**
 * @param terminalSymbols: Array of all terminal-symbols represented by uppercase letters
 * @param nonTerminalSymbols: Array of all nonterminal-symbols represented as uppercase letters
 */
function initFirsts(terminalSymbols, nonTerminalSymbols){
    for(let i = 0; i < terminalSymbols.length; i++){
        firsts[terminalSymbols[i]] = [terminalSymbols[i]];
    }
    for(let i = 0; i < nonTerminalSymbols.length; i++){
        firsts[nonTerminalSymbols[i]] = [];
    }
}

/**
 * @param nonTerminal: nonterminal-symbol represented by uppercase letter
 * @param productionRules: Map of nonterminal-symbols (keys) to array of all production rules of this NT (value)
 * These production rules are stored as strings
 */
function generateFirstOfNT(nonTerminal, productionRules) {
    let changed = false;
    console.log(nonTerminal + ":    Rules: " + productionRules[nonTerminal]);
    for(let i = 0; i < productionRules[nonTerminal].length; i++){
        console.log(nonTerminal + ":        Next Rule: " + productionRules[nonTerminal][i]);
        if(productionRules[nonTerminal][i] === EMPTY){
            if(append(EMPTY, firsts[nonTerminal])){
                console.log(nonTerminal + ":            Adding EMPTY");
                changed = true;
            } else {
                console.log(nonTerminal + ":            EMPTY already included");
            }
        } else {
            console.log(nonTerminal + ":        Current First: " + firsts[nonTerminal]);
            for (let j = 0; j < productionRules[nonTerminal][i].length; j++) {
                console.log(nonTerminal + ":            Next symbol: " + productionRules[nonTerminal][i][j]);
                console.log(nonTerminal + ":            First of " + productionRules[nonTerminal][i][j] + ": " + firsts[productionRules[nonTerminal][i][j]]);
                for (let k = 0; k < firsts[productionRules[nonTerminal][i][j]].length; k++) {
                    if(!(firsts[productionRules[nonTerminal][i][j]][k] === EMPTY)) {
                        if (append(firsts[productionRules[nonTerminal][i][j]][k], firsts[nonTerminal])) {
                            console.log(nonTerminal + ":                Adding: " + firsts[productionRules[nonTerminal][i][j]][k]);
                            changed = true;
                        } else {
                            console.log(nonTerminal + ":                " + firsts[productionRules[nonTerminal][i][j]][k] + " already included");
                        }
                    }
                }
                if (firsts[productionRules[nonTerminal][i][j]].includes(EMPTY)) {
                    if ((j + 1) === productionRules[nonTerminal][i].length) {
                        console.log(nonTerminal + ":                First of last symbol contains EMPTY");
                        if (append(EMPTY, firsts[nonTerminal])) {
                            console.log(nonTerminal + ":                    Adding EMPTY");
                            changed = true;
                        } else {
                            console.log(nonTerminal + ":                    EMPTY already included");
                        }
                        break;
                    } else {
                        console.log(nonTerminal + ":                First of current symbol contains EMPTY");
                        console.log(nonTerminal + ":                    Continuing with next symbol");
                    }
                } else {
                    console.log(nonTerminal + ":                First of current symbol contains no EMPTY");
                    console.log(nonTerminal + ":                    Exiting current rule");
                    break;
                }
            }
        }
        if(changed) console.log(nonTerminal + ":        Updating First to: " + firsts[nonTerminal]);
    }
    return changed;
}

function getTestNonTerminalSymbols() {
    return ['A', 'B', 'C', 'D'];
}

function getTestTerminalSymbols() {
    return ['a', 'b', 'c', 'd', '-'];
}

function getTestProductionRules() {
    return {A : ['BCD', 'CD', 'D', 'a'], B: ['CD', 'D' , 'b' , '-'], C: ['D', 'c', '-'], D: ['d', '-']};
}

/**
 * Checks whether str is nonterminal
 * @param str: to be checked
 * @returns boolean
 */
function isNT(str) {
    return str.length === 1 && !!str.match(/[A-Z]/);
}

/**
 * Checks whether str is included and appends it if not
 * @param str: to add
 * @param array: to be added to
 * @returns boolean
 */
function append(str, array) {
    if(!(array.includes(str))){
        array.push(str);
        return true;
    }
    return false;
}
