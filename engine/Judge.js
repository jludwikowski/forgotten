import roller from "./roller.js";

let Judge = {
    attack(monster1, monster2) {
        if(roller.roll()<monster1.getAttack()){
            let damageRoll = roller.rollDice(5);
            let damage = monster1.getDamage() + damageRoll;
            console.log(monster1.name + ' hit ' + monster2.name + ' for: ' + damage + 'HP')
            monster2.damage(damage);
        } else {
            console.log(monster1.name + ' missed ' + monster2.name);
        }
    },

    resolvePlayerAttack(player, monsters) {
        let lastMonster = monsters[monsters.length-1];
        this.attack(player,lastMonster);
    },

    monsterDrop(monster, place){
        if(monster.mainWeapon) {
            place.items.push(monster.mainWeapon);
        }
        if(monster.items) {
            while(monster.items.length>0) {
                place.items.push(monster.items.pop());
            }
        }
        place.money += monster.money;
    },

    resolveMonstersRound(player, monsters, place) {
        let lastMonster = monsters[monsters.length-1];
        if(lastMonster.attributes.currentHP < 0) {
            this.monsterDrop(lastMonster,place);
            monsters.pop();
        }
        for (const monster of monsters) {
            this.attack(monster, player);
        }
    }
}

export default Judge