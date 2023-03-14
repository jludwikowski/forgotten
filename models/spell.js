import chalk from "chalk";
import Entity from "./entity.js";

class Spell extends Entity {

    constructor(name, description, cost, combat, duration, effect, strength, attackAll) {
        super(name,description);
        this.cost = cost,
        this.combat = combat,
        this.duration = duration,
        this.durationLeft = duration,
        this.effect = effect,
        this.strength = strength,
        this.attackAll = attackAll
    }

    adjust(spell){
        if( ( this.name.includes('missile') || this.name.includes('ball') ) && (spell.name == 'short' || spell.name == 'extended') ) {
            return
        }
        let effectModifierTable = ['weak','feeble','strong','powerful','mighty']
        this.name = spell.name? spell.name + ' ' + this.name: this.name;
        this.description = spell.description ? spell.description + ' ' + this.description: this.description;
        this.cost =  Math.round(this.cost*spell.cost);
        this.duration = spell.duration ? spell.duration + this.duration : this.duration;
        this.strength = spell.strength ? spell.strength + this.strength : this.strength;
        this.effect = spell.effect ? spell.effect : this.effect;
        if(this.effect && effectModifierTable.includes(spell.name)) {
            this.effect = spell.name + ' ' + this.effect
        }
    }

    apply(player) {
        if(!player.traits.includes(this.effect)) {
            player.addTrait(this.effect);
        }
        this.durationLeft = this.duration;
        console.log(chalk.green('You are now under effect of:' + this.effect));
    }

    timerTick(player) {
        this.durationLeft-=1;
        if(this.durationLeft==0){
            player.removeTrait(this.effect);
            console.log(chalk.yellow('You are no longer under effect of:' + this.effect));
        }
    }

}

export default Spell;