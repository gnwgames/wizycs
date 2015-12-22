/**
 * Created by gattra on 12/22/2015.
 */
'use strict';

var Player = function(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'chars')
  this.game.physics.arcade.enable(this)
  this.frame = 10
  this.animations.add('left', [21,22,23,22], 5, true)
  this.animations.add('right', [33,34,35,34], 5, true)
  this.body.gravity.y = 500
  this.body.collideWorldBounds = true
  this.game.camera.follow(this)
  this.game.add.existing(this)
}

Player.prototype = Object.create(Phaser.Sprite.prototype)
Player.prototype.constructor = Player

Player.prototype.equip = function() {

}

Player.prototype.left = function() {
  this.animations.play('left')
  this.body.velocity.x = -150
}

Player.prototype.right = function () {
  this.animations.play('right')
  this.body.velocity.x = 150
}

Player.prototype.fly = function () {
  this.body.velocity.y += -18
}

Player.prototype.stop = function () {
  this.animations.stop()
  this.frame = 10
  this.body.velocity.x = 0
}

// Player.CreatePlayer = function() {
//     wzrd = game.add.sprite(0, 0, 'chars');
//     this.EquipPlayer();
//     game.physics.arcade.enable(wzrd);
//     wzrd.frame = 10;
//     wzrd.animations.add('left', [21,22,23,22], 5, true);
//     wzrd.animations.add('right', [33,34,35,34], 5, true);
//     wzrd.body.gravity.y = 500;
//     wzrd.body.collideWorldBounds = true;
//     game.camera.follow(wzrd);
//
// };

// Player.EquipPlayer = function() {
//     flame = game.add.sprite(wzrd.position.x, wzrd.position.y-15, 'flame');
//     flame.animations.add('fireRight', [32,33,34,35,36,37,39], 20, true);
//     flame.animations.add('fireLeft', [0,1,2,3,4,5,6,7], 20, true);
// };
