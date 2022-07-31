import Monster from "./monster.js";
import MonsterStats from "../stats/monster-stats.js";
import Item from "./item.js";
import Weapon from "./weapon.js";

class Player extends Monster {
    constructor(name, description, race, location) {
        let BoilerPlate = MonsterStats[race]();
        let items = [new Item('coin','small copper coin',0.1,1)];
        let mainWeapon = new Weapon('rusty sword', 'rusty sword', 1.4, 0, 3,5);
        super(name, description, BoilerPlate.attributes, items, mainWeapon, null, 0);
        console.log(this);
        console.log(this.money);
        this.location = location;
    }

    showStats() {
        this.attributes.show();
    }

    findItem(name) {
        if(this.items!=null) {
            const index = this.items.findIndex(item => {
                return item.name === name;
            });
            return index;
        }
        return -1;
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