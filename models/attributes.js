class Attributes {

    constructor(maxHP, currentHP, strength, attack, naturalArmor) {
        this.maxHP = maxHP,
        this.currentHP = currentHP,
        this.strength = strength,
        this.attack = attack,
        this.naturalArmor = naturalArmor ? naturalArmor : 0
    }

    adjust(adjustAttributes) {
        if(adjustAttributes!=null) {
            this.maxHP = Math.round(adjustAttributes.maxHP * this.maxHP);
            this.currentHP = Math.round(adjustAttributes.currentHP * this.currentHP);
            this.strength += adjustAttributes.strength;
            this.attack += adjustAttributes.attack;
        }
    }

    show() {
        console.log(this);
    }

}

export default Attributes;