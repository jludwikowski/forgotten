import Judge from "./Judge.js";
import World from "../models/world.js";

let Action = {

    parseCommand(command){
        return command.split(/(\s+)/).filter( e => e.trim().length > 0);
    },

    directionActions: {
        travel(newLocation, player) {
            player.location = newLocation;
            console.log('You are in:');
            World.getPlace(player.location).describeThySelf();
        },

        peer(newLocation) {
            console.log('You look further and see:');
            World.getPlace(newLocation).describeThySelf();
        }
    },

    monstersActions(player, place) {
        if(place.monsters && place.monsters.length>0) {
            Judge.resolveMonstersRound(player, place.monsters, place);
        }
        player.heal(1);
    },

    directionCommand(player, place, direction, action) {
        let newLocation =  World.getLocation(player.location,direction);
        if (World.canTravel(player.location, newLocation)) {
            this.monstersActions(player, place);
            this.directionActions[action](newLocation, player)
        }
    },

    n(args, player, place) { this.directionCommand(player, place, 'n','travel'); },

    s(args, player, place) { this.directionCommand(player, place, 's','travel'); },

    w(args, player, place) { this.directionCommand(player, place, 'w','travel'); },

    e(args, player, place) { this.directionCommand(player, place, 'e','travel'); },

    ln(args, player, place) { this.directionCommand(player, place, 'n','peer'); },

    ls(args, player, place) { this.directionCommand(player, place, 's','peer'); },

    lw(args, player, place) { this.directionCommand(player, place, 'w','peer'); },

    le(args, player, place) { this.directionCommand(player, place, 'e','peer'); },

    attack(args, player, place) {
        if(place.monsters && place.monsters.length>0) {
            Judge.resolvePlayerAttack(player, place.monsters, place);
            this.monstersActions(player, place);
        }
    },

    a(args, player, place) { this.attack(args, player, place); },

    l(args, player, place) {
        console.log('You are in :');
        place.describeThySelf();
    },

    i(args, player, place) { console.log(player.items); },

    stats(args, player, place) {
        switch(args.join(' ')) {
            case 'weapon': console.log(player.mainWeapon); break;
            default: player.showStats();
        }
    },

    wait(args, player, place) {
        this.monstersActions(player, place);
    },

    p(args, player, place) {
        if(place.items!=null) {
            while(place.items.length > 0){
                player.items.push(place.items.pop());
            }
        }
        this.pm(args, player, place)
        this.monstersActions(player, place);
    },

    pm(args, player, place) {
        player.money += place.money;
        place.money = 0;
    },

    equip(args, player, place) { player.equip(args.join(' ')); this.monstersActions(player, place); },

    drop(args, player, place) { player.drop(args.join(' ')); },

    help() {
        console.log('n, e, w, s - travel commands');
        console.log('attack - or just a will attack the closest enemy');
        console.log('l - commands to look around');
        console.log('ln,ls,le,lw - commands to look into nearby area north, south east and west respectively');
        console.log('stats - to show your current attributes. Same goes for "stat weapon"');
        console.log('i - display inventory');
        console.log('p - stands for pick up all, pm - pick up money');
        console.log('equip item name - to equip item from inventory, drop item name - to drop inventory item');
        console.log('wait - waits in place... for healing mostly')
    },
}

export default Action