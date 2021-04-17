function fillInput(productionRules){
    resetAll();
    const container = document.getElementById("input-form");
    let counter = 0;
    for (let i = 0; i < Object.keys(productionRules).length; i++) {
        for (let j = 0; j < productionRules[Object.keys(productionRules)[i]].length; j++) {
            if(container.getElementsByClassName("nonterminal").length <= counter){
                addField();
            }
            container.getElementsByClassName("nonterminal")[counter].value = Object.keys(productionRules)[i];
            container.getElementsByClassName("production-rule")[counter].value = productionRules[Object.keys(productionRules)[i]][j];
            counter++;
        }
    }
}

// function getTestProductionRules() {
//     return {X: ['S'], S: ['ABCDEF', 'ABC'], A : ['BC', 'aB'], B: ['C', 'b'], C: ['c', '-'], D: ['d'], E: ['e', '-'], F: ['f']};
// }

function getTestProductionRules() {
    EMPTY = '-';
    return {X: ['S'], S: ['A B C D E F | A B C | a'], A : ['B C', 'a B'], B: ['C', 'b'], C: ['c | | c'], D: ['d'], E: ['e', '-'], F: ['f']}
}

function getMathGrammar(){
    EMPTY = "epsilon";
    return{X: ["Summe"], Summe: ["Summe + Summe", "Summe - Summe", "Produkt"], Produkt: ["Produkt * Produkt", "Klammer", "Exponent"], Klammer: ["( Summe )", "Konstante"], Exponent: ["Klammer ^ Klammer"]}
}