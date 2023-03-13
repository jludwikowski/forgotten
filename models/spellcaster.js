import Npc from "./npc.js";
import Spell from "./spell.js";
import Judge from "../engine/Judge.js";
import chalk from "chalk";

class Spellcaster extends Npc {

	constructor(monster){
		super(monster);
		this.spells = [];
		this.activeSpells = [];
	}

	cast(name,place) {
        let protospell = this.getSpell(name);
        if(protospell){
	        if(this.attributes.currentMana > protospell.cost){
	            if(protospell.combat == false){
	                let activeSpell = new Spell(protospell.name,protospell.description,protospell.cost, protospell.combat, protospell.duration, protospell.effect, protospell.strenght);
	                this.addActiveSpell(activeSpell);
	            } else {
	                if(place.monsters && place.monsters.length>0) {
	                    Judge.resolvePlayerAttack(this, place.monsters, 'spellcasting', protospell)
	                }
	            }
	            this.attributes.currentMana -= protospell.cost;
	        } else {
	        	console.log(`${chalk.yellow('Out of MANA!')}`);
	        }
    	}
    }

    addActiveSpell(spell) {
    	let alreadyActive = this.activeSpells.filter(activeSpell => activeSpell.name == spell.name)[0];
    	if(alreadyActive){
    		alreadyActive.durationLeft = alreadyActive.duration;
    	} else {
    		this.activeSpells.push(spell);
    		spell.apply(this);
    	}
    }

    getMagicAttack() {
        return this.attributes.intellect*4 + this.attributes.spellcasting;
    }

    learnSpell(spell) {
    	this.spells.push(spell);
    }

    getSpell(name) {
    	return this.spells.filter(spell => spell.name == name)[0];
    }

}

export default Spellcaster;