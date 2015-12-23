'use strict';

var Power = function (game, x, y, key) {
  Phaser.Sprite.call(this, game, x, y, key)
  this.game.physics.arcade.enable(this)
}

Power.prototype = Object.create(Phaser.Sprite.prototype)
Power.prototype.constructor = Power

var Flame = function (game, x, y) {
  Power.call(this, game, x, y, 'flame')
  this.animations.add('leftFire', [0,1,2,3,4,5,6,7], 10, true)
  this.animations.add('rightFire', [32,33,34,35,36,37,38,39], 10, true)

  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
  this.game.add.existing(this)
}

Flame.prototype = Object.create(Power.prototype)
Flame.prototype.constructor = Flame

Flame.prototype.shoot = function (dir) {
  if (dir === 'left') {
    this.body.velocity.x = -300
    this.animations.play('leftFire')
  } else {
    this.body.velocity.x = 300
    this.animations.play('rightFire')
  }
}

Flame.handleInput = function (char) {
  if (char.body.velocity.x >= 0) {
    var flame = new Flame(char.game, char.position.x, char.position.y - 16)
    flame.shoot('right')
  } else if (char.body.velocity.x < 0) {
    var flame = new Flame(char.game, char.position.x - 20, char.position.y - 16)
    flame.shoot('left')
  }
}
