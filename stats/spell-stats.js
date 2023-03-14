import Spell from "../models/spell.js";

let SpellStats = {
    buff() { return new Spell("buff","buff",5, false, 10, 'strength')},
    attack() { return new Spell("missile","missile",5, true, null, null,10)},
    areaAttack() { return new Spell("ball","ball",12, true, null, null,10,true)},

    weak() { return new Spell('weak','weak',0.7,false,0,null,-2)},
    feeble() { return new Spell('feeble','feeble',0.5,false,0,null,-4)},
    extended() { return new Spell('extended','extended',1.3,false,+10,null,0)},
    short() { return new Spell('short','short',0.5,false,-3,null,0)},
    eternal() { return new Spell('eternal','eternal',2,false,+20,null,0)},
    strong() { return new Spell('strong','strong',1.4,false,0,null,+4)},
    powerful() { return new Spell('powerful','powerful',2,false,0,null,+8)},
    mighty() { return new Spell('mighty','mighty',3,false,0,null,+13)},
    engulfing() { return new Spell('engulfing','engulfing',1.1,false,0,null,+1)},
    shattering() { return new Spell('shattering','shattering',1.4,false,0,null,+5)},
    primal() { return new Spell('primal','primal',1.5,false,0,null,+6)},
    holy() { return new Spell('holy','holy',1.4,false,0,null,+5)},
    demonic() { return new Spell('demonic','demonic',1.4,false,0,null,+5)},
    armor() { return new Spell('armor','armor',1,false,0,'armor',0)},
    strength() { return new Spell('strength','strength',1,false,0,'strength',0)},
    toughness() { return new Spell('toughness','toughness',1,false,0,'toughness',0)},
    agility() { return new Spell('agility','agility',1,false,0,'agility',0)},
    accuracy() { return new Spell('accuracy','accuracy',1,false,0,'accuracy',0)},
    intellect() { return new Spell('intellect','intellect',1,false,0,'intellect',0)},

}

export default SpellStats;