#!/usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
import World from './models/world.js'
import Player from "./models/player.js";
import Weapon from "./models/weapon.js";
import CharacterCreator from "./engine/character-creator.js";
import Action from "./engine/action.js";
import Shop from "./models/shop.js";
import Item from "./models/item.js";

let player;

async function mainAction(player) {

    const answer = await inquirer.prompt({
        name: 'main_action',
        type: 'input',
        message: 'What do you do?',
        default() {
            return '';
        },
    });

    const command = Action.parseCommand(answer.main_action);
    if(command) {
        const mainCommand = command.shift()
        if (mainCommand in Action) {
            await Action[mainCommand](command, player, World.getPlace(player.location));
        }
    }
}

async function customizeMap(player){
    let rustySword = new Weapon('old sword','old sword',1.5,10,2,3);
    player.items.push(new Item('flint','flint',0.4,10));
    World.getPlace(player.location).items.push(rustySword);
    World.getPlace(player.location).monsters = [];
    World.getPlace(player.location).feature = new Shop();
    World.getPlace(player.location).describeThySelf();
}

async function mainGameLoop() {
    await World.genereateWorld(1,20,30);
    World.drawMap();
    World.drawMap(1);
    player = await CharacterCreator.createPlayer();

    console.log(`
    ${chalk.magentaBright('Welcome to Forgotten')}
    Your vision start to focus`);

    await customizeMap(player);

    while(player.attributes.currentHP > 0) {
        await mainAction(player);
    }
    console.log(chalk.red('YOU DIED'));
}

await mainGameLoop();