class Element {
    constructor(rule, index) {
        if(rule === undefined){
            rule = [];
        }
        if(index === undefined){
            index = 0;
        }
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
                if(this.rule[i] !== element.rule[i]){
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
        }
    }
}

Element.prototype.toString = function elementToString() {
    let ret;
    if(this.index === 0){
        ret = ". " + this.rule[0];
    } else {
        ret = this.rule[0];
    }
    for (let i = 1; i < this.rule.length; i++) {
        if(i === this.index){
            ret += (" . " + this.rule[i]);
        } else {
            ret += (" " + this.rule[i]);
        }
    }
    if(this.index === this.rule.length){
        ret += " .";
    }
    return ret;
};

class Collection {
    constructor(elements) {
        if(elements === undefined){
            elements = [];
        }
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
        if(!(this.has(element))){
            this.elements.push(element);
            return true;
        }
        return false;
    }

    equals(collection){
        let equal = true;
        for (let i = 0; i < this.elements.length; i++) {
            if(!collection.has(this.elements[i])){
                equal = false;
                break;
            }
        }
        if(equal){
            for (let i = 0; i < collection.length; i++) {
                if(!this.elements.has(collection[i])){
                    equal = false;
                    break;
                }
            }
        }
        return equal;
    }
}

Collection.prototype.toString = function collectionToString() {
    return "(" + this.elements.toString() + ")"
};

class Collections {
    constructor(collections) {
        if(collections === undefined){
            collections = [];
        }
        this.collections = collections;
    }

    has(collection){
        let isIncluded = false;
        for (let i = 0; i < this.collections.length ; i++) {
            if(this.collections[i].equals(collection)){
                isIncluded = true;
                break;
            }
        }
        return isIncluded;
    }

    append(collection){
        if(!(this.has(collection))){
            this.collections.push(collection);
            return true;
        }
        return false;
    }
}

Collections.prototype.toString = function collectionsToString() {
    return "[" + this.collections.toString() + "]"
};

function closure(collection) {
    log("                   Calculating (" + collection + ")-Closure");
    let changed = true;

    let itr = 1;

    while (changed){
        changed = false;
        log("                       " + itr + ". iteration");
        for (let i = 0; i < collection.elements.length; i++) {
            if(collection.elements[i].isNotFinished()) {
                let nextSymbol = collection.elements[i].followingSymbol();
                log("                           Current collection: " + collection.elements[i]);
                if (isNT(nextSymbol)) {
                    log("                               " + nextSymbol + " is nonTerminal");
                    for (let j = 0; j < productionRules[nextSymbol].length; j++) {
                        let element = new Element(productionRules[nextSymbol][j]);
                        log("                               Current element: " + element);
                        if (collection.append(element)) {
                            log("                               Added current element to: " + collection);
                            changed = true;
                        } else {
                            log("                               Element already contained in: " + collection);
                        }
                    }
                } else {
                    log("                               " + nextSymbol + " is terminal");
                }
            } else {
                log("                           " + collection.elements[i] + " is finished");
            }
        }
        if (changed) log ("                       Changes detected, current closure: " + collection)
        itr++;
    }
    return collection;
}

function jump(collection, symbol){
    log("                   Calculating (" + collection + " ; " + symbol + ")-Jump");
    let jumps = new Collection();
    for (let i = 0; i < collection.elements.length; i++) {
        if(collection.elements[i].isNotFinished()) {
            log("                       Current collection: " + collection.elements[i]);
            if (collection.elements[i].followingSymbol() === symbol) {
                log("                       Found symbol: " + symbol + " after \'.\' in: " + collection.elements[i]);
                let element = new Element(collection.elements[i].rule, collection.elements[i].index + 1);
                if (jumps.append(element)) log("                       Added: " + element);
            }
        } else {
            log("                       " + collection.elements[i] + " is finished");
        }
    }
    return closure(jumps);
}

function generateStates() {
    log("Generating States:");
    let startingElement = new Element(STARTPRODUCTION, 0);
    let collection = new Collection([startingElement]);
    closure(collection);

    log("   Initial Collection: ", collection);
    let states = new Collections([collection]);
    let changed = true;

    let itr = 1;

    while (changed) {
        changed = false;
        log("   " + itr + ". iteration: " + collection);
        for (let i = 0; i < states.collections.length; i++) {
            log("       Current state: " + states.collections[i]);
            for (let j = 0; j < states.collections[i].elements.length; j++) {
                log("           Current element: " + states.collections[i].elements[j]);
                if (states.collections[i].elements[j].isNotFinished()) {
                    let nextSymbol = states.collections[i].elements[j].followingSymbol();
                    log("               Following Symbol: " + nextSymbol);
                    let collection = jump(states.collections[i], nextSymbol);
                    log("               Returned Collection: " + collection);
                        if(states.append(collection)){
                            log("               Appended Collection to states");
                            changed = true;
                        } else {
                            log("               Collection already contained");
                        }
                } else {
                    log("               Element is finished");
                }
            }
        }
        itr++;
    }
    log("Final States: " + states);
}