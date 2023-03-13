import Monster from "./monster.js";
import MonsterStats from "../stats/monster-stats.js";
import Item from "./item.js";
import Weapon from "./weapon.js";
import Armor from "./armor.js";
import Npc from "./npc.js";
import inquirer from "inquirer";
import ItemGenerator from "../generator/item-generator.js";
import SurvivalResource from "./survival-resource.js";
import Spellcaster from "./spellcaster.js"
import Spell from "./spell.js";

class Player extends Spellcaster {
    constructor(name, description, race, adventurerClass, location) {
        let BoilerPlate = MonsterStats[race]();
        BoilerPlate.adjust(MonsterStats[adventurerClass]());
        let items = [new Item('mysterious coin','small weird copper coin',0.1,1)];
        let monster = new Monster(name, description, BoilerPlate.attributes, items, null, null, 0, 0);
        super(monster);
        this.location = location;
        let hunger = new SurvivalResource('hunger',[{name: 'sated',level:0},{name:'fed',level:50},{name:'hungry',level:100},{name:'very hungry',level: 150}]);
        let thirst = new SurvivalResource('thirst',[{name:'quenched',level:30},{name:'thirsty',level:60},{name:'very thirsty',level: 90}],{name:'parched',level:110});
        thirst.hurtLevel = 110;
        this.survivalResources = {hunger: hunger,thirst: thirst};
        this.traisTable = [
            {name:'strong',price:1000},
            {name:'very strong', price:2000},
            {name:'quick',price:1000},
            {name:'agile',price:1000},
            {name:'very quick',price:2000},
            {name:'very agile',price:2000},
            {name:'tough',price:1000},
            {name:'very tough',price:2000},
            {name:'lucky',price:1000}];
        if(adventurerClass=='mage'){
            this.spells = [new Spell("fireball","Fireball",12, true, null, null,10,true),new Spell("strength","Strength",8, false, 10, 'strength'),new Spell("armor","Armor",7, false, 10, 'armor'),new Spell("missile","Magic missile",5, true, null, null,10)];
        }
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

    load(json){
        this.name = json.name;
        this.description = json.description;
        this.id = json.id;
        Object.assign(this.attributes,json.attributes);
        if(json.mainWeapon){
            this.mainWeapon = Object.setPrototypeOf(json.mainWeapon, Weapon.prototype);
        } else {
            this.mainWeapon = null;
        }
        this.money = json.money;
        if(json.armor){
            this.armor = Object.setPrototypeOf(json.armor, Weapon.prototype);
        } else {
            this.armor = null;
        }
        this.exp = json.exp;
        this.traits = json.traits;
        this.location = json.location;
        this.items = [];
        for(let item of json.items){
            this.items.push(Object.setPrototypeOf(item, Item.prototype))
        }
        this.survivalResources = {};
        for(let survivalResource in json.survivalResources){
            this.survivalResources[survivalResource] = (Object.setPrototypeOf(json.survivalResources[survivalResource], SurvivalResource.prototype))
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

    timerTick(place) {
        this.survivalResources.hunger.change(1, this);
        this.survivalResources.thirst.change(place.biome == 'desert'?2:1, this);
        this.heal(1);
        this.replenish(1);
        if(this.activeSpells){
            for(let i=0;i<this.activeSpells.length;i++){
                let spell = this.activeSpells[i]
                spell.timerTick(this);
                if(spell.durationLeft == 0){
                    this.activeSpells.splice(i, 1);
                    i--;
                }
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
                case 'roasted meat': this.survivalResources.hunger.change(-30, this); break;
                case 'berries': this.survivalResources.hunger.change(-15, this); this.survivalResources.thirst.change(-7, this); break;
                case 'raw meat': this.survivalResources.hunger.change(-10, this); break;
                case 'bug meat': this.survivalResources.hunger.change(+5, this); console.log('You vomited'); break;
                case 'roasted bug': this.survivalResources.hunger.change(-20, this); break;
                case 'waterskin':
                    if(item.weight > 0.5) {
                        this.survivalResources.thirst.change(-30, this);
                        item.weight -= 0.5;
                    } else {
                        console.log('Not enough water');
                    }
                    break;
            }
            if(item.oneUse) {
                this.items.splice(index, 1);
            }
        } else {
            console.log('No such item');
        }
    }

    refill(name) {
        const index = this.findItem(name);
        if(index != -1 && this.items[index].usable) {
            const item = this.items[index];
            item.weight = 2.1;
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