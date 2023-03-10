let roller = {

    roll() {
        return Math.random()*100;
    },

    rollDice(type) {
        return Math.round(Math.random()*type);
    },

    pickFromTable(table, borderValue, borderValue2) {
        let borderIndex1 = table.indexOf(borderValue);
        let borderIndex2 = table.indexOf(borderValue2);
        let randomRoll = this.roll();
        let jumpChance = 20;
        if (borderValue == 'meadow' || borderValue == 'forest'){
            jumpChance = 10;
        }
        let baseBorderIndex =  borderIndex1;
        if(borderIndex2!=-1) {
            if(borderIndex1 == borderIndex2) {
                jumpChance = 12
            } else {
                if(this.roll() <  50) {
                    baseBorderIndex = borderIndex2;
                }
            }
        }
        if (randomRoll < jumpChance && baseBorderIndex > 0) {
            return table[baseBorderIndex - 1];
        } else {
            if (randomRoll > (100-jumpChance) && baseBorderIndex < table.length-1) {
                return table[baseBorderIndex + 1];
            }
        }
        return table[baseBorderIndex];
    },

    pickAtRandom(table) {
        let randomRoll = this.roll();
        const index = Math.floor(randomRoll / 100 * table.length);
        return table[index];
    }

}

export default roller