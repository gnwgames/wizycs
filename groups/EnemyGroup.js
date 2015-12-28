/**
 * Created by gattra on 12/23/2015.
 */

var EnemyGroup = function() {
    game.add.group();
};

EnemyGroup.prototype = Object.create(Phaser.Group.prototype);
EnemyGroup.prototype.constructor = EnemyGroup;

EnemyGroup.prototype.addEnemies = function(enemies) {
    console.log(enemies.length);
    for (var i=0;i<enemies.length;i++) {
        console.log(i);
        this.add(enemies[i]);
    }
    console.log('done');
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
