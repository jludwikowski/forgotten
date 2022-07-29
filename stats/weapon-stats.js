import Weapon from "../models/weapon.js";

let WeaponStats = {
    sword() { return new Weapon('sword','sword',1.4,10,3,12)},
    axe() { return new Weapon('axe','axe',2.5,2,5,6)},
    spear() { return new Weapon('spear','spear',1,15,1,4)},
    bow() { return new Weapon('bow','bow',1.5,10,2,7)},
    dagger() { return new Weapon('dagger','dagger',0.8,8,1,5)},
    mace() { return new Weapon('mace','mace',2.1,2,4,4)},
    staff() { return new Weapon('staff','staff',1.6,8,0,2)},
    
    old() { return  new Weapon('old','old',1,-2,-1,0.5)},
    weathered() { return  new Weapon('weathered','weathered',1,-1,0,0.6)},
    new() { return  new Weapon('new','new',1,0,+1,1.3)},
    strange() { return  new Weapon('strange','strange',1,-1,+1,2)},
    dangerous() { return  new Weapon('dangerous','dangerous',1,+2,0,2)},
    exceptional() { return  new Weapon('exceptional','exceptional',1,+5,+1,3)},
    'elf-crafted'() { return  new Weapon('elf-crafted','elf-crafted',0.8,+3,0,5)},
    'master-crafted'() { return  new Weapon('master-crafted','master-crafted',1,+10,+1,10)},
    fire() { return  new Weapon('fire','fire',1,0,+2,10)},
    ice() { return  new Weapon('ice','ice',1,+5,+1,8)},
    electric() { return  new Weapon('electric','electric',1,+5,+1,8)},
    holy() { return  new Weapon('holy','holy',1,+10,0,5)},
    demonic() { return  new Weapon('demonic','demonic',1,+5,+2,20)},
    iron() { return  new Weapon('iron','iron',1.1,-2,0,0.8)},
    bronze() { return  new Weapon('bronze','bronze',1,0,-1,0.5)},
    'blue steel'() { return  new Weapon('blue steel','blue steel',0.8,+3,0,2)},
    'dwarf steel'() { return  new Weapon('dwarf steel','dwarf steel',1.1,+1,+1,3)},
    thorite() { return  new Weapon('thorite','thorite',1.2,+2,+1,5)},
    meteorite() { return  new Weapon('meteorite','meteorite',1.2,+5,+2,20)},
    adamandite() { return  new Weapon('adamandite','adamandite',0.8,+10,+1,100)},
    'black oak'() { return  new Weapon('black oak','black oak',1.2,0,+1,3)},
    'plague ash'() { return  new Weapon('plague ash','plague ash',1,+5,0,5)},
    millander() { return  new Weapon('millander','millander',1,+2,+1,10)},
    'dragon bone'() { return  new Weapon('dragon bone','dragon bone',0.8,+10,+1,100)},

}

export default WeaponStats