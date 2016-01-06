/**
 * Created by gattra on 1/3/16.
 */

var Warlck = function (game, x, y, key) {
    Phaser.Sprite.call(this, game, x, y, key);
    this.game.physics.arcade.enable(this);
};

Warlck.MODE =
{
    PATROLING : 0,
    ATTACKING : 1,
    PURSUING : 2
};

Warlck.STATE =
{
    STANDING : 0,
    JUMPING : 1,
    FLYING : 2,
    FALLING : 3,
    DIVING : 4,
    INJURED : 5,
    DODGING : 6,
    HOVERING : 7,
    NEUTRAL : 8
};

Warlck.prototype = Object.create(Phaser.Sprite.prototype);
Warlck.prototype.constructor = Warlck;

Warlck.prototype.collide = function (obj) {
    this.game.physics.arcade.collide(this, obj);
};



