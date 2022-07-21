import roller from './roller.js';
import MonsterStats from '../stats/monster-stats.js'
import Adjectives from "../models/adjectives.js";
import Monster from "../models/monster.js";

let MonsterGenerator = {
    monsterTypes: ['goblin','orc','slime','wolf','spider','lizard','human','boar','rat','ogre'],

    /*percentage of chance for each ADJ*/
    sizeAdjectives: ['small','large','huge'],
    traitAdjectives: ['strange','dark','ugly','terrifying','pale'],
    magicAdjectives: ['zombie','fire','water','earth','air','demonic','spirit','skeletal'],

    generateMonsters() {
        let monsters=[];
        while(roller.roll()<50){
            monsters.push(this.generateMonster())
        }
        return monsters;
    },

    generateMonster() {
        let type = roller.pickAtRandom(this.monsterTypes);
        let monster = MonsterStats[type]();
        let adjectivesTables = [new Adjectives(10,this.magicAdjectives),new Adjectives(75,this.traitAdjectives),new Adjectives(50,this.sizeAdjectives)];
        let adjectives = []
        adjectivesTables.forEach(adjectiveTable => adjectives.push(adjectiveTable.getAdjective()));
        adjectives = adjectives.filter(adj => adj!=null);
        adjectives.forEach(adjective => (adjective in MonsterStats) ? monster.adjust(MonsterStats[adjective]()) : monster.append(adjective));

        console.log(monster.name);
        console.log(monster.attributes);
        return monster;
    },
}

export default MonsterGenerator