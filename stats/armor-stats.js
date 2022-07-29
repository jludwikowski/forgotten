import Armor from "../models/Armor.js";

let ArmorStats = {
    leather() { return new Armor('leather armor','leather armor',4,20,2) },
    chain()  { return new Armor('chain armor','chain armor',10,80,3) },
    segment() { return new Armor('segment armor','segment armor',13,120,4) },
    plate() { return new Armor('plate armor','plate armor',20,350,5) },
    scale() { return new Armor('scale armor','scale armor',10,150,4) },

    old() { return  new Armor('old','old',1,0.5,-1)},
    weathered() { return  new Armor('weathered','weathered',0.9,0.6,-1)},
    new() { return  new Armor('new','new',1,1.2,0)},
    strange() { return  new Armor('strange','strange',1.2,1.5,+1)},
    exceptional() { return  new Armor('exceptional','exceptional',1,3,+2)},
    'elf-crafted'() { return  new Armor('elf-crafted','elf-crafted',0.8,3,0)},
    'master-crafted'() { return  new Armor('master-crafted','master-crafted',0.9,10,+2)},
    holy() { return  new Armor('holy','holy',1,10,+1)},
    demonic() { return  new Armor('demonic','demonic',1.2,10,+1)},
    iron() { return  new Armor('iron','iron',1,1,0)},
    bronze() { return  new Armor('bronze','bronze',1,0.5,-1)},
    'blue steel'() { return  new Armor('blue steel','blue steel',1.1,3,+1)},
    'dwarf steel'() { return  new Armor('dwarf steel','dwarf steel',1.2,2,+1)},
    thorite() { return  new Armor('thorite','thorite',1.2,5,+2)},
    meteorite() { return  new Armor('meteorite','meteorite',1.2,20,+3)},
    adamandite() { return  new Armor('adamandite','adamandite',0.8,100,+3)},
    infused() { return  new Armor('infused','infused',1.2,3,+1)},
    'great lizard'() { return  new Armor('great lizard','great lizard',1.3,5,+1)},
    'demon hide'() { return  new Armor('demon hide','demon hide',1,20,+2)},
    'dragon hide'() { return  new Armor('dragon hide','dragon hide',1.2,100,+3)},
}

export default ArmorStats