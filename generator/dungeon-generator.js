import Place from '../models/place.js';
import roller from '../engine/roller.js';
import World from '../models/world.js';
import Node from '../models/node.js';
import PlaceGenerator from './place-generator.js';

let DungeonGenerator = {

	motiffTable: ['elven','dwarven','troll','ancient','old empire','sirr','sirr','sirr'],
	biomeTable: ['ruins','cave','mine'],
	types: ['corridor','chamber'],
	maxX: 20,
	maxY: 20,
	maxZ: 20,
	maxNodesPerLevel: 50,
	biomeChangeChance: 5,
	motiffChangeChance:1,
	stairsDownChance:7,

	generateDungeon(biome, motiff, entrance){
		let area = {locations: []};
		this.biome = biome;
		this.motiff = motiff;
		let stairsDown = [];
		motiff = motiff ? motiff : roller.pickAtRandom(this.motiffTable);
		let startNode = new Node(roller.rollDice(this.maxX),roller.rollDice(this.maxY),0,biome,motiff,entrance,'up');
		area.entrance = [startNode.z, startNode.x, startNode.y];
		stairsDown.push(startNode);
		let numberOflevels = roller.rollDice(this.maxZ);
		for(let i=0;i<=numberOflevels;i++){
			stairsDown = this.generateLevel(motiff, stairsDown,area,numberOflevels);
			if(!stairsDown) {
				break;
			}
		}
		return area;
	},

	openExitWays(node, currentLevel,biome,motiff,area) {
		let openlocations = [];
		if( (node.x-1 >=0) && !area.locations[currentLevel][node.x-1][node.y]) {
			openlocations.push(new Node(node.x-1,node.y,currentLevel,biome,motiff,[currentLevel,node.x,node.y],'north'));
		}
		if( (node.x+1 < this.maxX) && !area.locations[currentLevel][node.x+1][node.y]) {
			openlocations.push(new Node(node.x+1,node.y,currentLevel,biome,motiff,[currentLevel,node.x,node.y],'south'));
		}
		if( (node.y-1 >=0) && !area.locations[currentLevel][node.x][node.y-1]) {
			openlocations.push(new Node(node.x,node.y-1,currentLevel,biome,motiff,[currentLevel,node.x,node.y],'east'));
		}
		if( (node.y+1 < this.maxY) && !area.locations[currentLevel][node.x][node.y+1]) {
			openlocations.push(new Node(node.x,node.y+1,currentLevel,biome,motiff,[currentLevel,node.x,node.y],'west'));
		}
		return openlocations;
	},

	generateLevel(motiff, stairsUp, area, numberOflevels) {
		let nodeExits = 0;
		let node;
		let nodesDone = [];
		let currentLevel = area.locations.length;
		let nodesNumber = roller.rollDice(this.maxNodesPerLevel);
		let stairsDown = [];
		let biome;
		let index;
		let place;

		this.generateEmptyLevel(area, currentLevel);

		let waitingNodesTable = stairsUp;
		for(let i=0;i<=nodesNumber;i++) {
			index = roller.rollDice(waitingNodesTable.length)-1;
			node = waitingNodesTable[index];
			biome = this.getAdjective(node.lastBiome,this.biomeTable,this.biomeChangeChance);
			motiff = this.getAdjective(node.lastMotiff,this.motiffTable,this.motiffChangeChance);
			let type = roller.pickAtRandom(this.types);
			let actualBiome = biome;
			if(type == 'corridor') {
				actualBiome = biome + ' ' + type;
			}
			place = PlaceGenerator.generatePlaceByBiome(actualBiome,"green",[currentLevel,node.x,node.y],area);
			place.addExit(node.lastLocation,node.directionBack,area);
			area.locations[currentLevel][node.x][node.y] = place;
			if(node.lastLocation && area.locations[node.lastLocation[0]][node.lastLocation[1]][node.lastLocation[2]]) {
				area.locations[node.lastLocation[0]][node.lastLocation[1]][node.lastLocation[2]]
					.addExit([node.z,node.x,node.y],this.reverseDirection(node.directionBack),area);
			}
			let possibleExitWays = this.openExitWays(node,currentLevel,biome,motiff,area);
			let numberOfExits = roller.rollDice(4);
			while(possibleExitWays.length>0 && numberOfExits>0) {
					numberOfExits--;
					let exitIndex = roller.rollDice(possibleExitWays.length)-1;
					let newExitWay = possibleExitWays[exitIndex];
					waitingNodesTable.push(newExitWay);
					possibleExitWays.splice(exitIndex,1);
			}

			if(roller.roll() < this.stairsDownChance) {
				stairsDown.push(new Node(node.x,node.y,currentLevel+1,biome,motiff,[node.z,node.x,node.y],'up'));
			}
			waitingNodesTable.splice(index,1);
			nodesDone.push(node);
		}
		if(currentLevel < numberOflevels) {
			stairsDown.push(new Node(node.x,node.y,currentLevel+1,biome,motiff,[node.z,node.x,node.y],'up'));
		}
		return stairsDown;
	},

	generateEmptyLevel(area, currentLevel) {
		area.locations.push([]);
		for(let i=0;i<=this.maxX;i++){
			area.locations[currentLevel].push([]);
			for(let j;j<=this.maxY;j++) {
				area.locations[currentLevel][i].push();
			}
		}
	},

	getAdjective(value,table,chance) {
		if(roller.roll() < chance) {
			value = roller.pickAtRandom(table)
		}
		return value;
	},

	reverseDirection(direction){
		switch (direction) {
			case 'north': return 'south';
			case 'south': return 'north';
			case 'west': return 'east';
			case 'east': return 'west';
			case 'down': return 'up';
			case 'up': return 'down';
			default: return null;
		}
	}

}

export default DungeonGenerator;