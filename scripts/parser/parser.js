function parseGrammar() {


      //  test();
    hideAll();
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
        createTable();
    } catch (e) {
        document.getElementById("parse-grammar-button").style.backgroundColor = "red";
    }
    logging = "ALL";
   generateStates();
}

function getInput() {
    const container = document.getElementById("input-form");
    let nonTerminalInput = container.getElementsByClassName("nonterminal");
    let productionRulesInput = container.getElementsByClassName("production-rule");

    let processedProductionRules = [];
    let processedNonTerminals = [];

    nonTerminals = [];

    for (let i = 0; i < nonTerminalInput.length; i++) {
        append(nonTerminalInput[i].value, nonTerminals);
    }


    for (let i = 0; i < productionRulesInput.length ; i++) {
        let rules = productionRulesInput[i].value.split('|');
        for (let j = 0; j < rules.length; j++) {
            processedProductionRules.push(rules[j]);
            processedNonTerminals.push(nonTerminalInput[i].value)
        }
    }

    log(processedProductionRules);

    for (let i = 0; i < processedNonTerminals.length; i++) {
        let symbolInput = processedProductionRules[i].split(' ');
        let isEmpty = true;
        let processedSymbols = [];

        for (let j = 0; j < symbolInput.length; j++) {
            if(symbolInput[j] !== ''){
                if(!(isNT(symbolInput[j]))){
                    append(symbolInput[j], terminals);
                }
                isEmpty = false;
                processedSymbols.push(symbolInput[j]);
            }
        }
        if(isEmpty){
            processedSymbols.push(EMPTY);
        }

        if(!(processedNonTerminals[i] in productionRules)){
            productionRules[processedNonTerminals[i]] = [];
        }
        productionRules[processedNonTerminals[i]].push(processedSymbols);
    }
    console.log([terminals, nonTerminals, productionRules]);

    return [terminals, nonTerminals, productionRules];
}