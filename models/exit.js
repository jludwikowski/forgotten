class Exit {

	constructor(location, direction, area){
		this.location = location,
		this.direction = direction,
		this.area = area
	}

	describeThySelf() {
		console.log('You can go ' + this.direction + ' to: ' +  this.area.locations[this.location[0]][this.location[1]][this.location[2]].name);
	}
	

}


export default Exit;