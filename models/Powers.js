/**
 * Created by gattra on 12/22/2015.
 */

Powers = {};

Powers.Fire = function (power, direction) {
    if (direction == 'right') {
        x = wzrd.position.x+10;
        xVelocity = 300;
        var frame = 32;
    } else {
        x = wzrd.position.x -40;
        xVelocity = -300;
    }

    var y = wzrd.position.y-15;

    powerInstance = game.add.sprite(x, y, power);
    powerInstance.frame = frame;
    powerInstance.scale.setTo(1, 1);
    game.physics.arcade.enable(powerInstance);
    powerInstance.checkWorldBounds = true;
    powerInstance.outOfBoundsKill = true;
    powerInstance.body.velocity.x = xVelocity;
    powerInstance.body.velocity.y = 0;

};
