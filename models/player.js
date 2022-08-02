import Monster from "./monster.js";
import MonsterStats from "../stats/monster-stats.js";
import Item from "./item.js";
import Weapon from "./weapon.js";
import Npc from "./npc.js";
import inquirer from "inquirer";

class Player extends Npc {
    constructor(name, description, race, location) {
        let BoilerPlate = MonsterStats[race]();
        let items = [new Item('mysterious coin','small weird copper coin',0.1,1)];
        let monster = new Monster(name, description, BoilerPlate.attributes, items, null, null, 0, 0);
        super(monster);
        this.location = location;
        this.hunger = 0;
    }

    showStats() {
        this.attributes.show();
        console.log('hunger: ' + this.hunger);
        console.log('EXP: ' + this.exp);
        console.log(this.traits);
    }

    drop(name) {
        const index = this.findItem(name);
        if(index != -1) {
            this.items.splice(index, 1);
        } else {
            console.log('Item not in inventory');
        }
    }

    async askForTraits(traits) {
        let traitList = traits.map(trait => trait.name + ':' + trait.price);
        const answer = await inquirer.prompt({
            name: 'trait',
            type: 'list',
            message: 'Which items you want to trade:',
            choices: traitList.concat(['exit']),
            default() {
                return 'exit';
            },
        });
        return answer.trait;
    }

    async levelUp(){
        const difference = this.traisTable.filter( x => !this.traits.includes(x.name) );
        const trait = await this.askForTraits(difference);
        if(trait != 'exit') {
            const traitArray = trait.split(":");
            if (this.exp >= traitArray[1]) {
                this.addTrait(traitArray[0])
                this.exp -= traitArray[1];
            } else {
                console.log('Not enough EXP');
            }
        }
    }

    addTrait(trait) {
        this.traits.push(trait);
        this.adjust(MonsterStats[trait]());
    }

    removeTrait(trait) {
        const index = this.traits.findIndex(item => item === trait);
        if(index != -1) {
            this.traits.splice(index, 1);
            this.reverse(MonsterStats[trait]());
            console.log(this.traits);
        }
    }

    hungerChange(value) {
        this.hunger =  (this.hunger + value < -30) ? -30 : this.hunger + value;
        if(this.hunger > 50 && this.hunger <100) {
            if (!this.traits.includes('hungry')) {
                this.addTrait('hungry');
                this.removeTrait('very hungry');
                this.removeTrait('sated');
            }
        }
        if(this.hunger < 0) {
            if (!this.traits.includes('sated')) {
                this.addTrait('sated');
                this.removeTrait('very hungry');
                this.removeTrait('hungry');
            }
        }
        if(this.hunger > 100) {
            if (!this.traits.includes('very hungry')) {
                this.addTrait('very hungry');
                this.removeTrait('sated');
            }
        }
        if(this.hunger > 150) {
            this.attributes.currentHP -=2;
        }
    }

    equip(name) {
        let oldItem;
        const index = this.findItem(name);
        if(index != -1 && this.items[index].equipable) {
            if(this.items[index] instanceof Weapon) {
                oldItem = this.mainWeapon;
                this.mainWeapon = this.items[index];
            } else {
                oldItem = this.armor;
                this.armor = this.items[index];
            }
            this.items.splice(index, 1);
            if(oldItem!=null) {
                this.items.push(oldItem);
            }
        } else {
            console.log('Not found or not equipable item')
        }
    }

    use(name, place) {
        const index = this.findItem(name);
        if(index != -1 && this.items[index].usable) {
            const item = this.items[index];
            switch(item.name) {
                case 'roasted meat': this.hungerChange(-30);
            }
            this.items.splice(index, 1);
        }
    }

}

export default Player;