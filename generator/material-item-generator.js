import Generator from "./generator.js";

class MaterialItemGenerator extends Generator {

    constructor(entityProbability, types, adjectivesTables, materialTables, typeQalifier, statsObject) {
        super(entityProbability,types,adjectivesTables,statsObject),
        this.materialTables = materialTables,
        this.typeQalifier = typeQalifier
    }

    pickMaterial(materialTable){
        let material = null;
        let i=0;
        while(material===null && i<materialTable.length){
            material = materialTable[i].getAdjective();
            i++;
        }
        return material;
    }

    getFinalAdjectivesTable(type, givenAdjectivesTable) {
        let material;
        if(this.typeQalifier.includes(type)) {
            material = this.pickMaterial(this.materialTables[0]);
        } else {
            material = this.pickMaterial(this.materialTables[1]);
        }
        givenAdjectivesTable.unshift(material);
        return givenAdjectivesTable;
    }
}

export default MaterialItemGenerator;