
/**
 * This function generates the follow sets of all given symbols. It has to be called after first is calculated.
 */
function generateFollow(terminals, nonTerminals, productionRules){
    initFollow(nonTerminals, terminals);
    let changed = true;
    let counter = 0;

    while(changed){
        changed = false;
        log("Going through all production rules");
        for (let i = 0; i < nonTerminals.length; i++) {
            log("   Going through production rules " + productionRules[nonTerminals[i]] + " of " + nonTerminals[i]);
            if(nonTerminals[i] === STARTSYMBOL){
                log("   Start Symbol. Follow is $");
                if(append("$", follow[nonTerminals[i]])){
                    changed = true;
                    continue;
                }
            }
            for (let j = 0; j < productionRules[nonTerminals[i]].length; j++) {
                log("       Going through production rule " + productionRules[nonTerminals[i]][j] + " of " + nonTerminals[i]);
                    for (let k = 0; k < productionRules[nonTerminals[i]][j].length - 1; k++) {
                        log("               Checking " + productionRules[nonTerminals[i]][j][k]);
                        let firstSet = first[productionRules[nonTerminals[i]][j][k+1]];
                        log("                   First of next symbol: " + firstSet);
                        for (let l = 0; l < firstSet.length; l++) {
                            if(append(firstSet[l], follow[productionRules[nonTerminals[i]][j][k]])){
                                changed = true;
                                log("                       Changed was set to true because of first of next");
                                log("                       " + firstSet[l] + " added to follow of ");
                                log(follow[productionRules[nonTerminals[i]][j][k]]);
                            }
                        }
                        if(firstSet.includes(EMPTY)){
                            log("                       It contains empty symbol");
                            for (let l = 0; l < follow[productionRules[nonTerminals[i]][j][k+1]].length; l++) {
                                if(append(follow[productionRules[nonTerminals[i]][j][k+1]][l], follow[productionRules[nonTerminals[i]][j][k]])){
                                    changed = true;
                                    log("                       Changed was set to true because of follow of next");
                                    log("                       " + follow[productionRules[nonTerminals[i]][j][k+1]][l] + " added to follow of ");
                                    log(follow[productionRules[nonTerminals[i]][j][k]]);
                                }
                            }

                        }
                    }
                log("           Checking last element " + productionRules[nonTerminals[i]][j][productionRules[nonTerminals[i]][j].length - 1]);
                for (let k = 0; k < follow[nonTerminals[i]].length; k++) {
                    log("           Follow of non terminal " + nonTerminals[i] + " to be added: " + follow[nonTerminals[i]][k]);
                    if(append(follow[nonTerminals[i]][k], follow[productionRules[nonTerminals[i]][j][productionRules[nonTerminals[i]][j].length - 1]])){
                        changed = true;
                        log("               Changed was set to true");
                    }
                }
            }
        }
        log(counter + ". iteration complete. Follow: ");
        log(follow);
        counter++;
    }
    log("Follow was generated");

    log("Empty Symbols get removed.");

    let defined = true;
    for (let i = 0; i < Object.keys(follow).length; i++) {
        log("   Filtering rule " + follow[Object.keys(follow)[i]] + " of " + Object.keys(follow));
        if(Object.keys(follow)[i] === EMPTY){
            delete follow[Object.keys(follow)[i]];
        } else {
            let followSet = follow[Object.keys(follow)[i]];
            for (let j = 0; j < followSet.length; j++) {
                if (followSet[j] === EMPTY) {
                    followSet.splice(j, 1);
                }
            }
        }
        log("         Result of filter: " + follow[Object.keys(follow)[i]]);
        log("         Checking if " + follow[Object.keys(follow)[i]] + " is defined.");
        if(typeof follow[Object.keys(follow)[i]][0] === "undefined"){
            log("               It is not defined.");
            let nts = document.getElementsByClassName("nonterminal");
            for (let j = 0; j < nts.length; j++) {
                if(nts[j].value === Object.keys(follow)[i]){
                    nts[j].style.backgroundColor = "red";
                    defined = false;
                }
            }

        }
    }
    if(!defined) throw "Invalid Symbol";
    log(follow);
}

function initFollow(nonTerminalSymbols, terminalSymbols){
    for(let i = 0; i < terminalSymbols.length; i++){
        follow[terminalSymbols[i]] = [];
    }
    for(let i = 0; i < nonTerminalSymbols.length; i++){
        follow[nonTerminalSymbols[i]] = [];
    }
}
