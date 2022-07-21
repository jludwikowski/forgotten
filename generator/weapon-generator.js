import roller from "./roller.js";
import Generator from "./generator.js";
import Adjectives from "../models/adjectives.js";
import WeaponStats from "../stats/weapon-stats.js";

let types = ['sword','axe','spear','bow','dagger','mace','staff'];
let adjectives = ['old','weathered','new','strange','dangerous','exceptional','elf-crafted'];
let advancedAdjectives = ['master-crafted'];
let magicAdjectives = ['fire','ice','electric','holy','demonic'];

let ordinaryMetalMaterials = ['iron','steel','bronze'];
let advancedMetalMaterials = ['blue steel','dwarf steel','thorite'];
let epicMetalMaterials = ['meteorite','adamandite'];

let ordinaryWoodMaterials = ['oak','yew','beech','ash'];
let advancedWoodMaterials = ['black oak','plague ash','millander'];
let epicWoodMaterials = ['dragon bone'];

let adjectivesTable = [new Adjectives(10,magicAdjectives),new Adjectives(10,advancedAdjectives),new Adjectives(75,adjectives)]

let WeaponGenerator = new Generator(10, types, adjectivesTable, WeaponStats);

WeaponGenerator.pickMaterial = function(ordinary,advanced,epic){
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
};

WeaponGenerator.moreAdjectives = function(type, givenAdjectivesTable) {
    let material;
    if(type=='staff' || type=='bow') {
        material = this.pickMaterial(ordinaryWoodMaterials, advancedWoodMaterials, epicWoodMaterials);
    } else {
        material = this.pickMaterial(ordinaryMetalMaterials, advancedMetalMaterials, epicMetalMaterials);
    }
    givenAdjectivesTable.push(material);
    return givenAdjectivesTable;
}

export default WeaponGenerator;