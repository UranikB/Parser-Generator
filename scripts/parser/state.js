class Element {
    constructor(rule, index) {
        if(index <= rule.length) {
            this.rule = rule;
            this.index = index;
        } else {
            throw "Invalid element"
        }
    }

    equals(element){
        let equals = false;
        if(element.index === this.index && element.rule.length === this.rule.length) {
            equals = true;
            for (let i = 0; i < this.rule.length; i++) {
                if(this.rule[i] !== element.rule){
                    equals = false;
                    break;
                }
            }
        }
        return equals;
    }

    isNotFinished(){
        return (this.index < this.rule.length);
    }

    followingSymbol() {
        if (this.isNotFinished()) {
            return this.rule[this.index];
        } else {
            return '';
        }
    }
}

Element.prototype.toString = function elementToString() {
    let ret;
    if(this.index === 0){
        ret = "." + this.rule[0];
    } else {
        ret = this.rule[0];
    }
    for (let i = 1; i < this.rule.length; i++) {
        if(i === this.index){
            ret += (" ." + this.rule[i]);
        } else {
            ret += (" " + this.rule[i]);
        }
    }
    if(this.index === this.rule.length){
        ret += ".";
    }
    return ret;
};

class Elements {
    constructor(elements) {
        this.elements = elements;
    }

    has(element){
        let isIncluded = false;
        for (let i = 0; i < this.elements.length ; i++) {
            if(element.equals(this.elements[i])){
                isIncluded = true;
                break;
            }
        }
        return isIncluded;
    }

    append(element){
        if(!(this.elements.has(element))){
            this.elements.push(element);
            return true;
        }
        return false;
    }
}


function closure(collection) {
    let changed = true;
    while (changed){
        changed = false;
        for (let i = 0; i < collection.length; i++) {
            if(collection[i].indexOf(".") !== collection[i].length - 1) {
                let symbols = collection[i].split(".")[1];
                log("Symbols after . : " + symbols);
                let nextSymbol = symbols[0];
                log("Next symbol: " + nextSymbol);
                if (isNT(nextSymbol)) {
                    for (let j = 0; j < productionRules[nextSymbol].length; j++) {
                        if (append(("." + productionRules[nextSymbol][j]), collection)) {
                            log("Added rule: " + productionRules[nextSymbol][j]);
                            changed = true;
                        } else {
                            log("Rule already contained: " + productionRules[nextSymbol][j]);
                        }
                    }
                }
            } else {
                log("No symbols after .");
            }
        }
        if (changed) log ("Changes detected, current closure: " + collection)
    }
    return collection;
}

function jump(collection, symbol){
    let jumps = [];
    for (let i = 0; i < collection.length; i++) {
        log("New Iteration");
        log(collection[i]);
        log(jumps);
        if (collection[i].includes("." + symbol)){
            let newElement = collection[i].split("." + symbol)[0] + symbol + "." + collection[i].split("." + symbol)[1];
            append(newElement, jumps);
        }
        log(jumps)
    }
    log(closure(jumps));
    return closure(jumps);
}

function generateStates() {
    let initialCollection = closure(["." + STARTPRODUKTION]);
    log("initial Collection: ");
    log(initialCollection);
    let states = [initialCollection];
    let changed = true;
    while (changed) {
        changed = false;
        for (let i = 0; i < states.length; i++) {
            for (let j = 0; j < states[i].length; j++) {
                log(". at: " + states[i][j].indexOf("."));
                log("Length: ");
                log(states[i][j].length - 1);
                if (states[i][j].indexOf(".") !== states[i][j].length - 1) {
                    let nextSymbol = states[i][j].split(".")[1][0];
                    log("Next Symbol: ");
                    log(nextSymbol);
                    //if (isNT(nextSymbol)) {
                        let collection = jump(states[i], nextSymbol);
                        log("Collection: ");
                        log(collection);
                        if(addCollection(collection, states)){
                            log("Added Collection: " + collection);
                            changed = true;
                        } else {
                            log("Collection already contained: " + collection);
                        }
                    //}
                }
            }
        }
    }
    console.log(states);
}

function addCollection(destination, source) {
    log("Adding Collection");
    log("Checking if already included");
    let isContained = false;
    for (let i = 0; i < source.length; i++) {
        for (let j = 0; j < source[i].length; j++) {
            for (let k = 0; k < destination.length; k++) {
                if(source[i][j] === destination[k]){
                    log("   " + destination[k] + " already included as " + source[i][j]);
                    isContained = true;
                    break
                }
            }
        }
    }
    if(!isContained){
        source.push(destination);
    }
    return !isContained;
}
