// Import Inquirer
const inquirer = require('inquirer');
// Import Enemy.js and Player.js
const Enemy = require('./Enemy');
const Player = require('./Player');

// Game constructor
class Game {
  constructor() {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    this.currentEnemy;
    this.player;
  }

  // method to initialize the game
  initializeGame() {
    // populate the enemies array
    this.enemies.push(new Enemy('goblin', 'sword'));
    this.enemies.push(new Enemy('orc', 'baseball bat'));
    this.enemies.push(new Enemy('skeleton', 'axe'));

    // what enemy is fighting the player
    this.currentEnemy = this.enemies[0];

    // prompt the user for their name
    inquirer
      .prompt({
        type: 'text',
        name: 'name',
        message: 'What is your name?',
      })
      // destructure name from the prompt object
      .then(({ name }) => {
        this.player = new Player(name);

        // call the startNewBattle() function to start a new round
        this.startNewBattle();
      });
  }

  // method to start new battle
  startNewBattle() {
    if (this.player.agility > this.currentEnemy.agility) {
      this.isPlayerTurn = true;
    } else {
      this.isPlayerTurn = false;
    }

    // display player stats
    console.log('Your stats are as follows:');
    console.table(this.player.getStats());

    // display enemy stats
    console.log(this.currentEnemy.getDescription());

    // call this.battle to determine the order of battle
    this.battle();
  }

  // method for the player and enemy to battle
  battle() {
    if (this.isPlayerTurn) {
      inquirer
        .prompt({
          type: 'list',
          message: 'What would you like to do?',
          name: 'action',
          choices: ['Attack', 'Use potion'],
        })
        .then(({ action }) => {
          if (action === 'Use potion') {
            if (!this.player.getInventory()) {
              console.log("You don't have any potions!");

              // after player sees their empty inventory...
              return this.checkEndOfBattle();
            }

            inquirer
              .prompt({
                type: 'list',
                message: 'Which potion would you like to use?',
                name: 'action',
                choices: this.player
                  .getInventory()
                  .map((item, index) => `${index + 1}: ${item.name}`),
              })
              .then(({ action }) => {
                const potionDetails = action.split(': ');

                this.player.usePotion(potionDetails[0] - 1);
                console.log(`You used a ${potionDetails[1]} potion.`);

                // after a player uses a potion
                this.checkEndOfBattle();
              });
          } else {
            const damage = this.player.getAttackValue();
            this.currentEnemy.reduceHealth(damage);

            console.log(`You attacked the ${this.currentEnemy.name}`);
            console.log(this.currentEnemy.getHealth());

            // after player attacks
            this.checkEndOfBattle();
          }
        });
    } else {
      const damage = this.currentEnemy.getAttackValue();
      this.player.reduceHealth(damage);

      console.log(`You were attacked by the ${this.currentEnemy.name}`);
      console.log(this.player.getHealth());

      // after enemy attacks
      this.checkEndOfBattle();
    }
  }

  // checking win/lose conditions
  checkEndOfBattle() {
    // if both characters are alive
    if (this.player.isAlive() && this.currentEnemy.isAlive()) {
      this.isPlayerTurn = !this.isPlayerTurn;
      this.battle();
    } // if the player is alive and the enemy is defeated
    else if (this.player.isAlive() && !this.currentEnemy.isAlive()) {
      console.log(`You've defeated the ${this.currentEnemy.name}`);

      this.player.addPotion(this.currentEnemy.potion);
      console.log(
        `${this.player.name} found a ${this.currentEnemy.potion.name} potion`
      );

      this.roundNumber++;

      if (this.roundNumber < this.enemies.length) {
        this.currentEnemy = this.enemies[this.roundNumber];
        this.startNewBattle();
      } else {
        console.log('You win!');
      }
    } // If the player is defeated
    else {
      console.log("You've been defeated!");
    }
  }
}

// Make Game.js available for other files
module.exports = Game;
