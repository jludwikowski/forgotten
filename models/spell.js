import chalk from "chalk";

class Spell{

    constructor(name, description, cost, combat, duration, effect,strenght,attackAll) {
        this.name = name,
        this.description = description,
        this.cost = cost,
        this.combat = combat,
        this.duration = duration,
        this.durationLeft = duration,
        this.effect = effect,
        this.strenght = strenght,
        this.attackAll = attackAll
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