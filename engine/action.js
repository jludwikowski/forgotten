import Judge from "./Judge.js";
import World from "../models/world.js";
import Shop from "../models/shop.js";
import chalk from "chalk";
import Item from "../models/item.js";
import fs from "fs"

let Action = {

    lastLocation: null,

    parseCommand(command){
        return command.split(/(\s+)/).filter( e => e.trim().length > 0);
    },

    timePassed(player, place) {
        this.monstersActions(player, place);
        /* For time based resources  and not environment based */
        player.survivalResources.hunger.change(1, player);
        player.survivalResources.thirst.change(place.biome == 'desert'?2:1, player);
        player.heal(1);
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
    },

    directionCommand(player, place, direction, action) {
        let newLocation =  World.getLocation(player.location,direction);
        if (World.canTravel(player.location, newLocation)) {
            this.timePassed(player, place);
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
            this.timePassed(player, place);
        }
    },

    a(args, player, place) { this.attack(args, player, place); },

    l(args, player, place) {
        console.log('You are in :');
        place.describeThySelf();
    },

    i(args, player, place) { console.log(player.items); console.log(`${chalk.yellow(player.money)} imperial coins`) },

    stats(args, player, place) {
        switch(args.join(' ')) {
            case 'weapon': console.log(player.mainWeapon); break;
            default: player.showStats();
        }
    },

    wait(args, player, place) { this.timePassed(player, place) },

    p(args, player, place) {
        if(place.items!=null) {
            while(place.items.length > 0){
                player.items.push(place.items.pop());
            }
        }
        this.pm(args, player, place)
        this.timePassed(player, place);
    },

    pm(args, player, place) {
        player.money += place.money;
        place.money = 0;
    },

    equip(args, player, place) { player.equip(args.join(' ')); this.timePassed(player, place); },

    drop(args, player, place) { player.drop(args.join(' ')); },

    go(args, player, place) {
        if(place.feature.place) {
            this.lastLocation = player.location;
            player.location = place.feature.place.location;
            place.feature.place.describeThySelf();
        }
    },

    exit(args, player, place) { if(this.lastLocation) {player.location = this.lastLocation; World.getPlace(player.location).describeThySelf()} },

    async buy(args, player, place) { if(place.feature instanceof Shop) { await place.feature.shopkeeper.initiateTrade(player); this.timePassed(player, place)} },

    async sell(args, player, place) { if(place.feature instanceof Shop) { await player.initiateTrade(place.feature.shopkeeper); this.timePassed(player, place)} },

    async levelup(args, player, place) { await player.levelUp() },

    fire(args, player, place) { if(player.findItem('flint')!=-1) { place.items.push(new Item('fire','campfire','10',0)) } },

    roast(args, player, place) { if(place.findItem('fire')!=-1) { player.roast() } else { console.log(`${chalk.yellow('No fire to roast')}`) } },

    use(args, player, place) { player.use(args.join(' '), place); this.timePassed(player, place) },

    refill(args, player, place) { if(place.feature && place.feature.name.indexOf('pond')!=-1) { player.refill(args.join(' ')) } },

    save(args, player, place) { fs.writeFileSync('./data/player.json', JSON.stringify(player)); },

    load(args, player, place) { let rawdata = fs.readFileSync('./data/player.json'); player.load(JSON.parse(rawdata)); },

    help() {
        console.log('n, e, w, s - travel commands');
        console.log('go strange cave, go small hut - makes you travel into building or cave, exit makes you go out');
        console.log('attack - or just a will attack the closest enemy');
        console.log('l - commands to look around');
        console.log('ln,ls,le,lw - commands to look into nearby area north, south east and west respectively');
        console.log('stats - to show your current attributes. Same goes for "stat weapon"');
        console.log('i - display inventory');
        console.log('p - stands for pick up all, pm - pick up money');
        console.log('equip item name - to equip item from inventory, drop item name - to drop inventory item');
        console.log('buy and sell invoke shop interface');
        console.log('wait - waits in place... for healing mostly');
        console.log('levelup - to buy traits for EXP');
        console.log('fire - to create campfire');
        console.log('roast - to roast all meat over fire');
        console.log('use - to use item or eat food or drink for example: use roasted meat');
        console.log('refill - to refill container for example: refill waterskin');
        console.log('save - to save the game');
        console.log('load - to load the game');
    },
}

export default Action