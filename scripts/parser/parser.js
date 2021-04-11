function parseGrammar() {
    let input = getInput();
    terminals = input[0].sort();
    log("Terminals: " + terminals);
    nonTerminals = input[1].sort();
    log("NTS: " + nonTerminals);
    log("Production Rules:");
    productionRules = input[2];
    log(productionRules);

    try {
        console.time("First");
        generateFirsts(terminals, topologicalSorting(nonTerminals, productionRules), productionRules);
        console.timeEnd("First");
        console.time("Follow");
        generateFollow(terminals, nonTerminals, productionRules);
        console.timeEnd("Follow");
        showFirst();
        showFollow();
    } catch (e) {
        document.getElementById("parse-grammar-button").style.backgroundColor = "red";
    }
}


function getInput() {
    const container = document.getElementById("input-form");
    let nonTerminalInput = container.getElementsByClassName("nonterminal");
    let productionRulesInput = container.getElementsByClassName("production-rule");

    let processedProductionRules = [];
    let processedNonTerminals = [];

    let productionRules = {};
    let terminals = [];
    let nonTerminals = ['X'];

    for (let i = 0; i < productionRulesInput.length ; i++) {
        let rules = productionRulesInput[i].value.split('|');
        for (let j = 0; j < rules.length; j++) {
            processedProductionRules.push(rules[j]);
            processedNonTerminals.push(nonTerminalInput[i].value)
        }
    }

    log(processedProductionRules);

    for (let i = 0; i < processedNonTerminals.length; i++) {
        let rule = processedProductionRules[i].replace(/\s+/g, '');
        if(rule === ""){
            rule = EMPTY;
        }
        if(!(processedNonTerminals[i] in productionRules)){
            productionRules[processedNonTerminals[i]] = [];
        }
        productionRules[processedNonTerminals[i]].push(rule);
        for (let j = 0; j < processedProductionRules[i].length; j++) {
            if(!(processedProductionRules[i][j] === " ")){
                if(isNT(processedProductionRules[i][j])){
                    append(processedProductionRules[i][j], nonTerminals);
                }
                else{
                    append(processedProductionRules[i][j], terminals);
                }
            }

        }
    }
    log([terminals, nonTerminals, productionRules]);

    return [terminals, nonTerminals, productionRules];
}