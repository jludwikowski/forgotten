import Attributes from "../models/attributes.js";

let MonsterStats = {

    monsterTypes: ['goblin','orc','slime','wolf','spider','lizard'],
    sizeAdjectives: ['small','large','very large'],
    traitAdjectives: ['strange','dark-skinned','ugly','terrifying'],
    magicAdjectives: ['zombie','fire','water','earth','air','demonic','spirit','skeletal'],

    getStats(monsterType) {
        switch(monsterType) {
            case 'goblin':
                return new Attributes(10,10,1,20);
            case 'orc':
                return new Attributes(30,30,3,20);
            case 'slime':
                return new Attributes(40,40,1,10);
            case 'wolf':
                return new Attributes(20,20,2,30);
            case 'spider':
                return new Attributes(30,30,1,30);
            case 'lizard':
                return new Attributes(15,15,2,10);
            case 'human':
                return new Attributes(30,30,1,20);
            default:
                return new Attributes(10,10,1,10);
        }
    },

    getStatsAdjust(adjective){
        switch(adjective) {
            case 'small':
                return new Attributes(-2,-2,-1,0);
            case 'large':
                return new Attributes(5,5,1,0);
            case 'very large':
                return new Attributes(10,10,2,-5);
            case 'terrifying':
                return new Attributes(10,10,0,10);
            case 'strange':
                return new Attributes(5,5,0,5);
            case 'zombie':
                return new Attributes(15,15,2,-10);
            default:
                return new Attributes(0,0,0,0);
        }
    }
}

export default MonsterStats