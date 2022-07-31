import Adjectives from "../models/adjectives.js";
import MaterialItemGenerator from "./material-item-generator.js";
import ArmorStats from "../stats/armor-stats.js";

let types = ['leather','chain','segment','plate','scale'];
let adjectives = ['old','weathered','new','strange','exceptional','elf-crafted'];
let advancedAdjectives = ['master-crafted'];
let magicAdjectives = ['holy','demonic'];

let ordinaryMetalMaterials = ['iron','steel','bronze'];
let advancedMetalMaterials = ['blue steel','dwarf steel','thorite'];
let epicMetalMaterials = ['meteorite','adamandite'];

let ordinaryLeatherMaterials = ['wolf','bear','lizard','studed'];
let advancedLeatherMaterials = ['infused','great lizard','demon hide'];
let epicLeatherMaterials = ['dragon hide'];

let adjectivesTable = [new Adjectives(10,magicAdjectives),new Adjectives(10,advancedAdjectives),new Adjectives(75,adjectives)];
let leatherMaterialsTable = [new Adjectives(1,epicLeatherMaterials), new Adjectives(5,advancedLeatherMaterials), new Adjectives(100,ordinaryLeatherMaterials)];
let metalMaterialsTable = [new Adjectives(1,epicMetalMaterials), new Adjectives(5,advancedMetalMaterials), new Adjectives(100,ordinaryMetalMaterials)];

let ArmorGenerator = new MaterialItemGenerator(85, types, adjectivesTable, [leatherMaterialsTable,metalMaterialsTable], ['leather'], ArmorStats);

export default ArmorGenerator;