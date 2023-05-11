import Exit from './exit.js';
import fs from "fs";
import yaml from 'yaml';
import RanvierNpc from './npc.js';

class Room {

	constructor(place) {
		let featureDescription = place.feature ? ' There is a ' + place.feature.description + ' here.' : ''
		this.id = place.id,
		this.title = place.name,
		this.coordinates = place.location.slice().reverse(),
		this.description = place.description + featureDescription;
		if(place.monsters){
			this.npcs = this.convertMonstersToNPCS(place.monsters);
		}
		if(place.items){
			this.items = this.convertItems(place.items);
		}
		if(place.exits && place.exits.length !=0) {
			this.exist = place.exits.map(exit => (
				{roomId: exit.area.locations[exit.location[0]][exit.location[1]][exit.location[2]].id, direction: exit.direction}));
		}
	}

	convertMonstersToNPCS(monsters){
		let npcs = [];

		for(let monster of monsters){
			let npc = new RanvierNpc(monster);
			npcs.push(npc.id);
			fs.appendFileSync('./data/npcs.yml', yaml.stringify(npc), function (err) {
		  		if (err) {console.log('Error saving'); console.log(monster)};
			});
		}
		return npcs;
	}

	convertItems(items){

	}

}

export default Room