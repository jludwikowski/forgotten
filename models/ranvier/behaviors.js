import Npc from "../npc.js";
class Behaviors {
	constructor(monster){

		this.combat = !(monster instanceof Npc);
		this.lootable = {
							pools: 'tw:' + monster.type
						}
		if(monster.money){
			this.lootable.currencies = {
				obols: { 
					min:monster.money,
					max:monster.money
				}
			}
		}
	}
}

export default Behaviors