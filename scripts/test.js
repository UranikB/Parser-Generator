function initializeValuesForTesting(){
    const container = document.getElementById("input-form");
    let productionRules = getMathGrammar();
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
    return {X: ['S'], S: ['ABCDEF | ABC | a'], A : ['BC', 'aB'], B: ['C', 'b'], C: ['c | | c'], D: ['d'], E: ['e', '-'], F: ['f']}
}

function getMathGrammar(){
    return{X: ['S'], S: ['S+S', 'S-S', 'P'], P: ['P*P', 'B*P', 'P*B', 'B*B', 'E'], B: ['(S)', 'a'], E: ['B^B']}
}