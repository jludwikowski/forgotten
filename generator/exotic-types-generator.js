import generator from "./generator.js";
import roller from "../engine/roller.js";

class ExoticTypesGenerator extends generator {
    constructor(entityProbability, types, adjectivesTables, statsObject, exoticProbability, exoticTypes) {
        super(entityProbability, types, adjectivesTables, statsObject);
        this.exoticTypes = exoticTypes,
        this.exoticProbability = exoticProbability
    }

    generateEntityByTypes(types) {
        if(roller.roll()<this.exoticProbability) {
            return super.generateEntityByTypes(this.exoticTypes);
        }
        return super.generateEntityByTypes(types);
    }
}

export default ExoticTypesGenerator