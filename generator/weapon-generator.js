import Adjectives from "../models/adjectives.js";
import WeaponStats from "../stats/weapon-stats.js";
import MaterialItemGenerator from "./material-item-generator.js";

let types = ['sword','axe','spear','bow','dagger','mace','staff','two heanded sword','two heanded axe'];
let adjectives = ['old','weathered','new','strange','dangerous','exceptional','elf-crafted','crude'];
let advancedAdjectives = ['master-crafted','runic'];
let magicAdjectives = ['fire','ice','electric','holy','demonic'];

let ordinaryMetalMaterials = ['iron','steel','bronze'];
let advancedMetalMaterials = ['blue steel','dwarf steel','thorite'];
let epicMetalMaterials = ['meteorite','adamandite'];

let ordinaryWoodMaterials = ['oak','yew','beech','ash'];
let advancedWoodMaterials = ['black oak','plague ash','millander'];
let epicWoodMaterials = ['dragon bone'];

let adjectivesTable = [new Adjectives(10,magicAdjectives),new Adjectives(10,advancedAdjectives),new Adjectives(75,adjectives)];
let woodMaterialsTable = [new Adjectives(1,epicWoodMaterials), new Adjectives(5,advancedWoodMaterials), new Adjectives(100,ordinaryWoodMaterials)];
let metalMaterialsTable = [new Adjectives(1,epicMetalMaterials), new Adjectives(5,advancedMetalMaterials), new Adjectives(100,ordinaryMetalMaterials)];

let WeaponGenerator = new MaterialItemGenerator(85, types, adjectivesTable, [woodMaterialsTable,metalMaterialsTable], ['staff','bow'], WeaponStats);

export default WeaponGenerator;