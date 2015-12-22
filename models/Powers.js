/**
 * Created by gattra on 12/22/2015.
 */

Powers = {};

Powers.Fire = function (direction) {
    if (direction == 'right') {
        var xVelocity = 300;
        var frame = 32;
    } else {
        var xVelocity = -300;
    }

    var x = wzrd.position.x;
    var y = wzrd.position.y-15;

    fireball = game.add.sprite(x, y, 'flame');
    fireball.frame = frame;
    fireball.scale.setTo(1, 1);
    game.physics.arcade.enable(fireball);
    fireball.checkWorldBounds = true;
    fireball.outOfBoundsKill = true;
    fireball.body.velocity.x = xVelocity;
    fireball.body.velocity.y = 0;

};
