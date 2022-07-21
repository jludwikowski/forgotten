import roller from "../generator/roller.js";

class Adjectives {
    constructor(probability, adjectivesTable) {
        this.probability = probability,
        this.adjectivesTable = adjectivesTable
    }

    getAdjective(){
        return roller.roll()<this.probability? roller.pickAtRandom(this.adjectivesTable):null;
    }
}

export default Adjectives