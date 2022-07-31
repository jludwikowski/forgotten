import Feature from "../models/feature.js";
import Shop from "../models/shop.js";

let FeatureStats = {
    shop() { return new Shop() },
    rock() { return new Feature('rock','single rock') },
    tree() { return new Feature('tree','tree') },
    hut() { return new Feature('hut','lonely hut') },
    ruin() { return new Feature('ruin','ruin') },
    pond() { return new Feature('pond','pond') },
    cave() { return new Feature('cave','cave') },
    village() { return new Feature('village','village') },
}

export default FeatureStats