import Place from '../models/place.js';
import roller from '../engine/roller.js';
import MonsterGenerator from "./monster-generator.js";
import ItemGenerator from "./item-generator.js";
import FeatureGenerator from "./feature-generator.js";

let PlaceGenerator = {

    biomes: ['desert','mountain','hill','meadow','forest','swamp'],
    plantColors: ['purple','blue','blueish','light green','deep green','dark green','yellow','brown'],
    adjectives: ['strange','cheerful','dark','foreboding','quiet','sunny'],

    generatePlace(borderPlace1, borderPlace2, location) {
        if(borderPlace1==null && borderPlace2==null) {
            return new Place('Strange blue meadow', 'meadow', 'blue', 'You are in a strange blue meadow', location, null, null, FeatureGenerator.generateEntity());
        }
        const feature = FeatureGenerator.generateEntityWithProbability();
        const description = this.generatePlaceDescription(borderPlace1,borderPlace2);
        const name = this.adjective + ' ' + this.biome;
        let items = ItemGenerator.generateEntities();
        let monsters = MonsterGenerator.generateEntities();
        return new Place(name, this.biome, this.plantColor, description, location, items, monsters, feature);
    },

    generatePlaceDescription(borderPlace1,borderPlace2) {
        if (borderPlace1!=null && borderPlace2 != null) {
            this.biome = roller.pickFromTable(this.biomes, borderPlace1.biome, borderPlace2.biome);
            this.plantColor = roller.pickFromTable(this.plantColors, borderPlace1.plantColor, borderPlace2.plantColor);
        } else {
            this.biome = roller.pickFromTable(this.biomes, borderPlace1!=null ? borderPlace1.biome : borderPlace2.biome);
            this.plantColor = roller.pickFromTable(this.plantColors, borderPlace1!=null ? borderPlace1.plantColor : borderPlace2.plantColor);
        }

        let biomePart = this.plantColor + ' ' + this.biome;
        if (this.biome == 'desert') {
            biomePart = 'desert. Whitish yellow sand is all around You'
        }
        if (this.biome == 'mountain') {
            biomePart = 'high mountains. Naked rocks and resilient lichen surrounds You'
        }

        this.adjective = roller.pickAtRandom(this.adjectives);

        return `A ${this.adjective} ${biomePart}.`;
    }
}

export default PlaceGenerator;