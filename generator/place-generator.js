import Place from '../models/place.js';
import roller from '../engine/roller.js';
import MonsterGenerator from "./monster-generator.js";
import ItemGenerator from "./item-generator.js";
import FeatureGenerator from "./feature-generator.js";
import DungeonGenerator from '../generator/dungeon-generator.js';
import World from "../models/world.js";

let PlaceGenerator = {

    biomes: ['desert','mountain','hill','farmland','meadow','forest','swamp'],
    plantColors: ['purple','blue','blueish','light green','deep green','dark green','yellow','brown'],
    adjectives: ['strange','cheerful','dark','foreboding','quiet','sunny'],
    undergroundAdjectives: ['strange','echoing','dark','foreboding','quiet','moldy'],
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

    generatePlaceByBiome(biome, plantColor, location, area, motif){
        let feature;
        let adjective;
        let enclosed=false;
        adjective = roller.pickAtRandom(this.adjectives);
        if(!this.biomes.includes(biome)){
            enclosed = true;
            adjective = roller.pickAtRandom(this.undergroundAdjectives);
        }
        if(!area) {
            feature = FeatureGenerator.generateEntityWithProbability();
            if(feature && feature.place) {
                feature.place.location = [1, location[1], location[2]];
                World.locations[1][location[1]][location[2]] = feature.place;
                if(feature.name != 'hut'){
                    let dungeon = DungeonGenerator.generateDungeon(feature.name.split(' ')[0],null);
                    let dungeonEntrance = dungeon.locations[dungeon.entrance[0]][dungeon.entrance[1]][dungeon.entrance[2]];
                    feature.place.addExit(dungeon.entrance,'down',dungeon);
                    dungeonEntrance.exits[0].location = feature.place.location;
                    dungeonEntrance.exits[0].area = World;
                }
            }
        }
        const name = adjective + ' ' + biome;
        let items = ItemGenerator.generateEntities();
        const description = this.getPlaceDescription(biome,plantColor,motif,adjective);
        let monsters = MonsterGenerator.generateEntitiesFromBiome(biome);
        if(this.extraItems && this.extraItems.length != 0 ){
            items = items.concat(this.extraItems);
            this.extraItems = [];
        }
        
        return new Place(name, biome, plantColor, description, location, items, monsters, feature, enclosed);
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

    getPlaceDescription(biome,plantColor,motif,adjective) {
        motif = motif ? motif : '';
        let biomePart = '';
        let finish = '';
        let size = roller.pickAtRandom(['tiny','small','average size','big','enormous']);
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
            case 'cave':
                finish = roller.pickAtRandom(['. The walls are rough and jagged, slick with moisture, and the floor is uneven and covered with sharp rocks and debris',
                    '. The air is heavy and damp, and the sound of dripping water echoes through the cavern',
                    '. The sounds of the cave are eerie and unsettling. The dripping of water is constant, punctuated only by the occasional flutter of bat wings or the distant rumble of a cave-in',
                    '. The air grows colder and the passages become more treacherous. The floor becomes slick with water, and the rocks seem more precarious',
                    '. The walls are covered in a strange bioluminescent moss',
                    '. You see cave narrow chimney bringing some light here']);
                biomePart = size + ' cave chamber. Stalactites and stalagmites jutting out all around you. The air is cold and damp, and you can feel drops of water landing on your skin' + finish;
                break;
            case 'cave corridor':
                finish = roller.pickAtRandom(['. The walls of the cave are rough and uneven, carved out by centuries of erosion and water flow',
                    '. The only light comes from a flickering torch or lantern, casting deep shadows that seem to move and dance in the dim light',
                    '. The sounds of the cave are eerie and unsettling. The dripping of water is constant, punctuated only by the occasional flutter of bat wings or the distant rumble of a cave-in',
                    '. The ground beneath your feet is uneven and treacherous, with jagged rocks and slippery stones making each step precarious',
                    '. The corridor twists and turns, leading deeper into the depths of the cave',
                    '. The only thing you can see is the seemingly endless expanse of rough rock that surrounds you',
                    '. You can feel drops of water landing on your skin',
                    '. You notice that the walls are covered in a strange moss, which glows faintly in the torchlight']);
                biomePart = 'cave corridor is winding. Stalactites and stalagmites are sticking out from ceiling and floor. The air is cold and damp' + finish;
                break;
            case 'mine corridor':
                finish = roller.pickAtRandom(['. The walls of the corridor are rough-hewn from solid rock, and the ceiling hangs low overhead',
                    '. The air is thick with the scent of minerals and earth, and you can hear the sound of dripping water echoing through the corridors',
                    '. The ground beneath your feet is rough and uneven, with small rocks and loose gravel making each step treacherous',
                    '. The corridor begins to narrow, and you can feel the walls pressing in on you',
                    '. The darkness grows more intense, and you can only see a few feet in front of you',
                    '. Occasionally, you might catch a glimpse of something glinting in the dim light - perhaps a vein of ore or a stray gemstone. But more often than not, the only thing you can see is the seemingly endless expanse of rough rock that surrounds you']);
                biomePart = motif + ' mine corridor streaching forward' + finish;
                break;
            case 'mine entrance':
                finish = roller.pickAtRandom(['. It is marked by a set of rusted tracks that lead deep into the earth, disappearing into the darkness',
                    '. It is close by set of heavy wooden doors, reinforced with iron bands and clearly designed to withstand the weight of tons of earth and rock',
                    '. It is overgrown so that vines and bushes almost hide the entrance']);
                biomePart = motif + ' abandoned mine entrace looks dangerous' + finish;
                break;
            case 'mine':
                finish = roller.pickAtRandom(['. In the center of the chamber, you can see a large vein of ore, glimmering in the dim light. The vein is surrounded by piles of rocks and rubble, evidence of previous mining efforts',
                    '. You can see tools scattered around the room, such as pickaxes and shovels, used by the miners who worked here before',
                    '. There are also wooden supports and beams holding up the roof of the chamber, evidence of the dangers that lurk in the mine',
                    '. The torches flicker and dance, casting eerie shadows that seem to move of their own accord',
                    '. High ceiling stretches up into darkness',
                    '. You\'re struck by how low-ceilinged it is. You can reach it with your hand',
                    '. Wooden beams and supports hold the roof up, creaking and groaning under the weight of the earth above',
                    '. You can see a large pile of rocks and rubble off to one side, evidence of previous mining effort']);
                biomePart = size + motif + ' mine chamber' + finish;
                break;
            case 'ruins corridor':
                finish = roller.pickAtRandom(['. The air thick with the scent of dust and decay',
                    '. The corridor is narrow and cramped, with low ceilings and walls that seem to be closing in around you',
                    '. The only light comes from flickering torches that cast eerie shadows along the walls',
                    '. The floor beneath your feet is uneven and treacherous, with loose stones and rubble strewn across the ground',
                    '. The walls are lined with crumbling stone bricks, evidence of the once-grand architecture that has now fallen into disrepair',
                    '. As you move further down the corridor, you can see that there are rooms branching off from the main hallway, each one filled with debris and rubble',
                    '. You can hear the sound of distant echoes, whispers that seem to be carried on the wind']);
                biomePart = motif + ' ruins corridor going forward' + finish;
                break;
            case 'ruins':
                finish = roller.pickAtRandom(['. The chamber is eerie and unsettling. The silence is punctuated only by the occasional screech of a bird or the rustle of leaves',
                    '. You can hear the faint sounds of dripping water and scurrying rodents',
                    '. The walls are adorned with intricate carvings and decorations, many of which have survived the ravages of time',
                    '. Despite the decay and destruction, there is a sense of eerie beauty in the chamber. The way the light filters through the broken walls, casting long shadows across the ground',
                    '. You can see faded frescoes and murals depicting scenes of great battles and epic events, and there are statues and sculptures of long-forgotten heroes and deities scattered throughout the space',
                    '. The ceiling of the chamber is high and vaulted, with intricate arches and columns holding it aloft',
                    '. In the center of the chamber, there is a raised dais or altar, surrounded by smaller statues and symbols',
                    '. You see remnants of the past - tattered banners, rusted uknown items, and shattered pottery',
                    '. Grandeur of this place has been marred by time, and you can see cracks and fissures running through the stone']);
                biomePart = size + motif + ' ruin chamber' + finish;
                break;
            case 'ruins courtyard ':
                finish = roller.pickAtRandom(['. You\'re greeted by a spacious open area surrounded by crumbling walls and columns',
                    '. The ground beneath your feet is rough and uneven, covered in a layer of debris and rubble that crunches and shifts as you walk',
                    '. It is a study in contrasts. On one hand, there is the undeniable beauty of the ancient architecture and design, with intricately carved columns and arches rising up around you. But on the other hand, there is the decay and ruin that has overtaken much of the space, with chunks of stone and plaster lying in disarray on the ground',
                    '. It is dotted with broken statues and fountains, some still spewing water despite their age and disrepair',
                    '. You can see ivy and other plants climbing up the walls and columns, adding a touch of life and vibrancy to the otherwise desolate space',
                    '. The courtyard is surrounded by high walls, once grand and imposing but now crumbling and covered in moss and vines',
                    '. Ancient garden now overgrown takes up entire space making it hard to cross jungle']);
                biomePart = size + motif + ' ruin courtyard' + finish;
                break;
            case 'ruin entrance':
                finish = roller.pickAtRandom(['. Immediately You notice the signs of age and neglect. The once grand facade has crumbled away in places, leaving jagged edges and gaping holes in the walls',
                    '. Thick vines and weeds have overtaken much of the exterior, giving the structure a wild and untamed appearance',
                    '. The once-beautiful arches and columns are now cracked and worn, and the floor is covered in a thick layer of dust and debris',
                    '. You can see the remnants of intricate carvings and decorations, evidence of the grandeur that once existed in this space']);
                biomePart = size + motif + ' ruins entrance opens before you' + finish;
                break;
            default:
                biomePart = plantColor + ' ' + biome;
        }

        return `A ${adjective} ${biomePart}.`;
    }

}

export default PlaceGenerator;