import Place from '../models/place.js';
import roller from '../engine/roller.js';
import MonsterGenerator from "./monster-generator.js";
import ItemGenerator from "./item-generator.js";
import FeatureGenerator from "./feature-generator.js";
import World from "../models/world.js";

let PlaceGenerator = {

    biomes: ['desert','mountain','hill','meadow','forest','swamp'],
    plantColors: ['purple','blue','blueish','light green','deep green','dark green','yellow','brown'],
    adjectives: ['strange','cheerful','dark','foreboding','quiet','sunny'],

    generatePlace(borderPlace1, borderPlace2, location) {
        if(borderPlace1==null && borderPlace2==null) {
            return new Place('Strange blue meadow', 'meadow', 'blue', 'You are in a strange blue meadow', location, null, null, FeatureGenerator.generateEntity());
        }
        this.pickBiomeAndColor(borderPlace1,borderPlace2)
        return this.generatePlaceByBiome(this.biome,this.plantColor, location)
    },

    generatePlaceByBiome(biome, plantColor, location){
        const feature = FeatureGenerator.generateEntityWithProbability();
        if(feature && feature.place) {
            feature.place.location = [1, location[1],  location[2]];
            World.locations[1][location[1]][location[2]] = feature.place;
        }
        const name = this.adjective + ' ' + biome;
        const description = this.getPlaceDescription(biome,plantColor, feature);
        let items = ItemGenerator.generateEntities();
        let monsters = MonsterGenerator.generateEntitiesFromBiome(biome);
        return new Place(name, biome, plantColor, description, location, items, monsters, feature);
    },

    pickBiomeAndColor(borderPlace1,borderPlace2){
        if (borderPlace1!=null && borderPlace2 != null) {
            this.biome = roller.pickFromTable(this.biomes, borderPlace1.biome, borderPlace2.biome);
            this.plantColor = roller.pickFromTable(this.plantColors, borderPlace1.plantColor, borderPlace2.plantColor);
        } else {
            this.biome = roller.pickFromTable(this.biomes, borderPlace1!=null ? borderPlace1.biome : borderPlace2.biome);
            this.plantColor = roller.pickFromTable(this.plantColors, borderPlace1!=null ? borderPlace1.plantColor : borderPlace2.plantColor);
        }
    },

    getPlaceDescription(biome,plantColor) {
        let biomePart = plantColor + ' ' + biome;
        if (biome == 'desert') {
            biomePart = 'desert. Whitish yellow sand is all around You'
        }
        if (biome == 'mountain') {
            biomePart = 'high mountains. Naked rocks and resilient lichen surrounds You'
        }
        if (biome == 'hut') {
            biomePart = 'hut. Shelfs with pottery and dried herbs covers the walls'
        }
        if (biome == 'ruin') {
            biomePart = 'ruins. Crumbled walls and webbings surrands you'
        }
        if (biome == 'cave') {
            biomePart = 'cave. Narrow corridor leads to single room'
        }

        this.adjective = roller.pickAtRandom(this.adjectives);

        return `A ${this.adjective} ${biomePart}.`;
    }

}

export default PlaceGenerator;