/**
 * Created by gattra on 12/22/2015.
 */
'use strict';

var Player = function(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'chars')
  this.game.physics.arcade.enable(this)
  this.game.add.existing(this)
  this.frame = 10
  this.animations.add('left', [21,22,23,22], 5, true)
  this.animations.add('right', [33,34,35,34], 5, true)
  this.body.gravity.y = 500
  this.body.collideWorldBounds = true
  this.power = null
  this.game.camera.follow(this)

};

Player.prototype = Object.create(Phaser.Sprite.prototype)
Player.prototype.constructor = Player

Player.prototype.equip = function(key, handler) {
  var obj = this;
  this.power = (game.input.keyboard.addKey(key));
  this.power.onDown.add(function() {
    handler(obj)
  })
}

Player.prototype.l = function() {
  this.animations.play('left');
  this.body.velocity.x = -150;
}

Player.prototype.r = function () {
  this.animations.play('right')
  this.body.velocity.x = 150
}

Player.prototype.fly = function () {
  this.body.velocity.y += -18
}

Player.prototype.st = function () {
  this.animations.stop()
  this.frame = 10
  this.body.velocity.x = 0
}

Player.prototype.collide = function (obj) {
  this.game.physics.arcade.collide(this, obj)
}

Player.prototype.handleInput = function (keys) {
  if (keys.left.isDown) {
    this.l()
  } else if (keys.right.isDown) {
    this.r()
  } else {
    this.st()
  }
  if (keys.up.isDown) {
    // flame.visible = true
    // flame.position.x = wzrd.position.x - 15
    // flame.position.y = wzrd.position.y + 13
    // flame.play('fire')
    this.fly()

  }
}
