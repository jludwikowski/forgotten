import Item from "./item.js"

class Weapon extends Item {
    constructor(name, description, weight, attackBonus, baseDamage, price) {
        super(name, description, weight, price),
        this.attackBonus = attackBonus,
        this.baseDamage = baseDamage
    }

    adjust(weapon){
        this.name = weapon.name? weapon.name + ' ' + this.name: this.name;
        this.description = weapon.description? weapon.description + ' ' + this.description: this.description;
        this.weight +=  weapon.weight;
        this.attackBonus += weapon.attackBonus;
        this.baseDamage += weapon.baseDamage;
        this.price = Math.round(this.price*weapon.price);
    }
}

export default Weapon;