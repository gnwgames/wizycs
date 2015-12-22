/**
 * Created by gattra on 12/22/2015.
 */

Player = {};

Player.CreatePlayer = function() {
    wzrd = game.add.sprite(0, 0, 'chars');
    this.EquipPlayer();
    game.physics.arcade.enable(wzrd);
    wzrd.frame = 10;
    wzrd.animations.add('left', [21,22,23,22], 5, true);
    wzrd.animations.add('right', [33,34,35,34], 5, true);
    wzrd.body.gravity.y = 500;
    wzrd.body.collideWorldBounds = true;
    game.camera.follow(wzrd);
    wzrd.lastFire = 0;

    return wzrd;
};

Player.EquipPlayer = function() {
    flame = game.add.sprite(wzrd.position.x, wzrd.position.y-15, 'flame');
    flame.animations.add('fireRight', [32,33,34,35,36,37,39], 20, true);
    flame.animations.add('fireLeft', [0,1,2,3,4,5,6,7], 20, true);
};