import MaterialItemGenerator from "./material-item-generator.js";
import Adjectives from "../models/adjectives.js";
import SpellStats from "../stats/spell-stats.js";

let types = ['buff','attack','areaAttack'];
let adjectives = ['weak','feeble','strong','powerful','mighty','extended','short'];

let advancedAdjectives = ['engulfing','shattering'];
let magicAdjectives = ['primal','holy','demonic'];

let ordinaryMetalMaterials = ['fire','ice','electric','arcane'];
let advancedMetalMaterials = ['acid','light','earth'];
let epicMetalMaterials = ['chaos','void'];

let ordinaryWoodMaterials = ['armor','strength','toughness'];
let advancedWoodMaterials = ['agility','accuracy'];
let epicWoodMaterials = ['intellect'];

let adjectivesTable = [new Adjectives(5,magicAdjectives),new Adjectives(10,advancedAdjectives),new Adjectives(75,adjectives)];
let woodMaterialsTable = [new Adjectives(1,epicWoodMaterials), new Adjectives(5,advancedWoodMaterials), new Adjectives(100,ordinaryWoodMaterials)];
let metalMaterialsTable = [new Adjectives(5,epicMetalMaterials), new Adjectives(15,advancedMetalMaterials), new Adjectives(100,ordinaryMetalMaterials)];

let SpellGenerator = new MaterialItemGenerator(85, types, adjectivesTable, [woodMaterialsTable,metalMaterialsTable], ['buff'], SpellStats);

export default SpellGenerator