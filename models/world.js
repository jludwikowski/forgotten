import PlaceGenerator from '../generator/place-generator.js'
import chalk from 'chalk';

let World = {

    locations: [],

    genereateWorld(dimentionZ, dimentionX, dimentionY){
        for (let z = 0; z < dimentionZ; z++) {
            this.locations.push([]);
            this.generateEmptyDungeonDimention(dimentionX);
            this.generateDimention(z, dimentionX, dimentionY);
        }
    },

    generateEmptyDungeonDimention(dimentionX){
        this.locations.push([]);
        for(let i=0;i<dimentionX;i++){
            this.locations[1].push([]);
        }
    },

    getPlace(location){
        if(this.locations[location[0]] && this.locations[location[0]][location[1]]) {
            return this.locations[location[0]][location[1]][location[2]];
        }
        return null;
    },

    getLocation(location,direction) {
        let z = location[0];
        let x = location[1];
        let y = location[2];
        switch(direction) {
            case 'n':
                return [z, x + 1, y]
                break;
            case 's':
                return [z, x - 1, y]
                break;
            case 'w':
                return [z, x, y - 1];
                break;
            case 'e':
                return [z, x, y + 1]
                break;
        }
        return null;
    },

    canTravel(location1,location2){
        if(this.getPlace(location2)==null) {
            return false;
        }
        let z = location2[0];
        let x = location2[1];
        let y = location2[2];
        if( x >= 0 && x < this.locations[0].length &&
            y >= 0 && y < this.locations[0][0].length &&
            z >=0 && z < this.locations.length &&
            !this.getPlace(location2).impassable) {
            return true;
        }
        return false;
    },

    describeExits(location){
        let z = location[0];
        let x = location[1];
        let y = location[2];
        if(this.canTravel(location,this.getLocation(location,'s'))){
            console.log('You can go south to: ' +  this.getPlace(this.getLocation(location,'s')).name);
        }
        if(this.canTravel(location,this.getLocation(location,'n'))) {
            console.log('You can go north to: ' + this.getPlace(this.getLocation(location,'n')).name);
        }
        if(this.canTravel(location,this.getLocation(location,'w'))){
            console.log('You can go west to: ' + this.getPlace(this.getLocation(location,'w')).name);
        }
        if(this.canTravel(location,this.getLocation(location,'e'))) {
            console.log('You can go east to: ' + this.getPlace(this.getLocation(location,'e')).name);
        }
    },

    generateDimention(coordZ, dimentionX, dimentionY) {
        let currentLevel = this.locations[coordZ];
        for (let i = 0; i < dimentionX; i++) {
            currentLevel.push([]);
            for (let j = 0; j < dimentionY; j++) {
                let borderPlace1 = i>0 ? currentLevel[i-1][j]: null;
                let borderPlace2 = j>0 ? currentLevel[i][j-1]: null;
                currentLevel[i][j] = PlaceGenerator.generatePlace(borderPlace1,borderPlace2,[coordZ,i,j])
            }
        }

    },

    drawMap(currentLevel){
        if(currentLevel==null) {
            currentLevel = 0;
        }
        for (let i = this.locations[currentLevel].length-1; i >= 0 ; i--) {
            let row ='';
            for (let j = 0; j < this.locations[currentLevel][0].length; j++) {
                if(this.locations[currentLevel][i][j]) {
                    switch (this.locations[currentLevel][i][j].biome) {
                        case 'desert':
                            row += `${(chalk.bgYellow('dd'))}`;
                            break;
                        case 'mountain':
                            row += `${(chalk.bgWhite('MM'))}`;
                            break;
                        case 'hill':
                            row += `${(chalk.bgGray('hh'))}`;
                            break;
                        case 'meadow':
                            row += `${(chalk.bgGreenBright('~~'))}`;
                            break;
                        case 'forest':
                            row += `${(chalk.bgGreen('ff'))}`;
                            break;
                        case 'swamp':
                            row += `${(chalk.bgBlue('ss'))}`;
                            break;
                        default:
                            row += `${(chalk.bgMagenta('DD'))}`;
                    }
                } else {
                    row += `${(chalk.bgBlack('  '))}`;
                }
            }
            console.log(row);
        }
    }

}

export default World;