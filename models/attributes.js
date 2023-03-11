class Attributes {

    constructor(size, body, strength, agility, reflex, intellect, willpower, stamina, spirit, melee, ranged, spellcasting, critical, naturalArmor, haggling) {
        this.size = size,
        this.body = body,
        this.strength = strength,
        this.agility = agility,
        this.reflex = reflex,
        this.intellect = intellect,
        this.willpower = willpower,
        this.stamina = stamina,
        this.spirit = spirit,
        this.melee = melee,
        this.ranged = ranged,
        this.spellcasting = spellcasting
        this.maxHP = this.body*5+5+this.size*5,
        this.currentHP = this.maxHP,
        this.naturalArmor = naturalArmor ? naturalArmor : 0,
        this.ciritical = critical;
        this.haggling = haggling? haggling : 0
    }

    adjust(adjustAttributes) {
        if(adjustAttributes!=null) {
            this.size += adjustAttributes.size;
            this.body += adjustAttributes.body;
            this.strength += adjustAttributes.strength;
            this.agility += adjustAttributes.agility;
            this.reflex += adjustAttributes.reflex;
            this.intellect += adjustAttributes.intellect;
            this.willpower += adjustAttributes.willpower;
            this.stamina += adjustAttributes.stamina;
            this.spirit += adjustAttributes.spirit;
            this.melee += adjustAttributes.melee;
            this.ranged += adjustAttributes.ranged;
            this.spellcasting += adjustAttributes.spellcasting;
            this.naturalArmor = adjustAttributes.naturalArmor? this.naturalArmor + adjustAttributes.naturalArmor: this.naturalArmor;
            this.ciritical += adjustAttributes.ciritical;
            this.haggling += adjustAttributes.haggling;
            this.update();
        }
    }

    reverse(adjustAttributes) {
        if (adjustAttributes != null) {
            this.size -= adjustAttributes.size;
            this.body -= adjustAttributes.body;
            this.strength -= adjustAttributes.strength;
            this.agility -= adjustAttributes.agility;
            this.reflex -= adjustAttributes.reflex;
            this.intellect -= adjustAttributes.intellect;
            this.willpower -= adjustAttributes.willpower;
            this.stamina -= adjustAttributes.stamina;
            this.spirit -= adjustAttributes.spirit;
            this.melee -= adjustAttributes.melee;
            this.ranged -= adjustAttributes.ranged;
            this.spellcasting -= adjustAttributes.spellcasting;
            this.naturalArmor = adjustAttributes.naturalArmor? this.naturalArmor - adjustAttributes.naturalArmor: this.naturalArmor;
            this.ciritical -= adjustAttributes.ciritical;
            this.update();
        }
    }

    updateHealth() {
        this.update()
        this.currentHP = this.maxHP
    }

    update() {
        this.maxHP = this.body*5+5+this.size*2;
    }

    show() {
        console.log(this);
    }

}

export default Attributes;