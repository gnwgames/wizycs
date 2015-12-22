/**
 * Created by gattra on 12/22/2015.
 */
'use strict';

var Enemy = function (game, x, y, key) {
  Phaser.Sprite.call(this, game, x, y, key)
  this.game.physics.arcade.enable(this)
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype)
Enemy.prototype.constructor = Enemy

var PikaEnemy = function (game, x, y) {
  Enemy.call(this, game, x, y, 'pika')
  this.animations.add('walkRight', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20], 21, true)
  this.animations.add('walkLeft', [20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0], 21, true)
  this.scale.setTo(1.5, 1.5)
  this.game.add.existing(this)
  this.body.gravity.y = 500
  this.state = 'right'
}

PikaEnemy.prototype = Object.create(Enemy.prototype)
PikaEnemy.prototype.constructor = PikaEnemy

// Enemy.EnemyWalk = function(enemy) {
//     switch (enemy.state){
//         case 'left':
//             enemy.animations.play('wl');
//             enemy.body.velocity.x = -100;
//             enemy.state = 'stop';
//             break;
//         case 'right':
//             enemy.animations.play('wr');
//             enemy.body.velocity.x = 100;
//             enemy.state = 'stop';
//             break;
//         case 'stop':
//             enemy.animations.stop();
//             if (enemy.body.velocity.x > 0) {
//                 enemy.state = 'left'
//             } else {
//                 enemy.state = 'right'
//             }
//             enemy.body.velocity.x = 0;
//             break;
//     }
// };
