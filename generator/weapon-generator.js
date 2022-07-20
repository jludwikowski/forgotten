import roller from "./roller.js";
import Weapon from "../models/weapon.js";

let WeaponGenerator = {
    types: ['sword','axe','spear','bow','dagger','mace','staff'],
    adjectives: ['old','weathered','new','strange','dangerous','exceptional','elf-crafted'],
    advancedAdjectives: ['master-crafted'],
    magicAdjectives: ['fire','ice','electric','holy','demonic'],

    ordinaryMetalMaterials: ['iron','steel','bronze'],
    advancedMetalMaterials: ['blue steel','dwarf steel','thorite'],
    epicMetalMaterials: ['meteorite','adamandite'],

    ordinaryWoodMaterials: ['oak','yew','beech','ash'],
    advancedWoodMaterials: ['black oak','plague ash','millander'],
    epicWoodMaterials: ['dragon bone'],

    generateWeapon(){
        let type = roller.pickAtRandom(this.types);
        let adjective = (roller.roll()<70)? roller.pickAtRandom(this.adjectives) : '';
        let advAdjective = (roller.roll()<5)? roller.pickAtRandom(this.advancedAdjectives) : '';
        let magicAdjective = (roller.roll()<10)? roller.pickAtRandom(this.magicAdjectives) : '';
        let material;
        if(type=='staff' || type=='bow') {
            material = this.pickMaterial(this.ordinaryWoodMaterials, this.advancedWoodMaterials, this.epicWoodMaterials);
        } else {
            material = this.pickMaterial(this.ordinaryMetalMaterials, this.advancedMetalMaterials, this.epicMetalMaterials);
        }

        let weapon = this.getStat(type);
        weapon = this.getAdjust(weapon, magicAdjective);
        weapon = this.getAdjust(weapon, material);
        weapon = this.getAdjust(weapon, advAdjective);
        weapon = this.getAdjust(weapon, adjective);

        console.log(weapon);
        return weapon;
    },

    pickMaterial(ordinary,advanced,epic) {
        let material;
            if(roller.roll()<1){
                material = roller.pickAtRandom(epic);
            } else {
                if(roller.roll()<5) {
                    material = roller.pickAtRandom(advanced);
                } else {
                    material = roller.pickAtRandom(ordinary);
                }
            }
        return material;
    },

    getStat(type){
        switch(type) {
            case 'sword':
                return new Weapon(type,type,1.4,10,3,12);
            case 'axe':
                return new Weapon(type,type,2.5,2,5,6);
            case 'spear':
                return new Weapon(type,type,1,15,1,4);
            case 'bow':
                return new Weapon(type,type,1.5,10,2,7);
            case 'dagger':
                return new Weapon(type,type,0.8,8,1,5);
            case 'mace':
                return new Weapon(type,type,2.1,2,4,4);
            case 'staff':
                return new Weapon(type,type,1.6,8,0,2);
            default:
                return new Weapon(type,type,1.4,10,3,2);
        }
    },

    getAdjust(weapon,adjective){
        let adjust;
        switch(adjective) {
            case 'old':
                adjust = new Weapon(adjective,adjective,0,-2,-1,0.5);
                break;
            case 'weathered':
                adjust = new Weapon(adjective,adjective,0,-1,0,0.6);
                break;
            case 'new':
                adjust = new Weapon(adjective,adjective,0,0,+1,1.3);
                break;
            case 'strange':
                adjust = new Weapon(adjective,adjective,0,-1,+1,2);
                break;
            case 'dangerous':
                adjust = new Weapon(adjective,adjective,0,+2,0,2);
                break;
            case 'exceptional':
                adjust = new Weapon(adjective,adjective,0,+5,+1,3);
                break;
            case 'elf-crafted':
                adjust = new Weapon(adjective,adjective,-0.2,+3,0,5);
                break;
            case 'master-crafted':
                adjust = new Weapon(adjective,adjective,0,+10,+1,10);
                break;
            case 'fire':
                adjust = new Weapon(adjective,adjective,0,0,+2,10);
                break;
            case 'ice':
                adjust = new Weapon(adjective,adjective,0,+5,+1,8);
                break;
            case 'electric':
                adjust = new Weapon(adjective,adjective,0,+5,+1,8);
                break;
            case 'holy':
                adjust = new Weapon(adjective,adjective,0,+10,0,5);
                break;
            case 'demonic':
                adjust = new Weapon(adjective,adjective,0,+5,+2,20);
                break;
            case 'iron':
                adjust = new Weapon(adjective,adjective,+0.1,-2,0,0.8);
                break;
            case 'bronze':
                adjust = new Weapon(adjective,adjective,0,0,-1,0.5);
                break;
            case 'blue steel':
                adjust = new Weapon(adjective,adjective,-0.2,+3,0,2);
                break;
            case 'dwarf steel':
                adjust = new Weapon(adjective,adjective,0,+1,+1,3);
                break;
            case 'thorite':
                adjust = new Weapon(adjective,adjective,+0.2,+2,+1,5);
                break;
            case 'meteorite':
                adjust = new Weapon(adjective,adjective,0,+5,+2,20);
                break;
            case 'adamandite':
                adjust = new Weapon(adjective,adjective,-0.2,+10,+1,100);
                break;
            case 'black oak':
                adjust = new Weapon(adjective,adjective,+0.2,0,+1,3);
                break;
            case 'plague ash':
                adjust = new Weapon(adjective,adjective,0,+5,0,5);
                break;
            case 'millander':
                adjust = new Weapon(adjective,adjective,0,+2,+1,10);
                break;
            case 'dragon bone':
                adjust = new Weapon(adjective,adjective,-0.2,+10,+1,100);
                break;
             default:
                adjust = new Weapon(adjective,adjective,0,0,0,1);
        }
        weapon.adjust(adjust);
        return weapon;
    }

}

export default WeaponGenerator;