import roller from "./roller.js";
import Item from "../models/item.js";

let ItemGenerator = {
    types: ['coin','pot','bottle','book','boots','tunic','pan','coat'],
    adjectives: ['ancient','old','weathered','new','strange','intricate','exceptional','elf-crafted','ornate','sturdy'],

    generateItems() {
        let items=[];
        while(roller.roll()<30){
            items.push(this.generateItem())
        }
        return items;
    },

    generateItem() {
        let type = roller.pickAtRandom(this.types);
        let adjective = (roller.roll() < 70) ? roller.pickAtRandom(this.adjectives) : ''
        let item =  this.getStat(type);
        item = this.getAdjust(item, adjective);
        console.log(item);
        return item;
    },

    getStat(type){
        switch(type) {
            case 'coin':
                return new Item(type,type,0.01,10);
            case 'pot':
                return new Item(type,type,2,1);
            case 'bottle':
                return new Item(type,type,1,6);
            case 'book':
                return new Item(type,type,1.5,20);
            case 'boots':
                return new Item(type,type,1.7,8);
            case 'tunic':
                return new Item(type,type,1.2,6);
            case 'pan':
                return new Item(type,type,2.2,4);
            case 'coat':
                return new Item(type,type,1.6,10);
            default:
                return new Item(type,type,1.4,3);
        }
    },

    getAdjust(item,adjective){
        let adjust;
        switch(adjective) {
            case 'old':
                adjust = new Item(adjective,adjective,-0.1,0.5);
                break;
            case 'weathered':
                adjust = new Item(adjective,adjective,0,0.6);
                break;
            case 'new':
                adjust = new Item(adjective,adjective,0,1.3);
                break;
            case 'strange':
                adjust = new Item(adjective,adjective,0,2);
                break;
            case 'ancient':
                adjust = new Item(adjective,adjective,0,8);
                break;
            case 'intricate':
                adjust = new Item(adjective,adjective,0,2);
                break;
            case 'exceptional':
                adjust = new Item(adjective,adjective,0,3);
                break;
            case 'elf-crafted':
                adjust = new Item(adjective,adjective,-0.1,5);
                break;
            case 'ornate':
                adjust = new Item(adjective,adjective,+0.2,10);
                break;
            case 'sturdy':
                adjust = new Item(adjective,adjective,+0.2,1.5);
                break;
            default:
                adjust = new Item(adjective,adjective,0,1);
        }
        item.adjustItem(adjust);
        return item;
    }
}

export default ItemGenerator