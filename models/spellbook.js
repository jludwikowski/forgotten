import Item from "./item.js";

class Spellbook extends Item {

    constructor(name, description, weight, price, usable, oneUse, spell) {
        super(name, description, weight, price, usable, oneUse);
        this.spell = spell;
    }

}

export default Spellbook;