import Attributes from "../models/attributes.js";
import Monster from "../models/monster.js";
import WeaponGenerator from "../generator/weapon-generator.js";
import ArmorGenerator from "../generator/armor-generator.js";
import roller from "../engine/roller.js";
import ItemGenerator from "../generator/item-generator.js";

let MonsterStats = {
    goblin() {
        return new Monster('goblin', 'goblin', new Attributes(1,2, 1, 3, 2,2,1,1,1,15,15,15,2,0),
        ItemGenerator.generateEntities(), WeaponGenerator.generateEntity(), ArmorGenerator.generateEntity(), roller.rollDice(5), 10, 'humanoid')
    },
    orc() {
        return new Monster('orc', 'orc', new Attributes(3, 4, 3, 2,2,2,2,2,1,20,5,5,1,0),
            ItemGenerator.generateEntities(), WeaponGenerator.generateEntity(), ArmorGenerator.generateEntity(), roller.rollDice(20), 30, 'humanoid')
    },
    dwarf() {
        return new Monster('dwarf bandit', 'dwarf bandit', new Attributes(1, 4, 3, 1,2,3,3,3,1,20,10,0,1,0),
            ItemGenerator.generateEntities(), WeaponGenerator.generateEntity(), ArmorGenerator.generateEntity(), roller.rollDice(40), 40, 'humanoid')
    },
    draconid() {
        return new Monster('draconid', 'draconid', new Attributes(3, 3, 3, 1,1,2,2,2,1,20,0,5,1,2),
            ItemGenerator.generateEntities(), WeaponGenerator.generateEntity(), ArmorGenerator.generateEntity(), roller.rollDice(20), 30, 'humanoid')
    },
    ogre() {
        return new Monster('ogre', 'ogre', new Attributes(5, 8, 6, 1,1,1,1,2,1,15,5,0,1,1),
            ItemGenerator.generateEntities(), WeaponGenerator.generateEntity(), ArmorGenerator.generateEntity(), roller.rollDice(20), 100, 'humanoid')
    },
    slime() {
        return new Monster('slime', 'slime', new Attributes(2, 8, 1, 1,1,1,1,1,1,5,0,0,1,1),
            ItemGenerator.generateEntities().concat(WeaponGenerator.generateEntityWithProbability()).concat(ArmorGenerator.generateEntityWithProbability()), null, null, roller.rollDice(10), 20, 'monster')
    },
    wolf() {
        return new Monster('wolf', 'wolf', new Attributes(2, 3, 2, 4,4,1,2,2,1,25,0,0,2,1),
            [ItemGenerator.generateBasic('good meat'), ItemGenerator.generateBasic('pelt')], null, null, 0, 20, 'animal')
    },
    jackal() {
        return new Monster('jackal', 'jackal', new Attributes(2, 2, 2, 4,4,1,2,2,1,20,0,0,2,1),
            [ItemGenerator.generateBasic('raw meat'), ItemGenerator.generateBasic('pelt')], null, null, 0, 20, 'animal')
    },
    hiena() {
        return new Monster('hiena', 'hiena', new Attributes(2, 3, 3, 4,4,1,2,2,1,30,0,0,1,1),
            [ItemGenerator.generateBasic('raw meat'), ItemGenerator.generateBasic('pelt')], null, null, 0, 20, 'animal')
    },
    lynx() {
        return new Monster('lynx', 'lynx', new Attributes(2, 2, 2, 4,4,1,2,2,1,25,0,0,2,1),
            [ItemGenerator.generateBasic('raw meat'), ItemGenerator.generateBasic('pelt')], null, null, 0, 20, 'animal')
    },
    lion() {
        return new Monster('lion', 'lion', new Attributes(4, 5, 5, 4,4,1,2,2,1,30,0,0,2,1),
            [ItemGenerator.generateBasic('good meat'), ItemGenerator.generateBasic('pelt')], null, null, 0, 20, 'animal')
    },
    cougar() {
        return new Monster('cougar', 'cougar', new Attributes(3, 4, 4, 5,5,1,2,2,1,35,0,0,3,1),
            [ItemGenerator.generateBasic('good meat'), ItemGenerator.generateBasic('pelt')], null, null, 0, 20, 'animal')
    },
    warg() {
        return new Monster('warg', 'warg', new Attributes(4, 4, 4, 4,4,1,2,2,1,25,0,0,2,1),
            [ItemGenerator.generateBasic('raw meat'), ItemGenerator.generateBasic('pelt')], null, null, 0, 20, 'animal')
    },
    moose() {
        return new Monster('moose', 'moose', new Attributes(5, 7, 5, 2,2,1,2,1,1,15,0,0,1,1),
            [ItemGenerator.generateBasic('sucullent meat'), ItemGenerator.generateBasic('pelt'), ItemGenerator.generateBasic('sucullent meat'), ItemGenerator.generateBasic('pelt')], null, null, 0, 20, 'animal')
    },
    spider() {
        return new Monster('spider', 'spider', new Attributes(2, 3, 1, 5, 5,0,0,1,1,15,15,0,2,3),
            [ItemGenerator.generateBasic('bug meat')], null, null, 0, 40, 'bug')
    },
    wasp() {
        return new Monster('wasp', 'wasp', new Attributes(2, 2, 1, 3, 3,0,0,1,1,20,0,0,2,3),
            [ItemGenerator.generateBasic('bug meat')], null, null, 0, 30, 'bug')
    },
    lizard() {
        return new Monster('lizard', 'lizard', new Attributes(3, 4, 2, 2,5,0,0,1,1,10,0,0,1,1),
            [ItemGenerator.generateBasic('raw meat')], null, null, 0, 15, 'animal')
    },
    boar() {
        return new Monster('boar', 'boar', new Attributes(4, 7, 3, 1,3,1,2,2,2,20,0,0,2,1),
            [ItemGenerator.generateBasic('sucullent meat'), ItemGenerator.generateBasic('pelt')], null, null, 0, 50, 'animal')
    },
    rat() {
        return new Monster('rat', 'rat', new Attributes(0, 1, 0, 2,2,1,1,1,1,15,0,0,1,0),
            [ItemGenerator.generateBasic('raw meat')], null, null, 0, 5, 'animal')
    },
    bat() {
        return new Monster('bat', 'bat', new Attributes(0, 1, 0, 4,4,1,1,1,1,15,0,0,1,0),
            [ItemGenerator.generateBasic('raw meat')], null, null, 0, 10, 'animal')
    },
    bear() {
        return new Monster('bear', 'bear', new Attributes(6, 10, 7, 3,2,1,2,1,1,20,0,0,1,1),
            [ItemGenerator.generateBasic('good meat'), ItemGenerator.generateBasic('raw meat'), ItemGenerator.generateBasic('pelt'), ItemGenerator.generateBasic('pelt')], null, null, 0, 200, 'animal')
    },
    dragon() {
        return new Monster('dragon', 'dragon', new Attributes(10, 30, 12, 5, 3,3,4,5,5,40,50,30,3,10),
            [ItemGenerator.generateBasic('sucullent meat')], null, null, 0, 2000, 'dragon')
    },
    human() {
        return new Monster('human bandit', 'human bandit', new Attributes(2, 3, 1, 3,2,2,2,2,2,15,15,15,1,0),
        ItemGenerator.generateEntities(), WeaponGenerator.generateEntity(), ArmorGenerator.generateEntity(), roller.rollDice(20), 30, 'humanoid')
    },
    elf() {
        return new Monster('elf bandit', 'elf bandit', new Attributes(2, 2, 1,  4, 2,3,2,2,2,15,20,20,1,0),
        ItemGenerator.generateEntities(), WeaponGenerator.generateEntity(), ArmorGenerator.generateEntity(), roller.rollDice(30), 30, 'humanoid')
    },
    'cat-folk'() {
        return new Monster('cat-folk bandit', 'cat-folk bandit', new Attributes(2, 2, 2,  4, 3,1,2,2,1,20,0,0,1,0),
            ItemGenerator.generateEntities(), WeaponGenerator.generateEntity(), ArmorGenerator.generateEntity(), roller.rollDice(10), 30, 'humanoid')
    },
    'frog-folk'() {
        return new Monster('frog-folk bandit', 'frog-folk bandit', new Attributes(2, 2, 1,  2, 3,3,3,2,2,15,10,20,1,0),
            ItemGenerator.generateEntities(), WeaponGenerator.generateEntity(), ArmorGenerator.generateEntity(), roller.rollDice(10), 30, 'humanoid')
    },'rat-folk'() {
        return new Monster('rat-folk bandit', 'rat-folk bandit', new Attributes(2, 2, 2,  2, 2,2,2,3,2,15,15,15,1,0),
            ItemGenerator.generateEntities(), WeaponGenerator.generateEntity(), ArmorGenerator.generateEntity(), roller.rollDice(10), 20, 'humanoid')
    },'wannani'() {
        return new Monster('wannani bandit', 'wannani bandit', new Attributes(4, 3, 4,  1, 1,2,2,2,3,20,10,5,1,0),
            ItemGenerator.generateEntities(), WeaponGenerator.generateEntity(), ArmorGenerator.generateEntity(), roller.rollDice(20), 40, 'humanoid')
    },'lizard-folk'(){
        return new Monster('lizard-folk bandit', 'lizard-folk bandit', new Attributes(2, 2, 2,  2, 2,2,2,2,3,15,15,15,1,0),
            ItemGenerator.generateEntities(), WeaponGenerator.generateEntity(), ArmorGenerator.generateEntity(), roller.rollDice(20), 30, 'humanoid')
    },'huldre-troll'() {
        return new Monster('huldre-troll bandit', 'huldre-troll', new Attributes(1, 2, 1,  2, 2,3,3,2,3,10,15,25,2,0),
            ItemGenerator.generateEntities(), WeaponGenerator.generateEntity(), ArmorGenerator.generateEntity(), roller.rollDice(30), 30, 'humanoid')
    },'risi-troll'() {
        return new Monster('risi-troll bandit', 'risi-troll bandit', new Attributes(2, 2, 3, 2,2,2,2,2,2,15,15,15,1,0),
        ItemGenerator.generateEntities(), WeaponGenerator.generateEntity(), ArmorGenerator.generateEntity(), roller.rollDice(30), 30, 'humanoid')
    },'jotun-troll'() {
        return new Monster('wannani bandit', 'wannani bandit', new Attributes(4, 4, 4,  1, 1,1,1,2,2,20,5,0,1,1),
            ItemGenerator.generateEntities(), WeaponGenerator.generateEntity(), ArmorGenerator.generateEntity(), roller.rollDice(30), 40, 'humanoid')
    },
    scarab() {
        return new Monster('scarab', 'scarab', new Attributes(2, 3, 2, 2,2,0,2,2,2,10,0,0,1,3),
        [ItemGenerator.generateBasic('bug meat')], null, null, 0, 40, 'bug')
    },

    small() { return new Monster('small', 'small', new Attributes(-1, -1, -1, 1,0,1,0,0,0,0,0,0,1,0), null, null, null, 0, 0.8) },
    large() { return new Monster('large', 'large', new Attributes(0, 1, 1, -1,0,0,0,0,0,0,0,0,0,0), null, null, null, 0, 1.2) },
    huge() { return new Monster('huge', 'huge', new Attributes(1, 2, 2, -1,-1,-1,0,0,0,0,0,-1,0,0), null, null, null, 0, 1.5) },
    sikly() { return new Monster('sikly', 'sikly', new Attributes(0, -1, -1, -1,0,0,0,0,0,0,0,0,0,0), null, null, null, 0, 0.5) },
    aggresive() { return new Monster('aggresive', 'aggresive', new Attributes(0, 1, 1, 0,0,0,0,0,0,2,0,0,0,0), null, null, null, 0, 1.2) },
    albino() { return new Monster('albino', 'albino', new Attributes(1, 2, 2, 2,0,0,0,0,0,5,0,10,1,0), null, null, null, 0, 3) },
    terrifying() { return new Monster('terrifying', 'terrifying', new Attributes(0, 1, 0, 1,1,1,0,1,0,1,0,0,1,0), null, null, null, 0, 1.5) },
    tattoed() {return new Monster('tattoed', 'tattoed', new Attributes(0, 1, 1, 1,1,1,0,1,0,5,5,5,1,0), null, null, null, 0, 2) },
    strange() { return new Monster('strange', 'strange', new Attributes(0, 0, 0, 1,1,1,1,1,1,0,0,0,1,0), null, null, null, 0, 1.2) },
    zombie() { return new Monster('zombie', 'zombie', new Attributes(0, 5, 3, -2,-2,-2,0,0,0,-1,-2,0,0,0), null, null, null, 0, 2)},
    dark() { return new Monster('dark', 'dark', new Attributes(0, 1, 0, 1, 1,0,0,1,0,1,-1,1,0,0), null, null, null, 0, 1.3 ) },
    fire() { return new Monster('fire', 'fire', new Attributes(0, 1, 2, 1,0,0,0,1,1,0,0,1,0,0), null, null, null , 0, 3) },
    water() { return new Monster('water', 'water', new Attributes(0, 1, 0, 2,2,1,1,1,1,0,0,1,0,0), null, null, null, 0, 3) },
    earth() { return new Monster('earth', 'earth', new Attributes(1, 3, 1, -1,-1,0,1,2,0,0,0,1,0,2), null, null, null, 0, 3) },
    air() { return new Monster('air', 'air', new Attributes(-1, -1, 0, 3,2,1,1,1,1,1,1,1,1,0), null, null, null, 0, 2) },
    demonic() { return new Monster('demonic', 'demonic', new Attributes(1, 1, 2, 1,0,1,1,1,1,1,0,2,1,0), null, null, null, 0, 4) },
    spirit() { return new Monster('spirit', 'spirit', new Attributes(0, 1, 0, 3,3,1,3,0,2,2,2,2,0,0), null, null, null, 0, 4) },
    skeletal() { return new Monster('skeletal', 'skeletal', new Attributes(0, 4, 2, -1,-1,-1,-1,0,0,0,0,0,0,0), null, null, null, 0, 2) },
    runic() { return new Monster('runic', 'runic', new Attributes(0, 2, 2, 1,1,1,1,1,1,5,0,5,1,0), null, null, null, 0, 4) },
    mummy() { return new Monster('mummy', 'mummy', new Attributes(0, 5, 3, -1,-1,0,0,0,0,0,5,1,0,0), null, null, null, 0, 5)},

    /*traits*/
    strong() { return new Monster(null, null, new Attributes(0, 0, 1, 0,0,0,0,0,0,0,0,0,0,0), null, null, null, 0, 1) },
    'very strong'() { return new Monster(null, null, new Attributes(0, 0, 1, 0,0,0,0,0,0,0,0,0,0,0), null, null, null, 0, 1) },
    quick() { return new Monster(null, null, new Attributes(0, 0, 0, 0,1,0,0,0,0,0,0,0,0,0), null, null, null, 0, 1) },
    agile() { return new Monster(null, null, new Attributes(0, 0, 1, 1,0,0,0,0,0,0,0,0,0,0), null, null, null, 0, 1) },
    'very quick'() { return new Monster(null, null, new Attributes(0, 0, 0,0,1,0,0,0,0,0,0,0,0,0), null, null, null, 0, 1) },
    'very agile'() { return new Monster(null, null, new Attributes(0, 0, 0, 1,0,0,0,0,0,0,0,0,0,0), null, null, null, 0, 1) },
    tough() { return new Monster(null, null, new Attributes(0, 1, 0, 0,0,0,0,0,0,0,0,0,0,0), null, null, null, 0, 1) },
    'very tough'() { return new Monster(null, null, new Attributes(0, 1, 0, 0,0,0,0,0,0,0,0,0,0,0), null, null, null, 0, 1) },
    lucky() { return new Monster(null, null, new Attributes(0, 0, 0, 0,0,0,0,0,0,1,1,1,1,0), null, null, null, 0, 1) },

    armor() { return new Monster(null, null, new Attributes(0, 0, 0, 0,0,0,0,0,0,0,0,0,0,3), null, null, null, 0, 1) },
    strength() { return new Monster(null, null, new Attributes(0, 0, 3, 0,0,0,0,0,0,0,0,0,0,0), null, null, null, 0, 1) },
    toughness() { return new Monster(null, null, new Attributes(0, 3, 0, 0,0,0,0,0,0,0,0,0,0,0), null, null, null, 0, 1) },
    agility() { return new Monster(null, null, new Attributes(0, 0, 0, 3,0,0,0,0,0,0,0,0,0,0), null, null, null, 0, 1) },
    accuracy() { return new Monster(null, null, new Attributes(0, 0, 0, 0,0,0,0,0,0,10,10,0,0,0), null, null, null, 0, 1) },
    intellect() { return new Monster(null, null, new Attributes(0, 0, 0, 0,0,3,0,0,0,0,0,0,0,0), null, null, null, 0, 1) },
    'feeble armor'() { return new Monster(null, null, new Attributes(0, 0, 0, 0,0,0,0,0,0,0,0,0,0,1), null, null, null, 0, 1) },
    'feeble strength'() { return new Monster(null, null, new Attributes(0, 0, 1, 0,0,0,0,0,0,0,0,0,0,0), null, null, null, 0, 1) },
    'feeble toughness'() { return new Monster(null, null, new Attributes(0, 1, 0, 0,0,0,0,0,0,0,0,0,0,0), null, null, null, 0, 1) },
    'feeble agility'() { return new Monster(null, null, new Attributes(0, 0, 0, 1,0,0,0,0,0,0,0,0,0,0), null, null, null, 0, 1) },
    'feeble accuracy'() { return new Monster(null, null, new Attributes(0, 0, 0, 0,0,0,0,0,0,5,5,0,0,0), null, null, null, 0, 1) },
    'feeble intellect'() { return new Monster(null, null, new Attributes(0, 0, 0, 0,0,1,0,0,0,0,0,0,0,0), null, null, null, 0, 1) },
    'weak armor'() { return new Monster(null, null, new Attributes(0, 0, 0, 0,0,0,0,0,0,0,0,0,0,2), null, null, null, 0, 1) },
    'weak strength'() { return new Monster(null, null, new Attributes(0, 0, 2, 0,0,0,0,0,0,0,0,0,0,0), null, null, null, 0, 1) },
    'weak toughness'() { return new Monster(null, null, new Attributes(0, 2, 0, 0,0,0,0,0,0,0,0,0,0,0), null, null, null, 0, 1) },
    'weak agility'() { return new Monster(null, null, new Attributes(0, 0, 0, 2,0,0,0,0,0,0,0,0,0,0), null, null, null, 0, 1) },
    'weak accuracy'() { return new Monster(null, null, new Attributes(0, 0, 0, 0,0,0,0,0,0,7,7,0,0,0), null, null, null, 0, 1) },
    'weak intellect'() { return new Monster(null, null, new Attributes(0, 0, 0, 0,0,2,0,0,0,0,0,0,0,0), null, null, null, 0, 1) },
    'strong armor'() { return new Monster(null, null, new Attributes(0, 0, 0, 0,0,0,0,0,0,0,0,0,0,4), null, null, null, 0, 1) },
    'strong strength'() { return new Monster(null, null, new Attributes(0, 0, 4, 0,0,0,0,0,0,0,0,0,0,0), null, null, null, 0, 1) },
    'strong toughness'() { return new Monster(null, null, new Attributes(0, 4, 0, 0,0,0,0,0,0,0,0,0,0,0), null, null, null, 0, 1) },
    'strong agility'() { return new Monster(null, null, new Attributes(0, 0, 0, 4,0,0,0,0,0,0,0,0,0,0), null, null, null, 0, 1) },
    'strong accuracy'() { return new Monster(null, null, new Attributes(0, 0, 0, 0,0,0,0,0,0,13,13,0,0,0), null, null, null, 0, 1) },
    'strong intellect'() { return new Monster(null, null, new Attributes(0, 0, 0, 0,0,4,0,0,0,0,0,0,0,0), null, null, null, 0, 1) },
    'powerful armor'() { return new Monster(null, null, new Attributes(0, 0, 0, 0,0,0,0,0,0,0,0,0,0,5), null, null, null, 0, 1) },
    'powerful strength'() { return new Monster(null, null, new Attributes(0, 0, 5, 0,0,0,0,0,0,0,0,0,0,0), null, null, null, 0, 1) },
    'powerful toughness'() { return new Monster(null, null, new Attributes(0, 5, 0, 0,0,0,0,0,0,0,0,0,0,0), null, null, null, 0, 1) },
    'powerful agility'() { return new Monster(null, null, new Attributes(0, 0, 0, 5,0,0,0,0,0,0,0,0,0,0), null, null, null, 0, 1) },
    'powerful accuracy'() { return new Monster(null, null, new Attributes(0, 0, 0, 0,0,0,0,0,0,16,16,0,0,0), null, null, null, 0, 1) },
    'powerful intellect'() { return new Monster(null, null, new Attributes(0, 0, 0, 0,0,5,0,0,0,0,0,0,0,0), null, null, null, 0, 1) },
    'mighty armor'() { return new Monster(null, null, new Attributes(0, 0, 0, 0,0,0,0,0,0,0,0,0,0,6), null, null, null, 0, 1) },
    'mighty strength'() { return new Monster(null, null, new Attributes(0, 0, 6, 0,0,0,0,0,0,0,0,0,0,0), null, null, null, 0, 1) },
    'mighty toughness'() { return new Monster(null, null, new Attributes(0, 6, 0, 0,0,0,0,0,0,0,0,0,0,0), null, null, null, 0, 1) },
    'mighty agility'() { return new Monster(null, null, new Attributes(0, 0, 0, 6,0,0,0,0,0,0,0,0,0,0), null, null, null, 0, 1) },
    'mighty accuracy'() { return new Monster(null, null, new Attributes(0, 0, 0, 0,0,0,0,0,0,20,20,0,0,0), null, null, null, 0, 1) },
    'mighty intellect'() { return new Monster(null, null, new Attributes(0, 0, 0, 0,0,6,0,0,0,0,0,0,0,0), null, null, null, 0, 1) },

    warrior() { return new Monster('warrior', 'warrior', new Attributes(0,1,1,0,0,0,0,0,0,10,0,0,0,0), null, null, null, 0, 1.5) },
    rogue() { return new Monster('rogue', 'rogue', new Attributes(      0,0,1,1,1,0,0,0,0,5,10,0,0,0), null, null, null, 0, 1.5) },
    mage() { return new Monster('mage', 'mage', new Attributes(         0,0,0,0,0,1,1,0,0,0,0,20,0,0), null, null, null, 0, 1.5) },
    shaman() { return new Monster('shaman', 'shaman', new Attributes(   0,0,1,0,0,1,0,0,0,5,0,15,0,0), null, null, null, 0, 1.5) },

    hungry() { return new Monster(null, null, new Attributes(0, 0, -1, -1,-1,0,0,0,0,0,0,0,0,0), null, null, null, 0, 1) },
    'very hungry'() { return new Monster(null, null, new Attributes(0, 0, -2, -2,-2,0,0,0,0,0,0,0,0,0), null, null, null, 0, 1) },
    sated() { return new Monster(null, null, new Attributes(0, 0, 1, 1,1,0,0,0,0,0,0,0,0,0), null, null, null, 0, 1) },

    thirsty() { return new Monster(null, null, new Attributes(0, 0, 0, -1,0,-1,-1,0,0,0,0,0,0,0), null, null, null, 0, 1) },
    'very thirsty'() { return new Monster(null, null, new Attributes(0, 0, -1, -1,-1,-2,-2,0,0,0,0,0,0,0), null, null, null, 0, 1) },
    parched() { return new Monster(null, null, new Attributes(0, 0, -1, -2,-2,-3,-3,0,0,0,0,0,0,0), null, null, null, 0, 1) },
}

export default MonsterStats;