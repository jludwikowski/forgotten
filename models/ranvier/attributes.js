class RanvierAttributes {

    constructor(attributes) {
    	this.health = attributes.maxHP*2,
    	this.energy = 50 + attributes.stamina ? attributes.stamina*5 : 10,
        this.constitution = attributes.body*5 + (attributes.size*3),
        this.strength = attributes.strength*5,
        this.agility = attributes.agility*5,
        this.stamina = attributes.stamina ? attributes.stamina*5 : 20,
        this.intellect = attributes.intellect*5,
        this.willpower = attributes.willpower*5,
        this.melee = attributes.melee,
        this.ranged = attributes.ranged,
        this.spellcasting = attributes.spellcasting,
        this.spirit = attributes.spirit ? attributes.spirit*5 : 10,
        this.armor = attributes.naturalArmor ? attributes.naturalArmor : 0,
        this.charisma = attributes.haggling ? attributes.haggling*5 : 5,
        this.critical = attributes.critical ? attributes.critical : 1
    }
}

export default RanvierAttributes