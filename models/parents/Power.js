'use strict';

var Power = function (game, x, y, key) {
  Phaser.Sprite.call(this, game, x, y, key);
  this.game.physics.arcade.enable(this);
};

Power.prototype = Object.create(Phaser.Sprite.prototype);
Power.prototype.constructor = Power;


