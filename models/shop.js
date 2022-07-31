import Npc from './npc.js';
import MonsterGenerator from '../generator/monster-generator.js'
import WeaponGenerator from "../generator/weapon-generator.js";
import ArmorGenerator from "../generator/armor-generator.js";
import inquirer from "inquirer";
import Feature from "./feature.js";

class Shop extends Feature {
    constructor() {
        super('Small shop selling weapons and armors','Small shop selling weapons and armors'),
        this.shopkeeper = MonsterGenerator.generateEntityByTypes(['human','elf','orc']),
        this.items = WeaponGenerator.generateEntities().concat(ArmorGenerator.generateEntities())
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

    async initiateTrade(from, to, action){
        const itemName = await this.askForItem(from.items);
        const index = from.findItem(itemName);
        if(index != -1) {
            await this[action](from, to, index)
        }
    }

    async buy(shop, player, index) {
        if (player.money > shop.items[index].price) {
            player.items.push(shop.items[index]);
            player.money -= shop.items[index].price;
            shop.items.splice(index, 1);
        } else {
            console.log('You cannot afford this')
        }
    }

    async sell(player, shop, index) {
        console.log('Selling items at quater of a price!!');
        shop.items.push(player.items[index]);
        player.money += Math.floor(player.items[index].price / 4);
        player.items.splice(index, 1);
    }
}

export default Shop