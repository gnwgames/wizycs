'use strict';

var Power = function (game, x, y, key) {
  Phaser.Sprite.call(this, game, x, y, key)
  this.game.physics.arcade.enable(this)
}

Power.prototype = Object.create(Phaser.Sprite.prototype)
Power.prototype.constructor = Power

var Fire = function (game, x, y) {
  Power.call(this, game, x, y, 'flame')
  this.animations.add('leftFire', [0,1,2,3,4,5,6,7], 10, true)
  this.animations.add('rightFire'. [32,33,34,35,36,37,38,39], 10, true)
}

Fire.prototype = Object.create(Power.prototype)
Fire.prototype.constructor = Fire

Fire.prototype.shoot = function (dir) {
  if (dir === 'left') {
    this.body.velocity.x = -300
    this.animations.play('leftFire')
  } else {
    this.body.velocity.x = 300
    this.animations.play('rightFire')
  }
}
