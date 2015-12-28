/**
 * Created by gattra on 12/23/2015.
 */

var EnemyGroup = function(game, enemies) {
    Phaser.Group.call(this, game);
    this.enemies = enemies;
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
    if (game.physics.arcade.distanceBetween(enemy,player) < 100) {
        //Enemies.chasePlayer(enemy, player);
        switch (enemy.attackType) {
            case Enemy.ATTACK_TYPE.STAND:
                enemy.attackPlayer();
                break;
            case Enemy.ATTACK_TYPE.PURSUE:
                enemy.chasePlayer(player);
                break;
        }

    }
};
