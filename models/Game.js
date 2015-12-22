/**
 * Created by gattra on 12/22/2015.
 */

Game = {};

Game.CreateKeyboardEvents = function() {
    keys = game.input.keyboard.createCursorKeys();

    var dKey = game.input.keyboard.addKey(Phaser.KeyCode.D);
    dKey.onDown.add(function(){
        if (keys.right.isDown)
        {
            Powers.Fire(wzrd.equippedPower, 'right');
        } else if  (keys.left.isDown)
        {
            Powers.Fire(wzrd.equippedPower, 'left');
        } else {
            Powers.Fire(wzrd.equippedPower, 'right');
        }
    }, this);

    if ((game.input.keyboard.isDown(Phaser.KeyCode.A)) && (keys.right.isDown))
    {
        console.log('right melee');
    } else if ((game.input.keyboard.isDown(Phaser.KeyCode.A)) && (keys.left.isDown))
    {
        console.log('left melee');
    }

};


Game.CreateMovementKeymap = function() {
    if (keys.left.isDown) {
        wzrd.animations.play('left');
        wzrd.body.velocity.x = -130;
    } else if (keys.right.isDown) {
        wzrd.animations.play('right');
        wzrd.body.velocity.x = 130;
    } else {
        wzrd.animations.stop();
        wzrd.frame = 10;
        wzrd.body.velocity.x = 0;
    }

    var upKey = keys.up;
    upKey.onDown.add(function(){
        //if (wzrd.body.touching.down) {
            wzrd.body.velocity.y = -200;
        //}
    }, this);
};