import Item from "./item.js"

class Weapon extends Item {
    constructor(name, description, weight, attackBonus, baseDamage, price) {
        super(name, description, weight, price),
        this.attackBonus = attackBonus,
        this.baseDamage = baseDamage
        this.equipable = true;
    }

    adjust(weapon){
        super.adjust(weapon);
        this.attackBonus += weapon.attackBonus;
        this.baseDamage += weapon.baseDamage;
    }
}

export default Weapon;