/**
 * Created by gattra on 12/22/2015.
 */
'use strict';

var Enemy = function (game, x, y, key) {
    Phaser.Sprite.call(this, game, x, y, key);
    this.game.physics.arcade.enable(this);
};

Enemy.ATTACK_TYPE = {
    STAND : 0,
    PURSUE : 1
};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.collide = function (obj) {
    this.game.physics.arcade.collide(this, obj);
};



