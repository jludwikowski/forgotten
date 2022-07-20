import crypto from 'crypto';

class Item {

    constructor(name, description, weight, price) {
        this.identity = 'item',
        this.id = crypto.randomUUID(),
        this.name = name,
        this.description = description,
        this.weight = weight,
        this.price = price
    }

    adjustItem(item){
        this.name = item.name? item.name + ' ' + this.name: this.name;
        this.description = item.description? item.description + ' ' + this.description: this.description;
        this.weight +=  item.weight;
        this.price = Math.round(this.price*item.price);
    }

}

export default Item;