/**
 * Created by gattra on 12/23/2015.
 */


var Enemies = {};

Enemies.Init = function() {
    enemies = game.add.group();
    return enemies;
};

Enemies.DistanceFromPlayer = function(enemy, player) {
    if (game.physics.arcade.distanceBetween(enemy,player) < 100) {
        console.log("you've been detected!");
        Enemies.chasePlayer(enemy, player);
    }
};

Enemies.chasePlayer = function(enemy, player) {
    enemy.body.collideWorldBounds = true;
    enemy.state = 'stop';
    changeUpdateMethodForEnemy(enemy);
    enemy.body.velocity.x = 0;
    enemy.body.velocity.y = 0;
    if (player.alive) {
        game.physics.arcade.moveToObject(enemy, player, 150);
    }
};

function changeUpdateMethodForEnemy(enemy) {
    enemy.updateState = function() {
        if (enemy.body.velocity.x > 0) {
            enemy.animations.play('walkRight');
        } else if (enemy.body.velocity.x < 0){
            enemy.animations.play('walkLeft');
        } else {
            enemy.state = 'stop';
        }
    };
}