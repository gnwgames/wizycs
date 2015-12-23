/**
 * Created by gattra on 12/23/2015.
 */

Melee.prototype = Object.create(Power.prototype);
Melee.prototype.constructor = Melee;

Melee.prototype.strike = function (dir) {
    if (dir === 'left') {

        //this.animations.play('leftStrike')
    } else if (dir === 'right') {
        this.frame = 0;
        this.body.velocity.x = 300;
        this.body.velocity.x = -300;
    } else if (dir === 'down') {

        //this.animations.play('downStrike');
    } else if (dir === 'up') {

        //this.animations.play('upStrike');
    }
};

Melee.prototype.update = function () {
    this.game.physics.arcade.overlap(Melee.hitGroups, this, CollisionHandler.PowerCollision)
};