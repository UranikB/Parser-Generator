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

function getTotallyOversizedGrammar() {
    EMPTY = '-';
    return {X: ['S'], S: ['A B C D E F | A B C | a'], A : ['B C', 'a B'], B: ['C', 'b'], C: ['c | | c'], D: ['d'], E: ['e', '-'], F: ['f']}
}

function getMathGrammar(){
    EMPTY = 'e';
    return{X: ['S'], S: ['S + S', 'S - S', 'P'], P: ['P * P', 'B * P', 'P * B', 'B * B', 'E'], B: ['( S )', 'a'], E: ['B ^ B']}
}

function getSmallMathGrammar(){
    EMPTY = 'e';
    return{X: ['S'], S: ['S + T', 'T'], T: ['T * F', 'F'], F: ['( S )', 'const']}
}

function getSmallGrammar(){
    EMPTY = '-'
    return{X: ['S'], S: ['A + S', 'A'], A: ['a']}
}

function getOrdinarylySizedGrammar(){
    EMPTY = '-'
    return{X: ['S'], S: ['A + S', 'B - S', 'C'], A: ['A a', 'a'], B: ['B b', 'b'], C: ['C c', 'c']}
}