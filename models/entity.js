import crypto from 'crypto';

class Entity {
    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.id = crypto.randomUUID();
        this.items = null;
    }

    append(adjective) {
        this.name = adjective + ' ' + this.name;
        this.description = adjective + ' ' + this.description;
    }

    findItem(name, table) {
        if(!table) { table = this.items }
        if(table!=null) {
            const index = table.findIndex(item => {
                return item.name === name;
            });
            return index;
        }
        return -1;
    }
}
export default Entity