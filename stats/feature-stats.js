import Feature from "../models/feature.js";
import Shop from "../models/shop.js";
import PlaceGenerator from "../generator/place-generator.js";

let FeatureStats = {
    shop() { return new Shop() },
    rock() { return new Feature('rock','single rock') },
    tree() { return new Feature('tree','tree') },
    hut() { return new Feature('hut','lonely hut', PlaceGenerator.generatePlaceByBiome('hut','green',[1,0,0])) },
    ruin() { return new Feature('ruin','ruin', PlaceGenerator.generatePlaceByBiome('ruin','green',[1,0,0])) },
    pond() { return new Feature('pond','pond') },
    tower() { return new Feature('tower','single tower') },
    stream() { return new Feature('stream','gurling crystal clear stream') },
    cave() { return new Feature('cave','cave', PlaceGenerator.generatePlaceByBiome('cave','white',[1,0,0])) },
    village() { return new Feature('village','village') },
}

export default FeatureStats