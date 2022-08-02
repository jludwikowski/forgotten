import Entity from "./entity.js";

class Item extends Entity {

    constructor(name, description, weight, price, usable) {
        super(name,description);
        this.identity = 'item',
        this.weight = weight,
        this.price = price
        this.equipable = false;
        this.usable = usable;
    }

    adjust(item){
        this.name = item.name? item.name + ' ' + this.name: this.name;
        this.description = item.description? item.description + ' ' + this.description: this.description;
        this.weight =  Math.round(this.weight*item.weight);
        this.price = Math.round(this.price*item.price);
    }

}

export default Item;