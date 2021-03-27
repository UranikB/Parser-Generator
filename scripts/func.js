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

    initializeValuesForTesting();

    let input = getInput();

    let terminals = input[0];
    console.log("Terminals: " + terminals);
    let nts = input[1];
    console.log("NTS: " + nts);
    console.log("Production Rules:")
    let productionRules = input[2];
    console.log(productionRules);

    //generateFirsts(getTerminalSymbols(), topologicalSorting(getNonTerminalSymbols(), getProductionRules()), getProductionRules());
    generateFirsts(terminals, nts, productionRules);
    generateFollow(terminals, nts, productionRules);

    //getProductionRules();

    showTable();
    // showAutomaton();
}

function initializeValuesForTesting(){
    const container = document.getElementById("input-form");
    let productionRules = getOtherTestProductionRules();
    let counter = 0;
    for (let i = 0; i < Object.keys(productionRules).length - 1; i++) {
        for (let j = 0; j < productionRules[Object.keys(productionRules)[i]].length; j++) {
            addField();
        }
    }
    for (let i = 0; i < Object.keys(productionRules).length; i++) {
        for (let j = 0; j < productionRules[Object.keys(productionRules)[i]].length; j++) {
            container.getElementsByClassName("nonterminal")[counter].value = Object.keys(productionRules)[i];
            container.getElementsByClassName("production-rule")[counter].value = productionRules[Object.keys(productionRules)[i]][j];
            counter++;
        }
    }
}

/**
 * @returns all production rules of every NTS as an object array. The keys are the NTS.
 */
function getInput() {
    const container = document.getElementById("input-form");
    let nonTerminalInput = container.getElementsByClassName("nonterminal");
    let productionRulesInput = container.getElementsByClassName("production-rule");

    let productionRules = {};
    let terminals = [];
    let nonTerminals = ['X'];

    for (let i = 0; i < nonTerminalInput.length; i++) {
        if(!(nonTerminalInput[i].value in productionRules)){
            productionRules[nonTerminalInput[i].value] = [];
        }
        productionRules[nonTerminalInput[i].value].push(productionRulesInput[i].value.replace(/\s+/g, ''));
        for (let j = 0; j < productionRulesInput[i].value.length; j++) {
            if(!(productionRulesInput[i].value[j] === " ")){
                if(isNT(productionRulesInput[i].value[j])){
                    append(productionRulesInput[i].value[j], nonTerminals);
                }
                else{
                    append(productionRulesInput[i].value[j], terminals);
                }
            }

        }
    }
    return [terminals, nonTerminals, productionRules];
}

function showTable(){
    let input = getInput();
    let nonTerminalSymbols = input[1];
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

/* FOLLOW */

let follow = {};

/**
 * This function generates the follow sets of all given symbols. It has to be called after first is calculated.
 */
function generateFollow(terminals, nonTerminals, productionRules){
    initFollow(nonTerminals, terminals);
    let changed = true;
    let counter = 0;
    console.log("terminals");
    console.log(terminals);
    console.log("nonterminals");
    console.log(nonTerminals);
    console.log("production rules");
    console.log(productionRules);

    while(changed){
        changed = false;
        console.log("Going through all production rules");
        for (let i = 0; i < nonTerminals.length; i++) {
            console.log("   Going through production rules " + productionRules[nonTerminals[i]] + " of " + nonTerminals[i]);
            if(nonTerminals[i] === 'X'){
                console.log("   Start Symbol. Follow is $")
                if(append("$", follow[nonTerminals[i]])){
                    changed = true;
                    continue;
                }
            }
            for (let j = 0; j < productionRules[nonTerminals[i]].length; j++) {
                console.log("       Going through production rule " + productionRules[nonTerminals[i]][j] + " of " + nonTerminals[i]);
                if(productionRules[nonTerminals[i]][j].length === 0){
                    console.log("           Rule invalid");
                }
                else {
                    for (let k = 0; k < productionRules[nonTerminals[i]][j].length - 1; k++) {
                        console.log("               Checking " + productionRules[nonTerminals[i]][j][k]);
                        let first = firsts[productionRules[nonTerminals[i]][j][k+1]];
                        console.log(productionRules[nonTerminals[i]][j][k] +"                   First of next symbol: " + first);
                        for (let l = 0; l < first.length; l++) {
                            if(append(first[l], follow[productionRules[nonTerminals[i]][j][k]])){
                                changed = true;
                                console.log(productionRules[nonTerminals[i]][j][k] + "                       Changed was set to true because of first of next");
                                console.log(productionRules[nonTerminals[i]][j][k] + "                       " + first[l] + " added to follow of "); console.log(follow[productionRules[nonTerminals[i]][j][k]]);
                            }
                        }
                        if(first.includes(EMPTY)){
                            console.log(productionRules[nonTerminals[i]][j][k] + "                       It contains empty symbol");
                            for (let l = 0; l < follow[productionRules[nonTerminals[i]][j][k+1]].length; l++) {
                                if(append(follow[productionRules[nonTerminals[i]][j][k+1]][l], follow[productionRules[nonTerminals[i]][j][k]])){
                                    changed = true;
                                    console.log(productionRules[nonTerminals[i]][j][k] + "                       Changed was set to true because of follow of next");
                                    console.log(productionRules[nonTerminals[i]][j][k] + "                       " + follow[productionRules[nonTerminals[i]][j][k+1]][l] + " added to follow of "); console.log(follow[productionRules[nonTerminals[i]][j][k]]);
                                }
                            }

                        }
                    }
                }
                console.log("           Checking last element " + productionRules[nonTerminals[i]][j][productionRules[nonTerminals[i]][j].length - 1]);
                for (let k = 0; k < follow[nonTerminals[i]].length; k++) {
                    console.log("           follow of non terminal" + nonTerminals[i] + "to be added: " + follow[nonTerminals[i]][k]);
                    if(append(follow[nonTerminals[i]][k], follow[productionRules[nonTerminals[i]][j][productionRules[nonTerminals[i]][j].length - 1]])){
                        changed = true;
                        console.log("               Changed was set to true");
                    }
                }

            }
        }
        console.log(counter + "iteration complete. Follow: ");
        console.log(follow);
        counter++;
    }
    console.log("follow was generated");

    console.log("Empty Symbols get removed.");

    for (let i = 0; i < Object.keys(follow).length; i++) {
        console.log("   filtering rule " + follow[Object.keys(follow)[i]] + " of " + Object.keys(follow));
        if(Object.keys(follow)[i] === EMPTY){
            delete follow[Object.keys(follow)[i]];
        }
        let followSet = follow[Object.keys(follow)[i]]
        for (let j = 0; j < followSet.length; j++) {
            if(followSet[j] === EMPTY){
                followSet.splice(j, 1);
            }
        }
        console.log("         result of filter: " + follow[Object.keys(follow)[i]]);
    }

    console.log(follow);
}

function initFollow(nonTerminalSymbols, terminalSymbols){
    for(let i = 0; i < terminalSymbols.length; i++){
        follow[terminalSymbols[i]] = [];
    }
    for(let i = 0; i < nonTerminalSymbols.length; i++){
        follow[nonTerminalSymbols[i]] = [];
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
    console.log("nts: " + nonTerminalSymbols);
    console.log("ts: " + terminalSymbols);
    console.log("pr: ");
    console.log(productionRules);
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
    return ['X', 'S', 'A', 'B', 'C', 'D'];
}

function getTestTerminalSymbols() {
    return ['a', 'b', 'c', 'd', '-'];
}

function getTestProductionRules() {
    return {A : ['BCD', 'CD', 'D', 'a'], B: ['CD', 'D' , 'b' , '-'], C: ['D', 'c', '-'], D: ['d', '-']};
}

function getOtherTestProductionRules() {
    return {"X": ['S'], S: ['ABCDEF', 'ABC'], A : ['BC', 'aB'], B: ['C', 'b'], C: ['c', '-'], D: ['d'], E: ['e', '-'], F: ['f']};
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
