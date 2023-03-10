import roller from "../../engine/roller.js";
import RanvierAttributes from "./attributes.js";
import Behaviors from "./behaviors.js";

class RanvierNpc {

	constructor(monster) {
		this.id = monster.name.replaceAll(' ','-') + '-' + roller.rollDice(10000),
		this.keywords = monster.name.split(' '),
		this.name = monster.name,
		this.level = roller.rollDice(3),
		this.description = monster.description,
		this.attributes = new RanvierAttributes(monster.attributes),
		this.behaviors = new Behaviors(monster)
	}

}

export default RanvierNpc