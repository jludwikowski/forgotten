import chalk from "chalk";
import Entity from "./entity.js";

class Monster extends Entity{

    constructor(name, description, attributes, items, mainWeapon, armor, money, exp) {
        super(name,description);
        this.identity = 'monster',
        this.attributes = attributes,
        this.mainWeapon = mainWeapon,
        this.items = items,
        this.money = money,
        this.armor = armor,
        this.exp = exp,
        this.traits = [],
        this.traisTable = [
            {name:'strong',price:1000},
            {name:'very strong', price:2000},
            {name:'quick',price:1000},
            {name:'agile',price:1000},
            {name:'very quick',price:2000},
            {name:'very agile',price:2000},
            {name:'tough',price:1000},
            {name:'very tough',price:2000},
            {name:'lucky',price:1000}]
    }

    adjust(monster) {
        this.name = monster.name? monster.name + ' ' + this.name: this.name;
        this.description = monster.description? monster.description + ' ' + this.description: this.description;
        this.attributes.adjust(monster.attributes);
        this.exp = monster.exp? this.exp*monster.exp : this.exp;
    }

    getAttack(type) {
        let weaponAttack = (this.mainWeapon) ? this.mainWeapon.attackBonus : 0;
        let naturalAttack = (type == 'ranged')? this.attributes.agility*4 + this.attributes.ranged: this.attributes.agility*2 + this.attributes.strength*2 + this.attributes.melee;
        return weaponAttack + naturalAttack;
    }

    getDefence() {
        return this.attributes.reflex*4 + this.attributes.agility*2 - this.attributes.size*2;
    }

    getDamage() {
        let weaponDamage = (this.mainWeapon) ? this.mainWeapon.baseDamage : 0;
        return weaponDamage + this.attributes.strength;
    }

    damage(damageValue) {
        let armor = this.attributes.naturalArmor? this.attributes.naturalArmor: 0;
        armor += this.armor? this.armor.damageReduction: 0;
        damageValue -= armor;
        if(damageValue>0) {
            this.attributes.currentHP -= damageValue;
            if (this.attributes.currentHP < 0) {
                console.log(chalk.red(this.name + ' is DEAD'));
            }
        } else {
            console.log(chalk.yellow(this.name + '\'s armor soaked all damage'));
        }
    }

    heal(value) {
        this.attributes.currentHP = (this.attributes.currentHP + value < this.attributes.maxHP)?
            this.attributes.currentHP + value : this.attributes.maxHP;
    }
}

export default Monster;