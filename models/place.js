import chalk from "chalk";
import crypto from 'crypto';
import world from "./world.js";
import Entity from './entity.js';
import Exit from './exit.js';

class Place extends Entity {

    constructor(name, biome, plantColor, description, location, items, monsters, feature, enclosed, exits) {
        super(name, description)
        this.identity = 'place',
        this.biome = biome,
        this.plantColor = plantColor,
        this.location = location,
        this.impassable = false;
        this.items = items,
        this.monsters = monsters,
        this.money = 0,
        this.feature = feature,
        this.id = this.name.replace(' ','-') + '-' + this.location[0] + '-' + this.location[1] + '-' + this.location[2],
        this.enclosed = enclosed,
        this.exits = exits ? exits : []
    }

    describeThySelf() {
        console.log(this.description);
        if(this.feature) {
            console.log('There is a ' + this.feature.description + ' here.');
        }
        if(this.monsters) {
            for (const monster of this.monsters) { console.log(`You see a ${chalk.redBright(monster.description)}`) }
        }
        if(this.items) {
            for (const item of this.items) { console.log(`You also see a ${chalk.blue(item.description)}`) }
        }
        if(this.money>0) {
            console.log(`You also see ${chalk.yellow(this.money)} imperial coins`)
        }
        if(!this.enclosed){
            world.describeExits(this.location);
        }
        for(let exit of this.exits){
            exit.describeThySelf();
        }
        
    }

    addExit(location,direction,area) {
        this.exits.push(new Exit(location,direction,area));
    }
}

export default Place;