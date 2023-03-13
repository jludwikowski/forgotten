import Place from '../models/place.js';
import roller from '../engine/roller.js';
import MonsterGenerator from "./monster-generator.js";
import ItemGenerator from "./item-generator.js";
import FeatureGenerator from "./feature-generator.js";
import World from "../models/world.js";

let PlaceGenerator = {

    biomes: ['desert','mountain','hill','farmland','meadow','forest','swamp'],
    plantColors: ['purple','blue','blueish','light green','deep green','dark green','yellow','brown'],
    adjectives: ['strange','cheerful','dark','foreboding','quiet','sunny'],
    density: ['overgrown ','dense ','sparse ','','ancient ','young '],
    plantFeature: ['. You see some berry bush','. You see giant ancient tree stump','. You see several dead trees','. You see dense bush','. You see lots of vines suffucating plants aroud here','. You see lots of flowers here'],
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
            feature.place.location = [1, location[1], location[2]];
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
            if(plantF == '. You see some berry bush'){
                this.extraItems.push(ItemGenerator.generateBasic('berries'));
            }
            return plantF;
        }
        return '';
    },

    getPlaceDescription(biome,plantColor) {
        let biomePart = '';
        let finish = '';
        switch (biome) {
            case 'desert':
                let desertColor = roller.pickAtRandom([' White',' Whitish yellow',' Whitish yellow',' Deep yellow',' Orange',' Rust color',' Red',' Gray',' Black']);
                let desertType = roller.pickAtRandom([' sand',' rock',' sand',' rock',' salt']);
                finish = roller.pickAtRandom(['. The air is dry and dusty, filled with the gritty particles of sand that whip around in the wind, stinging your eyes and parching your throat',
                    '. The landscape is barren and desolate, with only the occasional outcropping of rock or scrubby plant to break up the monotony',
                    '. Towering sand dunes loom in the distance, their shadows stretching out like fingers across the desert floor']);
                biomePart = 'desert.' + desertColor + desertType + ' is all around You' + finish;

                if(roller.roll<40){
                    biomePart += ' You see some ' + plantColor + ' cacti and agava';
                }
                break;
            case 'mountain':
                finish = roller.pickAtRandom(['. Snow-capped peaks gleam in the sunlight, while waterfalls cascade down the rocky cliffs in shimmering sheets of white',
                    '. The air is thick with the scent of pine and juniper, the trees clinging to the rocky terrain with tenacity',
                    '. Loose rocks and scree slide underfoot with every step, threatening to send you tumbling down the steep incline']);
                let color = roller.pickAtRandom([' gray',' gray',' white',' whitish yellow',' deep yellow',' rust color',' red',' black',' black']);
                let mountainType = roller.pickAtRandom(['low','low','high']);
                biomePart = mountainType + ' mountains.'
                if(mountainType=='low'){
                    let bush = roller.pickAtRandom(['few bushes, ','']);
                    biomePart += ' You are surrounded by' + color + ' rocks, '+ bush + plantColor +' grass with some herbs and occasional short mountain pine'
                    biomePart += this.generatePlantFeature(40);
                } else{
                    biomePart += ' Naked rocks and resilient lichen surrounds You'
                }
                    biomePart += finish;
                break;
            case 'hill':
                finish = roller.pickAtRandom(['. From the top of the hill, you can see for miles in every direction - the rolling countryside stretching out before you like a patchwork quilt',
                    '. The grassy slopes are dotted with wildflowers, their colors vibrant against the lush green backdrop',
                    '. The slope is steep and rocky, with jagged outcroppings of stone jutting out from the earth like the teeth of some ancient beast',
                    '. The grasses here are sparse and tough, able to withstand the harsh conditions of the hill\'s environment']);
                let hillType = roller.pickAtRandom(['low grassy','rocky','naked and windy','steep','overgrown','lightly forested']);
                biomePart = hillType + ' hill covered with ' + plantColor + ' grass, herbs and bushes' + finish;
                biomePart += this.generatePlantFeature(50);
                break;
            case 'farmland':
                finish = roller.pickAtRandom(['. The air is filled with the scent of freshly turned earth and growing crops',
                    '. The sound of birdsong and distant farm animals fills your ears',
                    '. The occasional scarecrow can be seen standing guard over the fields, keeping watch over the crops']);
                let farmlandType = roller.pickAtRandom(['orchards','wheat fields','mixed crop farmland','corn fields','vegetable crops','rye fields']);
                biomePart = farmlandType + ' surrounds You. All manner of smaller more varied fields and can be sean nearby' + finish;
                break;
            case 'meadow':
                finish = roller.pickAtRandom(['. The meadow is dotted with wildflowers, their colors bright against the ' + plantColor + ' backdrop',
                    '. The grass is soft and inviting, and you feel a sense of peace wash over you as you step into the meadow',
                    '. The grassy expanse stretches out before you, a sea of ' + plantColor + ' that ripples in the gentle breeze',
                    '. The air is alive with the sound of birdsong, and the scent of fresh earth and blooming flowers fills your nostrils']);
                let hight = roller.pickAtRandom(['Taller than you ','Very tall ','Medium height ','Short ']);
                biomePart = plantColor + ' ' + biome + '. ' + hight + plantColor + ' grass and herbs is all around you' + finish;
                biomePart += this.generatePlantFeature(60);
                break;
            case 'forest':
                finish = roller.pickAtRandom(['. The trees rise high into the sky, their branches stretching out like fingers towards the sun',
                    '. The ground is covered in a soft bed of leaves, and the air is thick with the scent of pine and cedar',
                    '. You can hear the distant howl of some beast, and the rustling of leaves as unseen creatures move through the foliage',
                    '. The trees tower above you, their trunks thick and gnarled. Sunlight filters through the canopy, dappling the forest floor with patches of light']);
                let density = roller.pickAtRandom(this.density);
                biomePart = plantColor + ' ' + density + 'forest. Various ' + plantColor + ' trees rise from moss and fern covered ground' + finish;
                biomePart += this.generatePlantFeature(60);
                break;
            case 'swamp':
                finish = roller.pickAtRandom(['. As you step into it, you are immediately struck by the overwhelming stench of decay',
                    '. The air is thick with the odor of stagnant water and rotting vegetation, making it difficult to breathe',
                    '. The water is murky and green, and the occasional ripple suggests that something may be lurking beneath the surface',
                    '. It is filled with murky, stagnant water and surrounded by dense stands of cattails and other water-loving plants',
                    '. The water is dark and murky, and you can\'t see more than a few inches below the surface',
                    '. The sounds of the swamp are haunting. Frogs croak in the distance, and the occasional splash suggests the presence of some dangerous creatures']);
                let characteristic = roller.pickAtRandom([' foul smelling ',' foggy ',' beautiful ',' overgrown ',' stable looking ',' insect filled ']);
                let swampType = roller.pickAtRandom(['bog','march','mire','swamp','swamp']);
                biomePart = plantColor + characteristic + swampType;
                if(swampType == 'swamp') {
                    biomePart += '. Many sparly located ' + plantColor + ' trees are gnarled and twisted, their roots breaking through the pools of water surface';
                } else {
                    biomePart += '. Ground that is not water is covered with ' + plantColor + ' grasses and herbs';
                }
                biomePart += finish + this.generatePlantFeature(40);
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
                finish = roller.pickAtRandom(['. The ruins are eerie and unsettling. The silence is punctuated only by the occasional screech of a bird or the rustle of leaves',
                    '. You can hear the faint sounds of dripping water and scurrying rodents',
                    '. As you make your way deeper into the ruins, you find yourself surrounded by broken columns and shattered statues',
                    '. Despite the decay and destruction, there is a sense of eerie beauty in the ruins. The way the light filters through the broken walls, casting long shadows across the ground']);
                let ruinType = roller.pickAtRandom(['elf','dwarf','draconid','lizard-folk','troll','forgotten','ancient']);
                biomePart = ruinType + ' ruins. Inside the ruins, you see remnants of the past - tattered banners, rusted weapons, and shattered pottery. The ground is strewn with rubble, and the only light comes from the cracks in the walls and ceiling' + finish;
                break;
            case 'cave':
                finish = roller.pickAtRandom(['. The walls are rough and jagged, slick with moisture, and the floor is uneven and covered with sharp rocks and debris',
                    '. The air is heavy and damp, and the sound of dripping water echoes through the cavern',
                    '. The sounds of the cave are eerie and unsettling. The dripping of water is constant, punctuated only by the occasional flutter of bat wings or the distant rumble of a cave-in',
                    '. The air grows colder and the passages become more treacherous. The floor becomes slick with water, and the rocks seem more precarious']);
                biomePart = 'cave. The cave is narrow and winding, with stalactites and stalagmites jutting out of the walls and floor. The air is cold and damp, and you can feel drops of water landing on your skin. You notice that the walls are covered in a strange moss, which glows faintly in the torchlight' + finish;
                break;
            default:
                biomePart = plantColor + ' ' + biome;
        }

        this.adjective = roller.pickAtRandom(this.adjectives);

        return `A ${this.adjective} ${biomePart}.`;
    }

}

export default PlaceGenerator;