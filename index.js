#!/usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
import World from './models/world.js'
import Player from "./models/player.js";
import Judge from "./engine/Judge.js";
import world from "./models/world.js";
import Weapon from "./models/weapon.js";

var player;

console.log(`
    ${chalk.magentaBright('Welcome to Forgotten')}
    Your vision start to focus`);

async function askName() {
    const answer = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default() {
            return 'Forgotten';
        },
    });
    return answer.player_name;
};

async function createPlayer() {
    let name = await askName();
    let description = 'Human';
    return new Player(name,description,[0,5,5]);
}

async function monstersActions(player, place) {
    if(place.monsters && place.monsters.length>0) {
        Judge.resolveMonstersRound(player, place.monsters, place);
    }
    player.heal(1);
}

async function travel(player, place, direction) {
    let newLocation =  world.getLocation(player.location,direction);
    if (world.canTravel(player.location, newLocation)) {
        monstersActions(player, place);
        player.location = newLocation;
        console.log('You are in:');
        World.getPlace(player.location).describeThySelf();
    }
}

async function mainAction(location) {

    let place = World.locations[location[0]][location[1]][location[2]]

    const answer = await inquirer.prompt({
        name: 'main_action',
        type: 'input',
        message: 'What do you do?',
        default() {
            return '';
        },
    });

    switch (answer.main_action) {
        case 'n':
            travel(player, place, 'n');
            break;
        case 's':
            travel(player, place, 's');
            break;
        case 'w':
            travel(player, place, 'w');
            break;
        case 'e':
            travel(player, place, 'e');
            break;
        case 'attack':
            if(place.monsters && place.monsters.length>0) {
                Judge.resolvePlayerAttack(player, place.monsters, place);
                monstersActions(player, place);
            }
            break;
        case 'a':
            if(place.monsters && place.monsters.length>0) {
                Judge.resolvePlayerAttack(player, place.monsters, place);
                monstersActions(player, place);
            }
            break;
        case 'l':
            console.log('You are in :');
            place.describeThySelf();
            break;
        case 'ln':
            console.log('You peer north and see:');
            world.getPlace(world.getLocation(location,'n')).describeThySelf();
            monstersActions(player, place);
            break;
        case 'ls':
            console.log('You peer south and see:');
            world.getPlace(world.getLocation(location,'s')).describeThySelf();
            monstersActions(player, place);
            break;
        case 'lw':
            console.log('You peer west and see:');
            world.getPlace(world.getLocation(location,'w')).describeThySelf();
            monstersActions(player, place);
            break;
        case 'le':
            console.log('You peer east and see:');
            world.getPlace(world.getLocation(location,'e')).describeThySelf();
            monstersActions(player, place);
            break;
        case 'stats':
            player.showStats();
            break;
        case 'weapon stats':
            console.log(player.mainWeapon);
            break;
        case 'wait':
            monstersActions(player, place);
            break;
        case 'p':
            let item = place.items.pop();
            place.items.push(player.mainWeapon);
            player.mainWeapon = item;
            monstersActions(player, place);
            break;
        case 'help':
            console.log('n, e, w, s - travel commands');
            console.log('attack - or just a will attack the closest enemy');
            console.log('l - commands to look around');
            console.log('ln,ls,le,lw - commands to look into nearby area north, south east and west respectively');
            console.log('stats - to show your current attributes. Same goes for weapon stat');
            console.log('p - stands for pick up item');
            console.log('wait - waits in place... for healing mostly')
            break;
        default:
            break;
    }
}

async function mainGameLoop() {
    await World.genereateWorld(1,20,30);
    World.drawMap();
    player = await createPlayer();

    /* Start game setup */
    let rustySword = new Weapon('old sword','very old sword',1.5,10,2);
    World.getPlace(player.location).items.push(rustySword);
    World.getPlace(player.location).describeThySelf();

    while(player.attributes.currentHP > 0) {
        await mainAction(player.location);
    }
    console.log(chalk.red('YOU DIED'));
}

await mainGameLoop();
