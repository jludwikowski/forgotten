import roller from "./roller.js";

let Judge = {

    skillUpProbability: 3,
    bodyUpProbability: 3,

    attack(monster1, monster2) {
        if(roller.roll() < (monster1.getAttack() - monster2.getDefence())){
            let damageRoll = roller.rollDice(5);
            let damage = monster1.getDamage() + damageRoll;
            console.log(monster1.name + ' hit ' + monster2.name + ' for: ' + damage + 'HP');
            monster2.damage(damage);
            if(roller.roll()<this.bodyUpProbability) { monster2.attributes.body+=1; monster2.attributes.update() };
        } else {
            console.log(monster1.name + ' missed ' + monster2.name);
        }
    },

    magicAttack(spellcaster, monster, spell, roll){
        if(roll < spellcaster.getMagicAttack()) {
            let damage = spell.strenght + roller.rollDice(5);
            console.log(spellcaster.name + ' magically attacked ' + monster.name + ' for: ' + damage + 'HP');
            monster.damage(damage,'magic');
        } else {
            console.log(spellcaster.name + ' spell fizzled.');
        }
    },

    resolvePlayerAttack(player, monsters, skill, spell) {
        let roll = roller.roll();
        if(!skill){
            let skill='melee';
        }
        if(spell && !spell.attackAll){
            let lastMonster = monsters[monsters.length-1];
            this.attackType(player,lastMonster,skill,spell,roll)
        } else {
            for(let monster of monsters) {
                this.attackType(player,monster,skill,spell,roll)
            }
        }
        if(roll<this.skillUpProbability) { player.attributes[skill]+=1 }
    },

    attackType(player,monster,skill,spell, roll) {
            if(skill == 'spellcasting'){
                this.magicAttack(player,monster,spell,roll)
            } else {
                this.attack(player,monster);
            }
    },

    monsterDrop(monster, place){
        if(monster.items) {
            while(monster.items.length>0) {
                place.items.push(monster.items.pop());
            }
        }
        if(monster.mainWeapon) {
            place.items.push(monster.mainWeapon);
        }
        if(monster.armor) {
            place.items.push(monster.armor);
        }
        place.money += monster.money;
    },

    resolveMonstersRound(player, monsters, place) {
        for(let i=0;i<monsters.length;i++){
            if(monsters[i].attributes.currentHP < 0){
                this.monsterDrop(monsters[i],place);
                player.exp += monsters[i].exp;
                monsters.splice(i, 1);
                i--;
            } else {
                this.attack(monsters[i], player);
            }
        }
        place.monsters = monsters;
    }
}

export default Judge