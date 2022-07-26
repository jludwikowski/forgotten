import Attributes from "../models/attributes.js";
import Monster from "../models/monster.js";
import WeaponGenerator from "../generator/weapon-generator.js";
import ArmorGenerator from "../generator/armor-generator.js";
import roller from "../engine/roller.js";
import ItemGenerator from "../generator/item-generator.js";

let MonsterStats = {
    goblin() {
        return new Monster('goblin', 'goblin', new Attributes(1,2, 1, 3, 2,2,1,15,15,15,0),
        ItemGenerator.generateEntities(), WeaponGenerator.generateEntity(), ArmorGenerator.generateEntity(), roller.rollDice(5), 10)
    },
    orc() {
        return new Monster('orc', 'orc', new Attributes(3, 4, 3, 2,2,2,2,20,5,5,0),
            ItemGenerator.generateEntities(), WeaponGenerator.generateEntity(), ArmorGenerator.generateEntity(), roller.rollDice(20), 30)
    },
    dwarf() {
        return new Monster('dwarf bandit', 'dwarf bandit', new Attributes(1, 4, 3, 1,2,3,3,20,10,0,0),
            ItemGenerator.generateEntities(), WeaponGenerator.generateEntity(), ArmorGenerator.generateEntity(), roller.rollDice(40), 40)
    },
    draconid() {
        return new Monster('draconid', 'draconid', new Attributes(3, 3, 3, 1,1,2,2,20,0,5,2),
            ItemGenerator.generateEntities(), WeaponGenerator.generateEntity(), ArmorGenerator.generateEntity(), roller.rollDice(20), 30)
    },
    ogre() {
        return new Monster('ogre', 'ogre', new Attributes(5, 8, 6, 1,1,1,1,15,5,0,1),
            ItemGenerator.generateEntities(), WeaponGenerator.generateEntity(), ArmorGenerator.generateEntity(), roller.rollDice(20), 100)
    },
    slime() {
        return new Monster('slime', 'slime', new Attributes(2, 8, 1, 1,1,1,1,5,0,0,1),
            ItemGenerator.generateEntities().concat(WeaponGenerator.generateEntityWithProbability()).concat(ArmorGenerator.generateEntityWithProbability()), null, null, roller.rollDice(10), 20)
    },
    wolf() {
        return new Monster('wolf', 'wolf', new Attributes(2, 3, 2, 4,4,1,2,25,0,0,1),
            [ItemGenerator.generateBasic('raw meat'), ItemGenerator.generateBasic('pelt')], null, null, 0, 20)
    },
    moose() {
        return new Monster('moose', 'moose', new Attributes(5, 7, 5, 2,2,1,2,15,0,0,1),
            [ItemGenerator.generateBasic('raw meat'), ItemGenerator.generateBasic('pelt'), ItemGenerator.generateBasic('raw meat'), ItemGenerator.generateBasic('pelt')], null, null, 0, 20)
    },
    spider() {
        return new Monster('spider', 'spider', new Attributes(2, 3, 1, 5, 5,0,0,15,15,0,3),
            [ItemGenerator.generateBasic('bug meat')], null, null, 0, 40)
    },
    wasp() {
        return new Monster('wasp', 'wasp', new Attributes(2, 2, 1, 3, 3,0,0,20,0,0,3),
            [ItemGenerator.generateBasic('bug meat')], null, null, 0, 30)
    },
    lizard() {
        return new Monster('lizard', 'lizard', new Attributes(3, 4, 2, 2,5,0,0,10,0,0,1),
            [ItemGenerator.generateBasic('raw meat')], null, null, 0, 15)
    },
    boar() {
        return new Monster('boar', 'boar', new Attributes(4, 7, 3, 1,3,1,2,20,0,0,1),
            [ItemGenerator.generateBasic('raw meat'), ItemGenerator.generateBasic('pelt')], null, null, 0, 50)
    },
    rat() {
        return new Monster('rat', 'rat', new Attributes(0, 1, 0, 2,2,1,1,15,0,0,0),
            [ItemGenerator.generateBasic('raw meat')], null, null, 0, 5)
    },
    bat() {
        return new Monster('bat', 'bat', new Attributes(0, 1, 0, 4,4,1,1,15,0,0,0),
            [ItemGenerator.generateBasic('raw meat')], null, null, 0, 10)
    },
    bear() {
        return new Monster('bear', 'bear', new Attributes(6, 10, 7, 3,2,1,2,20,0,0,1),
            [ItemGenerator.generateBasic('raw meat'), ItemGenerator.generateBasic('raw meat'), ItemGenerator.generateBasic('pelt'), ItemGenerator.generateBasic('pelt')], null, null, 0, 200)
    },
    dragon() {
        return new Monster('dragon', 'dragon', new Attributes(10, 30, 12, 5, 3,3,4,40,50,30,10),
            [ItemGenerator.generateBasic('raw meat')], null, null, 0, 2000)
    },
    human() {
        return new Monster('human bandit', 'human bandit', new Attributes(2, 3, 1, 3,2,2,2,15,15,15,0),
        ItemGenerator.generateEntities(), WeaponGenerator.generateEntity(), ArmorGenerator.generateEntity(), roller.rollDice(20), 30)
    },
    elf() {
        return new Monster('elf bandit', 'elf bandit', new Attributes(2, 2, 1,  4, 2,3,2,15,20,20,0),
        ItemGenerator.generateEntities(), WeaponGenerator.generateEntity(), ArmorGenerator.generateEntity(), roller.rollDice(20), 30)
    },
    'cat-folk'() {
        return new Monster('cat-folk', 'cat-folk', new Attributes(2, 2, 2,  4, 3,1,2,20,0,0,0),
            ItemGenerator.generateEntities(), WeaponGenerator.generateEntity(), ArmorGenerator.generateEntity(), roller.rollDice(20), 30)
    },

    small() { return new Monster('small', 'small', new Attributes(-1, -1, -1, 1,0,1,0,0,0,0,0), null, null, null, 0, 0.8) },
    large() { return new Monster('large', 'large', new Attributes(0, 1, 1, -1,0,0,0,0,0,0,0), null, null, null, 0, 1.2) },
    huge() { return new Monster('huge', 'huge', new Attributes(1, 2, 2, -1,-1,-1,0, 0,0,-1,0), null, null, null, 0, 1.5) },
    terrifying() { return new Monster('terrifying', 'terrifying', new Attributes(0, 1, 0, 1,1,1,0,1,0,0,0,), null, null, null, 0, 1.5) },
    strange() { return new Monster('strange', 'strange', new Attributes(0, 0, 0, 1,1,1,1,0,0,0,0), null, null, null, 0, 1.2) },
    zombie() { return new Monster('zombie', 'zombie', new Attributes(0, 5, 3, -2,-2,-2,0,-1,-2,0,0), null, null, null, 0, 2)},
    dark() { return new Monster('dark', 'dark', new Attributes(0, 1, 0, 1, 1,0,0,1,-1,1,0), null, null, null, 0, 1.3 ) },
    fire() { return new Monster('fire', 'fire', new Attributes(0, 1, 2, 1,0,0,0,0,0,1,0), null, null, null , 0, 3) },
    water() { return new Monster('water', 'water', new Attributes(0, 1, 0, 2,2,1,1,0,0,1,0), null, null, null, 0, 3) },
    earth() { return new Monster('earth', 'earth', new Attributes(1, 3, 1, -1,-1,0,1,0,0,1,2), null, null, null, 0, 3) },
    air() { return new Monster('air', 'air', new Attributes(-1, -1, 0, 3,2,1,1,1,1,1,0), null, null, null, 0, 2) },
    demonic() { return new Monster('demonic', 'demonic', new Attributes(1, 1, 2, 1,0,1,1,1,0,2,0), null, null, null, 0, 4) },
    spirit() { return new Monster('spirit', 'spirit', new Attributes(0, 1, 0, 3,3,1,3,2,2,2,0), null, null, null, 0, 4) },
    skeletal() { return new Monster('skeletal', 'skeletal', new Attributes(0, 4, 2, -1,-1,-1,-1,0,0,0,0), null, null, null, 0, 2) },

    /*traits*/
    strong() { return new Monster(null, null, new Attributes(0, 0, 1, 0,0,0,0,0,0,0,0), null, null, null, 0, 1) },
    'very strong'() { return new Monster(null, null, new Attributes(0, 0, 1, 0,0,0,0,0,0,0,0), null, null, null, 0, 1) },
    quick() { return new Monster(null, null, new Attributes(0, 0, 0, 0,1,0,0,0,0,0,0), null, null, null, 0, 1) },
    agile() { return new Monster(null, null, new Attributes(0, 0, 1, 1,0,0,0,0,0,0,0), null, null, null, 0, 1) },
    'very quick'() { return new Monster(null, null, new Attributes(0, 0, 0,0,1,0,0,0,0,0,0), null, null, null, 0, 1) },
    'very agile'() { return new Monster(null, null, new Attributes(0, 0, 0, 1,0,0,0,0,0,0,0), null, null, null, 0, 1) },
    tough() { return new Monster(null, null, new Attributes(0, 1, 0, 0,0,0,0,0,0,0,0), null, null, null, 0, 1) },
    'very tough'() { return new Monster(null, null, new Attributes(0, 1, 0, 0,0,0,0,0,0,0,0), null, null, null, 0, 1) },
    lucky() { return new Monster(null, null, new Attributes(0, 0, 0, 0,0,0,0,1,1,1,0), null, null, null, 0, 1) },

    hungry() { return new Monster(null, null, new Attributes(0, 0, -1, -1,-1,0,0,0,0,0,0), null, null, null, 0, 1) },
    'very hungry'() { return new Monster(null, null, new Attributes(0, 0, -2, -2,-2,0,0,0,0,0,0), null, null, null, 0, 1) },
    sated() { return new Monster(null, null, new Attributes(0, 0, 1, 1,1,0,0,0,0,0,0), null, null, null, 0, 1) },

    thirsty() { return new Monster(null, null, new Attributes(0, 0, 0, -1,0,-1,-1,0,0,0,0), null, null, null, 0, 1) },
    'very thirsty'() { return new Monster(null, null, new Attributes(0, 0, -1, -1,-1,-2,-2,0,0,0,0), null, null, null, 0, 1) },
    parched() { return new Monster(null, null, new Attributes(0, 0, -1, -2,-2,-3,-3,0,0,0,0), null, null, null, 0, 1) },
}

export default MonsterStats;