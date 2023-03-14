import roller from "../engine/roller.js";
import SpellGenerator from "./spell-generator.js";
import Spellbook from "../models/spellbook.js";

let SpellbookGenerator = {

    entityProbability:60,

    generateSpellbooks() {
        let books=[];
        while(roller.roll()<this.entityProbability){
            books.push(this.generateSpellbook());
        }
        return books;
    },

    generateSpellbook(){
        let spell = SpellGenerator.generateEntity();
        return new Spellbook("spellbook of " + spell.name,"spellbook of " + spell.name,2,200,true,true,spell);
    }
}

export default SpellbookGenerator;