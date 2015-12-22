/**
 * Created by gattra on 12/22/2015.
 */

Player = {};

Player.CreatePlayer = function(x, y) {
    player = game.add.sprite(x, y, 'chars');

    game.physics.arcade.enable(player);
    player.frame = 10;
    player.animations.add('left', [21,22,23,22], 5, true);
    player.animations.add('right', [33,34,35,34], 5, true);
    player.body.gravity.y = 500;
    player.body.bounce.y = 0.2;
    player.body.collideWorldBounds = true;
    game.camera.follow(player);
    player.lastFire = 0;

    return player;
};

Player.EquipPower = function(player, power) {
    player.equippedPower = power;
};