import Item from "./item.js";

class Armor extends Item {

    constructor(name, description, weight, price, damageReduction) {
        super(name,description, weight, price);
        this.damageReduction = damageReduction;
        this.equipable = true;
    }

    adjust(armor){
        super.adjust(armor);
        this.damageReduction += armor.damageReduction;
    }
}

export default Armor;