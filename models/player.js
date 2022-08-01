import Monster from "./monster.js";
import MonsterStats from "../stats/monster-stats.js";
import Item from "./item.js";
import Weapon from "./weapon.js";
import Npc from "./npc.js";

class Player extends Npc {
    constructor(name, description, race, location) {
        let BoilerPlate = MonsterStats[race]();
        let items = [new Item('mysterious coin','small weird copper coin',0.1,1)];
        let mainWeapon = new Weapon('rusty sword', 'rusty sword', 1.4, 0, 3,5);
        let monster = new Monster(name, description, BoilerPlate.attributes, items, mainWeapon, null, 0, 0);
        super(monster);
        this.location = location;
    }

    showStats() {
        this.attributes.show();
        console.log('EXP: ' + this.exp);
    }

    drop(name) {
        const index = this.findItem(name);
        if(index != -1) {
            this.items.splice(index, 1);
        } else {
            console.log('Item not in inventory');
        }
    }

    equip(name) {
        const index = this.findItem(name);
        if(index != -1 && this.items[index].equipable) {
            let oldItem
            if(this.items[index] instanceof Weapon) {
                oldItem = this.mainWeapon;
                this.mainWeapon = this.items[index];
            } else {
                oldItem = this.armor;
                this.armor = this.items[index];
            }
            this.items.splice(index, 1);
            this.items.push(oldItem);
        } else {
            console.log('Not found or not equipable item')
        }
    }
}

export default Player;