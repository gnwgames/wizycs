/**
 * Created by gattra on 12/23/2015.
 */

Flame.prototype = Object.create(Power.prototype);
Flame.prototype.constructor = Flame;

Flame.prototype.shoot = function (dir) {
    if (dir === 'left') {
        this.body.velocity.x = -300;
        this.animations.play('leftFire')
    } else if (dir === 'right') {
        this.body.velocity.x = 300;
        this.animations.play('rightFire')
    } else if (dir === 'down') {
        this.body.velocity.y = 300;
        this.animations.play('downFire');
    }
};

Flame.prototype.update = function () {
    this.game.physics.arcade.overlap(Flame.hitGroups, this, CollisionHandler.PowerCollision)
};


