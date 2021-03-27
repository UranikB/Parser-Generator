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
        log(productionRules[nonTerminalSymbols[i]]);
        for(let j = 0; j < productionRules[nonTerminalSymbols[i]].length; j++){
            //Iterate through the characters of the production
            log("   "  + productionRules[nonTerminalSymbols[i]][j]);
            for(let k = 0; k < productionRules[nonTerminalSymbols[i]][j].length; k++){
                //Check if production contains NT
                log("       " + productionRules[nonTerminalSymbols[i]][j] + "(" + productionRules[nonTerminalSymbols[i]][j].length + ")" + ": " + productionRules[nonTerminalSymbols[i]][j][k]);
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
    log(dependencies);
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
