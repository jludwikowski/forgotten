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

    resolvePlayerAttack(player, monsters) {
        let lastMonster = monsters[monsters.length-1];
        this.attack(player,lastMonster);
        if(roller.roll()<this.skillUpProbability) { player.attributes.melee+=1 }
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
        let lastMonster = monsters[monsters.length-1];
        if(lastMonster.attributes.currentHP < 0) {
            this.monsterDrop(lastMonster,place);
            player.exp += lastMonster.exp;
            monsters.pop();
        }
        for (const monster of monsters) {
            this.attack(monster, player);
        }
    }
}

export default Judge