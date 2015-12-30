/**
 * Created by gattra on 12/23/2015.
 */

var EnemyGroup = function(game) {
    Phaser.Group.call(this, game);
};

EnemyGroup.prototype = Object.create(Phaser.Group.prototype);
EnemyGroup.prototype.constructor = EnemyGroup;

EnemyGroup.prototype.addEnemies = function(enemies) {
    for (var i=0;i<enemies.length;i++) {
        if (enemies[i]) {
            this.add(enemies[i]);
        }
    }
};

EnemyGroup.prototype.distanceFromPlayer = function(enemy, player) {
    if (!player.alive) {
        enemy.mode = MODE.PATROLING;
        return;
    }
    if ((game.physics.arcade.distanceBetween(enemy,player) < enemy.detectRange) && (enemy.mode !== MODE.ATTACKING)) {
        //Enemies.chasePlayer(enemy, player);
        animateDetection(enemy);
        enemy.pursuePlayer(player);
        enemy.mode = MODE.PURSUING;
    } else if (enemy.mode !== MODE.ATTACKING) {
        //game.physics.arcade.moveToObject(enemy, enemy.origin.x, 200);
        enemy.mode = MODE.PATROLING;
    }
};

function animateDetection(enemy) {

}
