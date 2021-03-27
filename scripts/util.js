/**
 * Checks whether str is nonterminal
 * @param str: to be checked
 * @returns boolean
 */
function isNT(str) {
    return str.length === 1 && !!str.match(/[A-Z]/);
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
