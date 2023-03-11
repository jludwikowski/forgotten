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
    density: ['overgrown ','dense ','sparse ','','ancient ','young '],
    plantFeature: ['. You see some berry bush','. You see giant ancient tree stump','. You see several dead trees','. You see dense bush','. You see lots of vines suffucating plants aroudn here','. You see lots of flowers here'],
    extraItems: [],

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
        let items = ItemGenerator.generateEntities();
        const description = this.getPlaceDescription(biome,plantColor, feature);
        let monsters = MonsterGenerator.generateEntitiesFromBiome(biome);
        if(this.extraItems && this.extraItems.length != 0 ){
            items = items.concat(this.extraItems);
            this.extraItems = [];
        }
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

    generatePlantFeature(probability) {
        if(roller.roll()<probability) {
            let plantF = roller.pickAtRandom(this.plantFeature);
            console.log(plantF);
            if(plantF == '. You see some berry bush'){
                this.extraItems.push(ItemGenerator.generateBasic('berries'));
            }
            return plantF;
        }
        return '';
    },

    getPlaceDescription(biome,plantColor) {
        let biomePart = ''
        switch (biome) {
            case 'desert':
            let desertColor = roller.pickAtRandom([' White',' Whitish yellow',' Whitish yellow',' Deep yellow',' Orange',' Rust color',' Red',' Gray',' Black']);
            let desertType = roller.pickAtRandom([' sand',' rocks',' salt']);
                biomePart = 'desert.' + desertColor + desertType + ' is all around You';
                if(roller.roll<40){
                    biomePart += ' You see some ' + plantColor + ' cacti and agava';
                }
                break;
            case 'mountain':
                let color = roller.pickAtRandom([' gray',' gray',' white',' whitish yellow',' deep yellow',' rust color',' red',' black',' black']);
                let mountainType = roller.pickAtRandom(['low','low','high']);
                biomePart = mountainType + ' mountains.'
                if(mountainType=='low'){
                    let bush = roller.pickAtRandom(['few bushes, ','']);
                    biomePart += ' You are surrounded by' + color + ' rocks, '+ bush + plantColor +' grass with some herbs and occasional short mountain pine.'
                    biomePart += this.generatePlantFeature(40);
                } else{
                    biomePart += ' Naked rocks and resilient lichen surrounds You'
                }
                break;
            case 'hill':
                let hillType = roller.pickAtRandom(['low grassy','rocky','naked and windy','steep','overgrown','lightly forested']);
                biomePart = hillType + ' hill covered with ' + plantColor + ' grass, herbs and bushes';
                biomePart += this.generatePlantFeature(50);
                break;
            case 'meadow':
                let hight = roller.pickAtRandom(['Taller than you ','Very tall ','Medium height ','Short ']);
                biomePart = plantColor + ' ' + biome + '. ' + hight + plantColor + ' grass and herbs is all around you';
                biomePart += this.generatePlantFeature(60);
                break;
            case 'forest':
                let density = roller.pickAtRandom(this.density);
                biomePart = plantColor + ' ' + density + 'forest. Various ' + plantColor + ' trees rise from moss and fern covered ground'
                biomePart += this.generatePlantFeature(60);
                break;
            case 'swamp':
                let characteristic = roller.pickAtRandom([' foul smelling ',' foggy ',' beautiful ',' overgrown ',' stable looking ',' insect filled ']);
                let swampType = roller.pickAtRandom(['bog','march','mire','swamp']);
                biomePart = plantColor + characteristic + swampType;
                if(swampType == 'swamp') {
                    biomePart += '. Many sparly located small and twisted ' + plantColor + ' trees are here in between pools of water';
                } else {
                    biomePart += '. Ground that is not water is covered with ' + plantColor + ' grasses and herbs';
                }
                biomePart += this.generatePlantFeature(40);
                break;
            case 'hut':
                let hutAdjective = roller.pickAtRandom(['sturdy ','ruined ','old ','very old ','new ','rich looking ','poor looking ','abandoned ']);
                let hutType = roller.pickAtRandom(['witch','fisherman','hunter','peasent','old couple','ghostly']);
                biomePart = 'hut. '
                switch (hutType) {
                    case 'witch': biomePart += '. It smells of musty herbs and burnt wood. A cauldron sits in the corner, surrounded by shelves lined with jars and bottles filled with strange liquids and powders'; break;
                    case 'fisherman': biomePart += '. Inside the hut, the air is thick with the faint smell of fish. Nets, ropes, and other fishing gear hang from hooks along the walls'; break;
                    case 'hunter': biomePart += '. Inside the hut, the air is thick with the smell of leather, animal musk, and herbs. A rack of broken bows is lined up against one wall, and a table covered in knives, old traps, and other hunting gear is strewn with ancient bait.'; break;
                    case 'peasent': biomePart += '. A rough-hewn wooden table sits in the center of the room, with a few chairs and stools arranged around it. A few basic cooking utensils hang from hooks on the wall, and a small shelf holds a few plates and cups.'; break;
                    case 'old couple': biomePart += '. A small table sits in the center of the room, with a few chairs and a bench nearby. A few small trinkets and mementos are arranged on a shelf, including a worn book, a small carved statue, and a faded tapestry.'; break;
                    default : biomePart += '. Inside the hut, the air is thick and musty, with the smell of rot and decay. The floorboards creak under your feet, and cobwebs brush against your face. The walls are lined with old tapestries, some of them faded and torn. Light from a broken window is casting eerie shadows around the room.';
                }
                break;
            case 'ruin':
                let ruinType = roller.pickAtRandom(['elf','dwarf','draconid','lizard-folk','troll','forgotten','ancient']);
                biomePart = ruinType + ' ruins. Inside the ruins, you see remnants of the past - tattered banners, rusted weapons, and shattered pottery. The ground is strewn with rubble, and the only light comes from the cracks in the walls and ceiling. You can hear the faint sounds of dripping water and scurrying rodents.';
                break;
            case 'cave':
                biomePart = 'cave. The cave is narrow and winding, with stalactites and stalagmites jutting out of the walls and floor. The air is cold and damp, and you can feel drops of water landing on your skin. You notice that the walls are covered in a strange moss, which glows faintly in the torchlight.';
                break;
            default:
                biomePart = plantColor + ' ' + biome;
        }

        this.adjective = roller.pickAtRandom(this.adjectives);

        return `A ${this.adjective} ${biomePart}.`;
    }

}

export default PlaceGenerator;