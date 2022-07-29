import chalk from "chalk";
import Entity from "./entity.js";

class Monster extends Entity{

    constructor(name, description, attributes, items, mainWeapon, armor, money) {
        super(name,description);
        this.identity = 'monster',
        this.attributes = attributes,
        this.mainWeapon = mainWeapon,
        this.items = items,
        this.money = money,
        this.armor = armor
    }

    adjust(monster) {
        this.name = monster.name? monster.name + ' ' + this.name: this.name;
        this.description = monster.description? monster.description + ' ' + this.description: this.description;
        this.attributes.adjust(monster.attributes);
    }

    getAttack() {
        let weaponAttack = (this.mainWeapon) ? this.mainWeapon.attackBonus : 0;
        return weaponAttack + this.attributes.attack;
    }

    getDamage() {
        let weaponDamage = (this.mainWeapon) ? this.mainWeapon.baseDamage : 0;
        return weaponDamage + this.attributes.strength;
    }

    damage(damageValue) {
        this.attributes.currentHP -= damageValue;
        if(this.attributes.currentHP<0) {
            console.log(chalk.red(this.name + ' is DEAD'));
        }
    }

    heal(value) {
        this.attributes.currentHP = (this.attributes.currentHP + value < this.attributes.maxHP)?
            this.attributes.currentHP + value : this.attributes.maxHP;
    }
}

export default Monster;