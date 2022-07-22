#!/usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
import World from './models/world.js'
import Player from "./models/player.js";
import Judge from "./engine/Judge.js";
import world from "./models/world.js";
import Weapon from "./models/weapon.js";
import CharacterCreator from "./engine/character-creator.js";

let player;

async function monstersActions(player, place) {
    if(place.monsters && place.monsters.length>0) {
        Judge.resolveMonstersRound(player, place.monsters, place);
    }
    player.heal(1);
}

async function directionOrder(player, place, direction, action) {
    let newLocation =  world.getLocation(player.location,direction);
    if (world.canTravel(player.location, newLocation)) {
        await monstersActions(player, place);
        await actions[action](newLocation)
    }
}

async function askForName() {
    const answer = await inquirer.prompt({
        name: 'name',
        type: 'input',
        message: 'What are you looking for?',
        default() {
            return '';
        },
    });
    return answer.name;
}

const actions = {
    travel(newLocation) {
        player.location = newLocation;
        console.log('You are in:');
        World.getPlace(player.location).describeThySelf();
    },

    peer(newLocation) {
        console.log('You look further and see:');
        World.getPlace(newLocation).describeThySelf();
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
            await directionOrder(player, place, 'n','travel');
            break;
        case 's':
            await directionOrder(player, place, 's','travel');
            break;
        case 'w':
            await directionOrder(player, place, 'w','travel');
            break;
        case 'e':
            await directionOrder(player, place, 'e','travel');
            break;
        case 'attack':
            if(place.monsters && place.monsters.length>0) {
                Judge.resolvePlayerAttack(player, place.monsters, place);
                await monstersActions(player, place);
            }
            break;
        case 'a':
            if(place.monsters && place.monsters.length>0) {
                Judge.resolvePlayerAttack(player, place.monsters, place);
                await monstersActions(player, place);
            }
            break;
        case 'l':
            console.log('You are in :');
            place.describeThySelf();
            break;
        case 'ln':
            await directionOrder(player, place, 'n','peer');
            break;
        case 'ls':
            await directionOrder(player, place, 's','peer');
            break;
        case 'lw':
            await directionOrder(player, place, 'w','peer');
            break;
        case 'le':
            await directionOrder(player, place, 'e','peer');
            break;
        case 'i':
            console.log(player.items);
            break;
        case 'stats':
            player.showStats();
            break;
        case 'weapon stats':
            console.log(player.mainWeapon);
            break;
        case 'wait':
            await monstersActions(player, place);
            break;
        case 'pm':
            player.money += place.money;
            place.money = 0;
        case 'p':
            if(place.items!=null) {
                while(place.items.length > 0){
                    player.items.push(place.items.pop());
                }
            }
            await monstersActions(player, place);
            break;
        case 'equip':
            let equipmentName = await askForName();
            player.equip(equipmentName);
            await monstersActions(player, place);
            break;
        case 'drop':
            let itemName = await askForName();
            player.drop(itemName);
            break;
        case 'help':
            console.log('n, e, w, s - travel commands');
            console.log('attack - or just a will attack the closest enemy');
            console.log('l - commands to look around');
            console.log('ln,ls,le,lw - commands to look into nearby area north, south east and west respectively');
            console.log('stats - to show your current attributes. Same goes for weapon stat');
            console.log('i - display inventory');
            console.log('p - stands for pick up all, pm - pick up money');
            console.log('equip - to equip item from inventory, drop - to drop inventory item');
            console.log('wait - waits in place... for healing mostly')
            break;
        default:
            break;
    }
}

async function customizeMap(player){
    let rustySword = new Weapon('old sword','very old sword',1.5,10,2,3);
    World.getPlace(player.location).items.push(rustySword);
    World.getPlace(player.location).monsters = [];
    World.getPlace(player.location).describeThySelf();
}

async function mainGameLoop() {
    await World.genereateWorld(1,20,30);
    World.drawMap();
    player = await CharacterCreator.createPlayer();

    console.log(`
    ${chalk.magentaBright('Welcome to Forgotten')}
    Your vision start to focus`);

    await customizeMap(player);

    while(player.attributes.currentHP > 0) {
        await mainAction(player.location);
    }
    console.log(chalk.red('YOU DIED'));
}

await mainGameLoop();