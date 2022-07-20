import Monster from '../models/monster.js';
import roller from './roller.js';
import MonsterStats from './monster-stats.js'
import WeaponGenerator from './weapon-generator.js';

let MonsterGenerator = {
    monsterTypes: ['goblin','orc','slime','wolf','spider','lizard'],

    /*percentage of chance for each ADJ*/
    sizeAdjectives: ['small','large','very large'],
    traitAdjectives: ['strange','dark-skinned','ugly','terrifying'],
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
        let stats = MonsterStats.getStats(type);
        let sizeAdj = (roller.roll()<50)? roller.pickAtRandom(this.sizeAdjectives) : '';
        let traitAdj = (roller.roll()<75)? roller.pickAtRandom(this.traitAdjectives) : '';
        let magicAdj = (roller.roll()<50)? roller.pickAtRandom(this.magicAdjectives) : '';

        let items = null;
        let mainWeapon = null;
        let money = 0;
        if(['goblin','orc'].includes(type)) {
            mainWeapon = WeaponGenerator.generateWeapon();
            money = roller.rollDice(10)
        }
        let monster = new Monster(type, type, stats, items, mainWeapon, money);
        monster.adjust(this.getAdjust(magicAdj));
        monster.adjust(this.getAdjust(traitAdj));
        monster.adjust(this.getAdjust(sizeAdj));

        console.log(monster.name);
        console.log(monster.attributes);
        return monster;
    },

    getAdjust(adjective){
        return new Monster(adjective,adjective,MonsterStats.getStatsAdjust(adjective),null,null,0);
    }
}

export default MonsterGenerator