import generator from "./generator.js";
import roller from "../engine/roller.js";

class ExoticTypesGenerator extends generator {
    constructor(entityProbability, types, adjectivesTables, statsObject, exoticTypes) {
        super(entityProbability, types, adjectivesTables, statsObject);
        this.exoticTypes = exoticTypes
    }

    generateEntityByTypes(types) {
        if(roller.roll()<4) {
            return super.generateEntityByTypes(this.exoticTypes);
        }
        return super.generateEntityByTypes(types);
    }
}

export default ExoticTypesGenerator