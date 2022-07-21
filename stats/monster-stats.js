import Attributes from "../models/attributes.js";
import Monster from "../models/monster.js";
import WeaponGenerator from "../generator/weapon-generator.js";
import roller from "../generator/roller.js";
import ItemGenerator from "../generator/item-generator.js";

let MonsterStats = {
    goblin() {return new Monster('goblin', 'goblin', new Attributes(10, 10, 1, 20), ItemGenerator.generateEntities(), WeaponGenerator.generateEntity(), roller.rollDice(5))},
    orc() {return new Monster('orc', 'orc', new Attributes(30, 30, 3, 20), ItemGenerator.generateEntities(), WeaponGenerator.generateEntity(), roller.rollDice(20))},
    ogre() {return new Monster('ogre', 'ogre', new Attributes(70, 70, 6, 10), ItemGenerator.generateEntities(), WeaponGenerator.generateEntity(), roller.rollDice(20))},
    slime() {return new Monster('slime', 'slime', new Attributes(40, 40, 1, 10), ItemGenerator.generateEntities(), null, roller.rollDice(10))},
    wolf() {return new Monster('wolf', 'wolf', new Attributes(20, 20, 2, 30), null, null, 0)},
    spider() {return new Monster('spider', 'spider', new Attributes(30, 30, 1, 30), null, null, 0)},
    lizard() {return new Monster('lizard', 'lizard', new Attributes(15, 15, 2, 10), null, null, 0)},
    boar() {return new Monster('boar', 'boar', new Attributes(40, 40, 3, 10), null, null, 0)},
    rat() {return new Monster('rat', 'rat', new Attributes(10, 10, 0, 10), null, null, 0)},
    bear() {return new Monster('bear', 'bear', new Attributes(80, 80, 7, 15), null, null, 0)},
    dragon() {return new Monster('dragon', 'dragon', new Attributes(1000, 1000, 12, 50), null, null, 0)},
    human() {return new Monster('human bandit', 'human bandit', new Attributes(30, 30, 1, 20), ItemGenerator.generateEntities(), WeaponGenerator.generateEntity(), roller.rollDice(20))},
    elf() {return new Monster('elf bandit', 'elf bandit', new Attributes(20, 20, 1,  0), ItemGenerator.generateEntities(), WeaponGenerator.generateEntity(), roller.rollDice(20))},

    small() {return new Monster('small', 'small', new Attributes(0.8, 0.8, -1, 0), null, null, 0)},
    large() {return new Monster('large', 'large', new Attributes(1.2, 1.2, 1, 0), null, null, 0)},
    huge() {return new Monster('huge', 'huge', new Attributes(1.5, 1.5, 2, -5), null, null, 0)},
    terrifying() {return new Monster('terrifying', 'terrifying', new Attributes(1.2, 1.2, 0, 10), null, null, 0)},
    strange() {return new Monster('strange', 'strange', new Attributes(1.1, 1.1, 0, 5), null, null, 0)},
    zombie() {return new Monster('zombie', 'zombie', new Attributes(2, 2, 2, -10), null, null, 0)},
    dark() {return new Monster('dark', 'dark', new Attributes(1, 1, 0, 5), null, null, 0)},
    fire() {return new Monster('fire', 'fire', new Attributes(1, 1, 2, 5), null, null, 0)},
    water() {return new Monster('water', 'water', new Attributes(1.1, 1.1, 0, 5), null, null, 0)},
    earth() {return new Monster('earth', 'earth', new Attributes(2, 2, 0, 0), null, null, 0)},
    air() {return new Monster('air', 'air', new Attributes(1, 1, 0, 10), null, null, 0)},
    demonic() {return new Monster('demonic', 'demonic', new Attributes(1.2, 1.2, 2, 5), null, null, 0)},
    spirit() {return new Monster('spirit', 'spirit', new Attributes(1.5, 1.5, 0, 10), null, null, 0)},
    skeletal() {return new Monster('skeletal', 'skeletal', new Attributes(1.5, 1.5, 1, 0), null, null, 0)},

}

export default MonsterStats;