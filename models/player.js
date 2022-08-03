import Monster from "./monster.js";
import MonsterStats from "../stats/monster-stats.js";
import Item from "./item.js";
import Weapon from "./weapon.js";
import Npc from "./npc.js";
import inquirer from "inquirer";
import ItemGenerator from "../generator/item-generator.js";
import SurvivalResource from "./survival-resource.js";

class Player extends Npc {
    constructor(name, description, race, location) {
        let BoilerPlate = MonsterStats[race]();
        let items = [new Item('mysterious coin','small weird copper coin',0.1,1)];
        let monster = new Monster(name, description, BoilerPlate.attributes, items, null, null, 0, 0);
        super(monster);
        this.location = location;
        let hunger = new SurvivalResource('hunger',[{name: 'sated',level:0},{name:'fed',level:50},{name:'hungry',level:100},{name:'very hungry',level: 150}]);
        this.survivalResources = {hunger: hunger};
    }

    showStats() {
        this.attributes.show();
        console.log('hunger: ' + this.hunger);
        console.log('EXP: ' + this.exp);
        console.log(this.traits);
        for (const key in this.survivalResources) {
            let elem = this.survivalResources[key];
            console.log(elem.name + ':' + elem.resource);
        }
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
        if(trait in MonsterStats) {
            this.adjust(MonsterStats[trait]());
        }
    }

    removeTrait(trait) {
        const index = this.traits.findIndex(item => item === trait);
        if(index != -1) {
            this.traits.splice(index, 1);
            if(trait in MonsterStats) {
                this.reverse(MonsterStats[trait]());
            }
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
                case 'roasted meat': this.survivalResources.hunger.change(-30, this);
                case 'raw meat': this.survivalResources.hunger.change(-10, this);
                case 'bug meat': this.survivalResources.hunger.change(+5, this);
                case 'roasted bug': this.survivalResources.hunger.change(-20, this);
            }
            this.items.splice(index, 1);
        }
    }

    roast() {
        while(this.findItem('raw meat')!=-1) {
            let index = this.findItem('raw meat');
            this.items.splice(index, 1);
            this.items.push(ItemGenerator.generateBasic('roasted meat'));
        }
        while(this.findItem('bug meat')!=-1) {
            let index = this.findItem('bug meat');
            this.items.splice(index, 1);
            this.items.push(ItemGenerator.generateBasic('roasted bug'));
        }
    }

}

export default Player;