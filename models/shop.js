import Npc from './npc.js';
import MonsterGenerator from '../generator/monster-generator.js'
import WeaponGenerator from "../generator/weapon-generator.js";
import ArmorGenerator from "../generator/armor-generator.js";
import Feature from "./feature.js";
import roller from "../engine/roller.js";
import SpellbookGenerator from "../generator/spellbook-generator.js";

class Shop extends Feature {
    constructor() {
        super('Small shop selling weapons and armors','Small shop selling weapons and armors'),
        this.shopkeeper = new Npc(MonsterGenerator.generateEntityByTypes(['human','elf','orc'])),
        this.shopkeeper.name = 'Shopkepper';
        this.shopkeeper.items = WeaponGenerator.generateEntities().concat(ArmorGenerator.generateEntities().concat(SpellbookGenerator.generateSpellbooks())),
        this.shopkeeper.attributes.haggling = 100 + roller.rollDice(60),
        this.shopkeeper.money = 300 + roller.rollDice(300);
    }

}

export default Shop