import Attributes from "../models/attributes.js";
import Monster from "../models/monster.js";
import WeaponGenerator from "../generator/weapon-generator.js";
import roller from "../generator/roller.js";
import ItemGenerator from "../generator/item-generator.js";

let MonsterStats = {
    goblin: new Monster('goblin', 'goblin', new Attributes(10, 10, 1, 20), ItemGenerator.generateItems(), WeaponGenerator.generateWeapon(), roller.rollDice(5)),
    orc: new Monster('orc', 'orc', new Attributes(30, 30, 3, 20), ItemGenerator.generateItems(), WeaponGenerator.generateWeapon(), roller.rollDice(20)),
    slime: new Monster('slime', 'slime', new Attributes(40, 40, 1, 10), ItemGenerator.generateItems(), null, roller.rollDice(10)),
    wolf: new Monster('wolf', 'wolf', new Attributes(20, 20, 2, 30), null, null, 0),
    spider: new Monster('spider', 'spider', new Attributes(30, 30, 1, 30), null, null, 0),
    lizard: new Monster('lizard', 'lizard', new Attributes(15, 15, 2, 10), null, null, 0),
    human: new Monster('human', 'human', new Attributes(30, 30, 1, 20), ItemGenerator.generateItems(), WeaponGenerator.generateWeapon(), roller.rollDice(20)),

    small: new Monster('small', 'small', new Attributes(-2, -2, -1, 0), null, null, 0),
    large: new Monster('large', 'large', new Attributes(5, 5, 1, 0), null, null, 0),
    huge: new Monster('huge', 'huge', new Attributes(10, 10, 2, -5), null, null, 0),
    terrifying: new Monster('terrifying', 'terrifying', new Attributes(10, 10, 0, 10), null, null, 0),
    strange: new Monster('strange', 'strange', new Attributes(5, 5, 0, 5), null, null, 0),
    zombie: new Monster('zombie', 'zombie', new Attributes(15, 15, 2, -10), null, null, 0),
}

export default MonsterStats;