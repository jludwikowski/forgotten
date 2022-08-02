import Monster from "./monster.js";
import inquirer from "inquirer";

class Npc extends Monster {

    constructor(monster) {
        super(monster.name, monster.description, monster.attributes, monster.items, null, null, 0, 0);
    }

    dialog = '(cheerfully) Welcome. Welcome';

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

    async initiateTrade(buyer){
        const itemName = await this.askForItem(this.items);
        const index = this.findItem(itemName);
        if(index != -1) {
            const price = this.getItemPrice(this.items[index], this, buyer)
            if (buyer.money > price) {
                buyer.items.push(this.items[index]);
                buyer.money -= price;
                this.money += price;
                this.items.splice(index, 1);
            } else {
                console.log(buyer.name + ' cannot afford this')
            }
        }
    }

    getItemPrice(item, seller, buyer) {
        return Math.floor(item.price * (200 + seller.attributes.haggling - buyer.attributes.haggling)/200);
    }

}

export default Npc