import crypto from 'crypto';
import chalk from "chalk";

class Monster {

    constructor(name, description, attributes, items, mainWeapon, money) {
        this.identity = 'monster',
        this.id = crypto.randomUUID(),
        this.name = name,
        this.description = description,
        this.attributes = attributes,
        this.mainWeapon = mainWeapon,
        this.items = items,
        this.money = money
    }

    adjust(monster) {
        this.name = monster.name? monster.name + ' ' + this.name: this.name;
        this.description = monster.description? monster.description + ' ' + this.description: this.description;
        this.attributes.adjust(monster.attributes);
    }

    append(adjective) {
        this.name = adjective + ' ' + this.name;
        this.description = adjective + ' ' + this.description;
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