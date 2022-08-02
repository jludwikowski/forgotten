import MonsterStats from '../stats/monster-stats.js'
import Adjectives from "../models/adjectives.js";
import Generator from "./generator.js";

let monsterTypes = ['goblin','orc','slime','wolf','spider','lizard','human','boar','rat','ogre','dwarf','draconid','moose','cat-folk','wasp','bat'];
let sizeAdjectives = ['small','large','huge'];
let traitAdjectives = ['strange','dark','ugly','terrifying','pale'];
let magicAdjectives = ['zombie','fire','water','earth','air','demonic','spirit','skeletal'];

let adjectivesTable = [new Adjectives(10,magicAdjectives),new Adjectives(75,traitAdjectives),new Adjectives(50,sizeAdjectives)]

let MonsterGenerator = new Generator(50, monsterTypes, adjectivesTable, MonsterStats);

export default MonsterGenerator