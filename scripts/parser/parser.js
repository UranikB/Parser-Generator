function parseGrammar() {

    initializeValuesForTesting();

    let input = getInput();
    let terminals = input[0];
    log("Terminals: " + terminals);
    let nts = input[1];
    log("NTS: " + nts);
    log("Production Rules:");
    let productionRules = input[2];
    log(productionRules);

    console.time("First");
    generateFirsts(terminals, topologicalSorting(nts, productionRules), productionRules);
    console.timeEnd("First");
    console.time("Follow");
    generateFollow(terminals, nts, productionRules);
    console.timeEnd("Follow");

    showFirst();
    showFollow();
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