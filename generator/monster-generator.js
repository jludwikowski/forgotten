import MonsterStats from '../stats/monster-stats.js'
import Adjectives from "../models/adjectives.js";
import Generator from "./generator.js";

let monsterTypes = ['goblin','orc','slime','wolf','spider','lizard','rat','human','boar','ogre','dwarf','draconid','frog-folk','rat-folk','lizard-folk','huldre-troll','jotun-troll','elf','moose','cat-folk','wasp','bat'];
let sizeAdjectives = ['small','large','huge'];
let traitAdjectives = ['strange','dark','ugly','terrifying','pale','tattoed','aggresive','sikly','albino'];
let magicAdjectives = ['zombie','fire','water','earth','air','demonic','spirit','skeletal','runic'];

let adjectivesTable = [new Adjectives(10,magicAdjectives),new Adjectives(75,traitAdjectives),new Adjectives(50,sizeAdjectives)]

let biomeTypesTables = {
	desert: ['goblin','goblin','orc','jackal','hiena','lion','spider','lizard','spider','lizard','rat','rat','human','ogre','dwarf','draconid','rat-folk','lizard-folk','cat-folk','wasp'],
	mountain: ['goblin','goblin','orc','wolf','bear','wolf','lynx','cougar','lion','warg','spider','lizard','spider','lizard','rat','rat','human','ogre','dwarf','draconid','rat-folk','lizard-folk','huldre-troll','jotun-troll','cat-folk','wasp','bat'],
	hill: ['goblin','goblin','orc','slime','bear','wolf','wolf','lynx','cougar','warg','lion','spider','lizard','spider','lizard','rat','rat','human','boar','ogre','dwarf','draconid','frog-folk','rat-folk','lizard-folk','huldre-troll','jotun-troll','elf','moose','cat-folk','wasp','bat'],
	meadow: ['goblin','goblin','orc','slime','wolf','wolf','lynx','lion','spider','lizard','spider','lizard','rat','rat','human','boar','ogre','dwarf','draconid','frog-folk','rat-folk','lizard-folk','huldre-troll','jotun-troll','elf','moose','cat-folk','wasp','bat'],
	farmland: ['goblin','goblin','orc','slime','wolf','wolf','lynx','spider','lizard','spider','lizard','rat','rat','human','boar','draconid','frog-folk','rat-folk','lizard-folk','huldre-troll','risi-troll','cat-folk','wasp','bat'],
	forest: ['goblin','goblin','orc','slime','bear','wolf','wolf','warg','cougar','lynx','spider','lizard','spider','lizard','rat','rat','human','boar','ogre','dwarf','draconid','frog-folk','rat-folk','lizard-folk','huldre-troll','jotun-troll','elf','moose','cat-folk','wasp','bat'],
	swamp: ['goblin','goblin','slime','spider','slime','spider','lizard','spider','lizard','rat','human','frog-folk','rat-folk','lizard-folk','huldre-troll','jotun-troll','cat-folk','wasp','wasp','wasp','bat'],
	ruin: ['goblin','goblin','orc','slime','lynx','spider','lizard','spider','cougar','lizard','rat','rat','human','ogre','dwarf','draconid','frog-folk','rat-folk','lizard-folk','huldre-troll','jotun-troll','wasp','bat','bat'],
	cave: ['dragon','goblin','goblin','orc','slime','bear','warg','spider','lizard','spider','lizard','rat','rat','human','ogre','dwarf','draconid','frog-folk','rat-folk','lizard-folk','huldre-troll','jotun-troll','wasp','bat','bat'],
	hut: ['goblin','goblin','orc','slime','lynx','spider','lizard','spider','lizard','rat','rat','human','ogre','dwarf','draconid','frog-folk','rat-folk','lizard-folk','huldre-troll','jotun-troll','wasp','bat','bat'],
}

let MonsterGenerator = new Generator(50, monsterTypes, adjectivesTable, MonsterStats, biomeTypesTables);

export default MonsterGenerator