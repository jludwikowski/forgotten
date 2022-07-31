import Entity from "./entity.js";

class Feature extends Entity {
    constructor(name, description, place) {
        super(name, description)
        this.place = place;
    }
}

export default Feature