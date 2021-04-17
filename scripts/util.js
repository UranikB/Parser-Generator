/**
 * Checks whether str is nonterminal
 * @param symbol: to be checked
 * @returns boolean
 */
function isNT(symbol) {
    return nonTerminals.includes(symbol);
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

function log(string) {
    if (logging === "ALL") console.log(string);
    if (logging === "OBJECTS") {
        if(typeof string !== 'string') console.log(string);
    }
}

/**
 * Checks whether two arrays include each other. Only works, if every entry appears only once.
 * @param firstArray
 * @param secondArray
 * @return {boolean}
 */
function compareArrays(firstArray, secondArray){
    let equal = true;
    for (let i = 0; i < firstArray.length; i++) {
        if(!secondArray.includes(firstArray[i])){
            equal = false;
            break;
        }
    }
    if(equal){
        for (let i = 0; i < secondArray.length; i++) {
            if(!firstArray.includes(secondArray[i])){
                equal = false;
                break;
            }
        }
    }
    return equal;
}
