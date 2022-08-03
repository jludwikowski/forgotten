import chalk from "chalk";

class SurvivalResource {
    constructor(name, traitsTable) {
        this.name = name;
        this.traitsTable = traitsTable;
        this.resource = 0;
        this.minLevel = -30;
        this.hurtLevel = 150;
    }

    change(value, player) {
        this.resource = (this.resource + value < this.minLevel) ? this.minLevel : this.resource + value;
        for (let elem of this.traitsTable) {
            if (this.resource < elem.level) {
                if(!player.traits.includes(elem.name)) {
                    this.traitsTable.forEach(trait => player.removeTrait(trait.name));
                    player.addTrait(elem.name);
                    console.log(`${chalk.yellow('You are now:' + elem.name)}`);
                }
                break;
            }
        }
        if(this.resource > this.hurtLevel){
            player.attributes.currentHP -= 2;
        }
    }

}

export default SurvivalResource