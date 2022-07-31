import Entity from './entity.js';
import Npc from './npc.js';
import MonsterGenerator from '../generator/monster-generator.js'
import WeaponGenerator from "../generator/weapon-generator.js";
import ArmorGenerator from "../generator/armor-generator.js";
import inquirer from "inquirer";

class Shop extends Entity{
    constructor() {
        super(),
        this.description = this.name = "Small shop selling weapons and armors",
        this.shopkeeper = MonsterGenerator.generateEntityByTypes(['human','elf','orc']),
        this.inventory = WeaponGenerator.generateEntities().concat(ArmorGenerator.generateEntities())
    }

    findItem(name) {
        if(this.inventory!=null) {
            const index = this.inventory.findIndex(item => {
                return item.name === name;
            });
            return index;
        }
        return -1;
    }

    async askForItem(inventory) {
        let inventoryNames = inventory.map(item => item.name);
        const answer = await inquirer.prompt({
            name: 'item',
            type: 'list',
            message: 'Which items you want to trade:',
            choices: inventoryNames.concat(['exit']),
            default() {
                return 'exit';
            },
        });
        return answer.item;
    }

    async initiateTrade(player, inventory, action){
        const itemName = await this.askForItem(inventory);
        const index = this.findItem(itemName);
        if(index != -1) {
            await this[action](player, index)
        }
    }

    async buy(player, index) {
        if (player.money > this.inventory[index].price) {
            player.items.push(this.inventory[index]);
            player.money -= this.inventory[index].price;
            this.inventory.splice(index, 1);
        } else {
            console.log('You cannot afford this')
        }
    }

    async sell(player, index) {
        console.log('Selling items at quater of a price!!');
        this.inventory.push(player.items[index]);
        player.money += Math.floor(player.items[index].price / 4);
        player.items.splice(index, 1);
    }
}

export default Shop