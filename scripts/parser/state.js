function closure(collection) {
    let changed = false;
    do {
        changed = false;
        for (let i = 0; i < collection.length; i++) {
            if(collection[i].indexOf(".") !== collection[i].length - 1) {
                log("Symbols after . : " + collection[i].split(".")[1]);
                nextSymbol = collection[i].split(".")[1][0];
                log("Next symbol: " + nextSymbol);
                if (isNT(nextSymbol)) {
                    for (let j = 0; j < productionRules[nextSymbol].length; j++) {
                        if (append("." + productionRules[nextSymbol][j], collection)) {
                            changed = true;
                        }
                    }
                }
            } else {
                log("No symbols after .");
            }
        }
        if (changed) log ("Changes detected")
    } while (changed);
    return collection;
}


