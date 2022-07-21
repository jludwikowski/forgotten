import crypto from 'crypto';

class Entity {
    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.id = crypto.randomUUID();
    }

    append(adjective) {
        this.name = adjective + ' ' + this.name;
        this.description = adjective + ' ' + this.description;
    }
}
export default Entity