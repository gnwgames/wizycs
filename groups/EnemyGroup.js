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
        if (enemy.body.velocity.x < 0) { enemy.lastDir = 'left'; } else { enemy.lastDir = 'right'; }
        enemy.mode = MODE.PATROLING;
        return;
    }
    if (game.physics.arcade.distanceBetween(enemy,player) < enemy.attackRange) {
        //Enemies.chasePlayer(enemy, player);
        animateDetection(enemy);
        switch (enemy.attackType) {
            case Enemy.ATTACK_TYPE.STAND:
                enemy.attackPlayer(player);
                break;
            case Enemy.ATTACK_TYPE.PURSUE:
                enemy.pursuePlayer(player);
                break;
        }
    } else {
        if (enemy.mode === MODE.ATTACKING || enemy.mode === MODE.PURSUING) {
            if (enemy.body.velocity.x < 0) { enemy.lastDir = 'left'; } else { enemy.lastDir = 'right'; }
            enemy.origin = { x : enemy.position.x, y : enemy.position.y };
        }
        enemy.mode = MODE.PATROLING;
    }
};

function animateDetection(enemy) {

}
