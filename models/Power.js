'use strict';

var Power = function (game, x, y, key) {
  Phaser.Sprite.call(this, game, x, y, key)
  this.game.physics.arcade.enable(this);
}

Power.prototype = Object.create(Phaser.Sprite.prototype)
Power.prototype.constructor = Power

var Melee = function (game, x, y) {
  Power.call(this, game, x, y, 'stave');
  // this.animations.add('rightStrike', [32,33,34,35,36,37,38,39], 10, true);
  // this.animations.add('downStrike', [48,49,50,51,52,53,54,55], 10, true);
  // this.animations.add('upStrike', [48,49,50,51,52,53,54,55], 10, true);
  this.hitGroups = null;
  this.game.add.existing(this);
};

Melee.handleInput = function (char) {
  PowerInputHandler.HandleMeleeInput(char);
};

var Flame = function (game, x, y) {
  Power.call(this, game, x, y, 'flame');
  this.animations.add('leftFire', [0,1,2,3,4,5,6,7], 10, true);
  this.animations.add('rightFire', [32,33,34,35,36,37,38,39], 10, true);
  this.animations.add('downFire', [48,49,50,51,52,53,54,55], 10, true);

  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
  this.game.add.existing(this);

  this.hitGroups = null;
};

Flame.handleInput = function (char) {
  PowerInputHandler.HandleFlameInput(char);
};
