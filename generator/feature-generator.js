import FeatureStats from "../stats/feature-stats.js";
import Adjectives from "../models/adjectives.js";
import ExoticTypesGenerator from "./exotic-types-generator.js";

let types = ['rock','tree','hut','ruin','pond','cave','stream','tower'];
let exoticTypes = ['shop','village'];
let adjectivesTable = new Adjectives(100,['strange','dark','foreboding','overgrown','luminescent','old','huge','large','small','rune-covered']);

let featureGenerator = new ExoticTypesGenerator(70, types, [adjectivesTable], FeatureStats, exoticTypes);

export default featureGenerator