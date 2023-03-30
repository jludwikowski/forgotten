#!/usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
import World from './models/world.js'
import Player from './models/player.js';
import Weapon from './models/weapon.js';
import CharacterCreator from './engine/character-creator.js';
import Action from './engine/action.js';
import Shop from './models/shop.js';
import Item from './models/item.js';
import DungeonGenerator from './generator/dungeon-generator.js';

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
            await Action[mainCommand](command, player, player.area.locations[player.location[0]][player.location[1]][player.location[2]]);
        }
    }
}

async function customizeMap(player,dungeon){
    player.area = World;
    let rustySword = new Weapon('old sword','old sword',1.5,10,2,3);
    let dungeonEntrance = dungeon.locations[dungeon.entrance[0]][dungeon.entrance[1]][dungeon.entrance[2]];
    player.items.push(new Item('flint','flint',0.4,10));
    player.items.push(new Item('waterskin','waterskin', 2.1, 10, true));
    World.getPlace(player.location).items.push(rustySword);
    World.getPlace(player.location).monsters = [];
    World.getPlace(player.location).feature = new Shop();
    World.getPlace(player.location).addExit(dungeon.entrance,'down',dungeon);
    dungeonEntrance.exits[0].location = player.location;
    dungeonEntrance.exits[0].area = World;
    World.getPlace(player.location).describeThySelf();
}

async function mainGameLoop() {

    let dungeon = DungeonGenerator.generateDungeon('mine','elven');

    await World.genereateWorld(1,50,50);
    World.writeWorldToYaml();
    //World.drawMap();

    let choice;

    while (choice!='quit'){

        choice = await startOrLoad();
        switch (choice) {
            case 'start': player = await CharacterCreator.createPlayer(); break;
            case 'load':
                player = new Player("name", "description", 'elf', 'warrior', null);
                Action.load(null,player,null);
                player.location = [0,5,5];
                break;
            case 'quit': 
                return;
        }

        World.player = player;

        console.log(`
        ${chalk.magentaBright('Welcome to Forgotten')}
        Your vision start to focus`);

        await customizeMap(player, dungeon);

        while(player.attributes.currentHP > 0) {
            await mainAction(player);
        }

        console.log(chalk.red('YOU DIED'));
    }
}

async function startOrLoad() {
    const answer = await inquirer.prompt({
        name: 'start_or_load',
        type: 'list',
        message: 'Start new game or load save game',
        choices: [ 'start', 'load', 'quit' ],
        default() {
            return 'load';
        },
    });
    return answer.start_or_load;
}

await mainGameLoop();