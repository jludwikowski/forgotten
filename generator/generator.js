import roller from "../engine/roller.js";

class Generator {
    constructor(entityProbability, types, adjectivesTables, statsObject) {
        this.entityProbability = entityProbability,
        this.adjectivesTables = adjectivesTables,
        this.types = types
        this.statsObject = statsObject;
    }

    generateEntities(){
        let entities=[];
        while(roller.roll()<this.entityProbability){
            entities.push(this.generateEntity())
        }
        return entities;
    }

    generateEntityWithProbability() {
        if(roller.roll()<this.entityProbability) {
            return this.generateEntity();
        }
    }

    generateEntity(){
        let type = roller.pickAtRandom(this.types);
        return this.generateEntityByTypes([type]);
    }

    generateEntityByTypes(types){
        let type = roller.pickAtRandom(types);
        let entity = this.statsObject[type]();
        let adjectives = []
        this.adjectivesTables.forEach(adjectiveTable => adjectives.push(adjectiveTable.getAdjective()));
        adjectives = adjectives.filter(adj => adj!=null);
        adjectives = this.getFinalAdjectivesTable(type, adjectives);
        adjectives.forEach(adjective => (adjective in this.statsObject) ? entity.adjust(this.statsObject[adjective]()) : entity.append(adjective));
        return entity;
    }

    getFinalAdjectivesTable(type,adjectives) {
        return adjectives;
    }

}

export default Generator