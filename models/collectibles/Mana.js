/**
 * Created by gattra on 1/8/2016.
 */

var Mana = function (game, x, y, key) {
    Phaser.Sprite.call(this, game, x, y, key);
    this.game.physics.arcade.enable(this);
    this.body.gravity.y = 300;
};

Mana.prototype = Object.create(Phaser.Sprite.prototype);
Mana.prototype.constructor = Mana;

Mana.prototype.collide = function (obj) {
    this.game.physics.arcade.collide(this, obj);
};


