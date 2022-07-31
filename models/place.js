import chalk from "chalk";
import crypto from 'crypto';
import world from "./world.js";
import Entity from "./entity.js";

class Place extends Entity {

    constructor(name, biome, plantColor, description, location, items, monsters) {
        super(name, description)
        this.identity = 'place',
        this.biome = biome,
        this.plantColor = plantColor,
        this.location = location,
        this.impassable = false;
        this.items = items,
        this.monsters = monsters,
        this.money = 0,
        this.feature = null
    }

    describeThySelf() {
        console.log(this.description);
        if(this.feature) {
            console.log('There is ' + this.feature.description + ' here.');
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
        world.describeExits(this.location);
    }
}

export default Place;