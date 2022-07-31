import Attributes from "../models/attributes.js";
import Monster from "../models/monster.js";
import WeaponGenerator from "../generator/weapon-generator.js";
import ArmorGenerator from "../generator/armor-generator.js";
import roller from "../engine/roller.js";
import ItemGenerator from "../generator/item-generator.js";

let MonsterStats = {
    goblin() {
        return new Monster('goblin', 'goblin', new Attributes(1,2, 1, 3, 2,2,1,3,3,3,0),
        ItemGenerator.generateEntities(), WeaponGenerator.generateEntity(), ArmorGenerator.generateEntity(), roller.rollDice(5))
    },
    orc() {
        return new Monster('orc', 'orc', new Attributes(3, 4, 3, 2,2,2,2,4,2,1,0),
        ItemGenerator.generateEntities(), WeaponGenerator.generateEntity(), ArmorGenerator.generateEntity(), roller.rollDice(20))
    },
    ogre() {
        return new Monster('ogre', 'ogre', new Attributes(5, 8, 6, 1,1,1,1,3,2,0,1),
        ItemGenerator.generateEntities(), WeaponGenerator.generateEntity(), ArmorGenerator.generateEntity(), roller.rollDice(20))
    },
    slime() {
        return new Monster('slime', 'slime', new Attributes(2, 8, 1, 1,1,1,1,1,0,0,1),
        ItemGenerator.generateEntities().concat(WeaponGenerator.generateEntityWithProbability()).concat(ArmorGenerator.generateEntityWithProbability()), null, roller.rollDice(10))
    },
    wolf() { return new Monster('wolf', 'wolf', new Attributes(2, 3, 2, 4,4,1,2,4,0,0,1), null, null, 0) },
    spider() { return new Monster('spider', 'spider', new Attributes(2, 3, 1, 5, 5,0,0,3,3,0,3), null, null, 0) },
    lizard() { return new Monster('lizard', 'lizard', new Attributes(3, 4, 2, 2,5,0,0,2,0,0,1), null, null, 0) },
    boar() { return new Monster('boar', 'boar', new Attributes(4, 7, 3, 1,3,1,2,3,0,0,1), null, null, 0) },
    rat() { return new Monster('rat', 'rat', new Attributes(0, 1, 0, 2,2,1,1,2,0,0,0), null, null, 0) },
    bear() { return new Monster('bear', 'bear', new Attributes(6, 10, 7, 3,2,1,2,3,0,0,1), null, null, 0) },
    dragon() { return new Monster('dragon', 'dragon', new Attributes(10, 30, 12, 5, 3,3,4,5,6,3,10), null, null, 0) },
    human() {
        return new Monster('human bandit', 'human bandit', new Attributes(2, 3, 1, 3,2,2,2,3,3,3,0),
        ItemGenerator.generateEntities(), WeaponGenerator.generateEntity(), ArmorGenerator.generateEntity(), roller.rollDice(20))
    },
    elf() {
        return new Monster('elf bandit', 'elf bandit', new Attributes(2, 2, 1,  4, 2,3,2,3,4,4,0),
        ItemGenerator.generateEntities(), WeaponGenerator.generateEntity(), ArmorGenerator.generateEntity(), roller.rollDice(20))
    },

    small() { return new Monster('small', 'small', new Attributes(-1, -1, -1, 1,0,1,0,0,0,0,0), null, null, 0) },
    large() { return new Monster('large', 'large', new Attributes(0, 1, 1, -1,0,0,0,0,0,0,0), null, null, 0) },
    huge() { return new Monster('huge', 'huge', new Attributes(1, 2, 2, -1,-1,-1,0, 0,0,-1,0), null, null, 0) },
    terrifying() { return new Monster('terrifying', 'terrifying', new Attributes(0, 1, 0, 1,1,1,0,1,0,0,0,), null, null, 0) },
    strange() { return new Monster('strange', 'strange', new Attributes(0, 0, 0, 1,1,1,1,0,0,0,0), null, null, 0) },
    zombie() { return new Monster('zombie', 'zombie', new Attributes(0, 5, 3, -2,-2,-2,0,-1,-2,0,0), null, null, 0)},
    dark() { return new Monster('dark', 'dark', new Attributes(0, 1, 0, 1, 1,0,0,1,-1,1,0), null, null, 0) },
    fire() { return new Monster('fire', 'fire', new Attributes(0, 1, 2, 1,0,0,0,0,0,1,0), null, null, 0) },
    water() { return new Monster('water', 'water', new Attributes(0, 1, 0, 2,2,1,1,0,0,1,0), null, null, 0) },
    earth() { return new Monster('earth', 'earth', new Attributes(1, 3, 1, -1,-1,0,1,0,0,1,2), null, null, 0) },
    air() { return new Monster('air', 'air', new Attributes(-1, -1, 0, 3,2,1,1,1,1,1,0), null, null, 0) },
    demonic() { return new Monster('demonic', 'demonic', new Attributes(1, 1, 2, 1,0,1,1,1,0,2,0), null, null, 0) },
    spirit() { return new Monster('spirit', 'spirit', new Attributes(0, 1, 0, 3,3,1,3,2,2,2,0), null, null, 0) },
    skeletal() { return new Monster('skeletal', 'skeletal', new Attributes(0, 4, 2, -1,-1,-1,-1,0,0,0,0), null, null, 0) },
}

export default MonsterStats;