import roller from "../engine/roller.js";

class Generator {
    constructor(entityProbability, types, adjectivesTables, statsObject, biomeTypesTables) {
        this.entityProbability = entityProbability,
        this.adjectivesTables = adjectivesTables,
        this.types = types,
        this.statsObject = statsObject,
        this.biomeTypesTables = biomeTypesTables;
    }

    generateEntities(){
        let entities=[];
        while(roller.roll()<this.entityProbability){
            entities.push(this.generateEntity())
        }
        return entities;
    }

    generateEntitiesFromBiome(biome){
        if(this.biomeTypesTables){
            let entities=[];
            let type = roller.pickAtRandom(this.biomeTypesTables[biome]);
            while(roller.roll()<this.entityProbability){
                entities.push(this.generateEntityByTypes([type]))
            }
            return entities;
        }
        return this.generateEntities();
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
        if(entity.attributes) {
            entity.attributes.updateHealth();
        }
        return entity;
    }

    generateBasic(type) {
        return this.statsObject[type]();
    }

    getFinalAdjectivesTable(type,adjectives) {
        return adjectives;
    }

}

export default Generator