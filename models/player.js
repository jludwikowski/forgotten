import Monster from "./monster.js";
import MonsterStats from "../generator/monster-stats.js";
import Item from "./item.js";
import Weapon from "./weapon.js";

class Player extends Monster {
    constructor(name, description,location) {
        let attributes = MonsterStats.getStats('human');
        let items = [new Item('coin','small copper coin',0.1)];
        let mainWeapon = new Weapon('rusty sword', 'rusty sword', 1.4, 0, 3);
        super(name, description, attributes, items, mainWeapon);
        this.location = location;
    }

    showStats() {
        this.attributes.show();
    }
}

export default Player;