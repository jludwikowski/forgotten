import chalk from 'chalk';
import inquirer from 'inquirer';
import Player from "../models/player.js";

let CharacterCreator = {

    async askName() {
        const answer = await inquirer.prompt({
            name: 'player_name',
            type: 'input',
            message: 'What is your name?',
            default() {
                return 'Forgotten';
            },
        });
        return answer.player_name;
    },

    async askRace() {
        const answer = await inquirer.prompt({
            name: 'race',
            type: 'list',
            message: 'Choose your race:',
            choices: [ 'human', 'elf', 'orc', 'goblin', 'dwarf', 'draconid', 'cat-folk','frog-folk','rat-folk','lizard-folk','huldre-troll','jotun-troll' ],
            default() {
                return 'human';
            },
        });
        return answer.race;
    },

    async askClass() {
        const answer = await inquirer.prompt({
            name: 'class',
            type: 'list',
            message: 'Choose your race:',
            choices: [ 'warrior', 'mage' ],
            default() {
                return 'warrior';
            },
        });
        return answer.class;
    },

    async writeDescription() {
        const answer = await inquirer.prompt({
            name: 'description',
            type: 'input',
            message: 'Write your description',
            default() {
                return 'average looking';
            },
        });
        return answer.description;
    },

    async createPlayer() {
        let name = await this.askName();
        let race = await this.askRace();
        let adventurerClass = await this.askClass();
        let description = await this.writeDescription();
        return new Player(name,description,race,adventurerClass,[0,5,5]);
    }
}

export default CharacterCreator;