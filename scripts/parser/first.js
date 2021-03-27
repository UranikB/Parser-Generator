
/**
 * @param terminalSymbols: Array of all terminal-symbols represented by uppercase letters
 * @param nonTerminalSymbols: Array of all nonterminal-symbols represented as uppercase letters
 */
function initFirsts(terminalSymbols, nonTerminalSymbols){
    for(let i = 0; i < terminalSymbols.length; i++){
        first[terminalSymbols[i]] = [terminalSymbols[i]];
    }
    for(let i = 0; i < nonTerminalSymbols.length; i++){
        first[nonTerminalSymbols[i]] = [];
    }
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
        log(i + ". iteration");
        changed = false;
        for(let i = 0; i < nonTerminalSymbols.length; i++){
            log("Next symbol: " + nonTerminalSymbols[i]);
            if(generateFirstOfNT(nonTerminalSymbols[i], productionRules)){
                changed = true;
                log(nonTerminalSymbols[i] + ":    Changes detected");
            } else {
                log(nonTerminalSymbols[i] + ":    No changes detected");
            }
        }
        if(changed) log("Another iteration needed because of changes");
        i++;
    }
    log("Results after " + i + " iterations:");
    log(first);
}

/**
 * @param nonTerminal: nonterminal-symbol represented by uppercase letter
 * @param productionRules: Map of nonterminal-symbols (keys) to array of all production rules of this NT (value)
 * These production rules are stored as strings
 */
function generateFirstOfNT(nonTerminal, productionRules) {
    let changed = false;
    log(nonTerminal + ":    Rules: " + productionRules[nonTerminal]);
    for(let i = 0; i < productionRules[nonTerminal].length; i++){
        log(nonTerminal + ":        Next Rule: " + productionRules[nonTerminal][i]);
        if(productionRules[nonTerminal][i] === EMPTY){
            if(append(EMPTY, first[nonTerminal])){
                log(nonTerminal + ":            Adding EMPTY");
                changed = true;
            } else {
                log(nonTerminal + ":            EMPTY already included");
            }
        } else {
            log(nonTerminal + ":        Current First: " + first[nonTerminal]);
            for (let j = 0; j < productionRules[nonTerminal][i].length; j++) {
                log(nonTerminal + ":            Next symbol: " + productionRules[nonTerminal][i][j]);
                log(nonTerminal + ":            First of " + productionRules[nonTerminal][i][j] + ": " + first[productionRules[nonTerminal][i][j]]);
                for (let k = 0; k < first[productionRules[nonTerminal][i][j]].length; k++) {
                    if(!(first[productionRules[nonTerminal][i][j]][k] === EMPTY)) {
                        if (append(first[productionRules[nonTerminal][i][j]][k], first[nonTerminal])) {
                            log(nonTerminal + ":                Adding: " + first[productionRules[nonTerminal][i][j]][k]);
                            changed = true;
                        } else {
                            log(nonTerminal + ":                " + first[productionRules[nonTerminal][i][j]][k] + " already included");
                        }
                    }
                }
                if (first[productionRules[nonTerminal][i][j]].includes(EMPTY)) {
                    if ((j + 1) === productionRules[nonTerminal][i].length) {
                        log(nonTerminal + ":                First of last symbol contains EMPTY");
                        if (append(EMPTY, first[nonTerminal])) {
                            log(nonTerminal + ":                    Adding EMPTY");
                            changed = true;
                        } else {
                            log(nonTerminal + ":                    EMPTY already included");
                        }
                        break;
                    } else {
                        log(nonTerminal + ":                First of current symbol contains EMPTY");
                        log(nonTerminal + ":                    Continuing with next symbol");
                    }
                } else {
                    log(nonTerminal + ":                First of current symbol contains no EMPTY");
                    log(nonTerminal + ":                    Exiting current rule");
                    break;
                }
            }
        }
        if(changed) log(nonTerminal + ":        Updating First to: " + first[nonTerminal]);
    }
    return changed;
}