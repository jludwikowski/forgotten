class Attributes {

    constructor(maxHP, currentHP, strength, attack) {
        this.maxHP = maxHP,
        this.currentHP = currentHP,
        this.strength = strength,
        this.attack = attack
    }

    adjust(adjustAttributes) {
        this.maxHP += adjustAttributes.maxHP;
        this.currentHP += adjustAttributes.currentHP;
        this.strength += adjustAttributes.strength;
        this.attack += adjustAttributes.attack;
    }

    show() {
        console.log(this);
    }

}

export default Attributes;