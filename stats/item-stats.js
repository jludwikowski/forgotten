import Item from "../models/item.js";

let ItemStats = {
    coin() { return new Item('coin','coin',0.01,5)},
    pot() { return new Item('pot','pot',2,5)},
    bottle() { return new Item('bottle','bottle',1,15)},
    book() { return new Item('book','book',1.5,50)},
    spellbook() { return new Item('book of','book of',1.5,200)},
    boots() { return new Item('boots','boots',1.7,18)},
    tunic() { return new Item('tunic','tunic',1.2,26)},
    pan() { return new Item('pan','pan',2.2,4)},
    coat() { return new Item('coat','coat',1.6,20)},
    elixir() { return new Item('elixir','elixir',0.3,40,true) },
    berries() { return new Item('berries','berries',0.5,5,true,true) },
    'raw meat'() { return new Item('raw meat','raw meat',1,3,true,true) },
    'good meat'() { return new Item('roasted good meat','roasted good meat',0.7,20,true,true) },
    'sucullent meat'() { return new Item('roasted sucullent meat','roasted sucullent meat',0.7,30,true,true) },
    'bug meat'() { return new Item('bug meat','bug meat',1,1,true,true) },
    'roasted bug'() { return new Item('roasted bug','roasted bug',1,1,true,true) },
    'roasted meat'() { return new Item('roasted meat','roasted meat',0.7,10,true,true) },
    'roasted good meat'() { return new Item('roasted good meat','roasted good meat',0.7,30,true,true) },
    'roasted sucullent meat'() { return new Item('roasted sucullent meat','roasted sucullent meat',0.7,50,true,true) },
    'edible mushrooms'() { return new Item('edible mushrooms','edible mushrooms',1,1,true,true) },
    'roasted mushrooms'() { return new Item('roasted mushrooms','roasted mushrooms',1,5,true,true) },
    pelt() { return new Item('pelt','pelt',2,12) },
    'healing herb'() { return new Item('healing herb','healing herb',1,30,true,true) },

    old() { return new Item('old','old',0.8,0.5)},
    weathered() { return new Item('weathered','weathered',0.9,0.6)},
    new() { return new Item('new','new',1,1.5)},
    strange() { return new Item('strange','strange',1,2)},
    ancient() { return new Item('ancient','ancient',1,8)},
    intricate() { return new Item('intricate','intricate',1.1,2)},
    exceptional() { return new Item('exceptional','exceptional',1,3)},
    'elf-crafted'() { return new Item('elf-crafted','elf-crafted',0.8,5)},
    ornate() { return new Item('ornate','ornate',1.3,10)},
    sturdy() { return new Item('sturdy','sturdy',1.2,1.5)}

}

export default ItemStats;