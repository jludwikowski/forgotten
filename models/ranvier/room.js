import Exit from './exit.js';
import fs from "fs";
import yaml from 'yaml';
import RanvierNpc from './npc.js';

class Room {

	constructor(place) {
		let featureDescription = place.feature ? ' There is a ' + place.feature.description + ' here.' : ''
		this.id = place.id,
		this.title = place.name,
		this.coordinates = place.location.reverse(),
		this.description = place.description + featureDescription;
		if(place.monsters){
			this.npcs = this.convertMonstersToNPCS(place.monsters);
		}
		if(place.items){
			this.items = this.convertItems(place.items);
		}
		if(place.feature){
			this.exits = this.createExits(place);
		}
	}

	convertMonstersToNPCS(monsters){
		let npcs = [];

		for(let monster of monsters){
			let npc = new RanvierNpc(monster);
			npcs.push(npc.id);
			fs.appendFile('./data/npcs.yml', yaml.stringify(npc), function (err) {
		  		if (err) {console.log('Error saving'); console.log(monster)};
			});
		}
		return npcs;
	}

	convertItems(items){

	}

	createExits(place){

	}

}

export default Room