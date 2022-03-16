const Potion = require('../lib/Potion');
const Character = require('./Character');

// this.health = Math.floor(Math.random() * 10 + 95);

// math.floor essentially rounds down to the nearest whole number.
//EXAMPLES
// ---------EXAMPLES--------------
// Math.floor(45.05); //  45
// Math.floor(4); //   4
// Math.floor(-45.05); // -46
// Math.floor(-45.95); // -46

// Math random generates a random number between 0 and 1 by default.
// ---------EXAMPLES--------------
// console.log(Math.random()); // 0.40511195963178337
// Player.prototype = Object.create(Character.prototype);

class Player extends Character {
  constructor(name = '') {
    super(name);

    this.inventory = [new Potion('health'), new Potion()];
  }

  getStats() {
    return {
      potions: this.inventory.length,
      health: this.health,
      strength: this.strength,
      agility: this.agility
    };
  }

  getInventory() {
    if (this.inventory.length) {
      return this.inventory;
    }
    return false;
  }

  addPotion(potion) {
    this.inventory.push(potion);
  }

  usePotion(index) {
    const potion = this.inventory.splice(index, 1)[0];

    switch (potion.name) {
      case 'agility':
        this.agility += potion.value;
        break;
      case 'health':
        this.health += potion.value;
        break;
      case 'strength':
        this.strength += potion.value;
        break;
    }
  }
}
module.exports = Player;


