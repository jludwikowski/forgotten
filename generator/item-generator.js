import Generator from "./generator.js";
import Adjectives from "../models/adjectives.js";
import ItemStats from "../stats/item-stats.js";

let types = ['coin','pot','bottle','book','boots','tunic','pan','coat'];
let adjectives = ['ancient','old','weathered','new','strange','intricate','exceptional','elf-crafted','ornate','sturdy'];
let adjectivesTable = [new Adjectives(75,adjectives)]

let ItemGenerator = new Generator(30, types, adjectivesTable, ItemStats);

export default ItemGenerator