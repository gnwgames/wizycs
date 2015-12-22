/**
 * Created by gattra on 12/22/2015.
 */

Enemy = {};

Enemy.CreateEnemy = function(x, y, key, frame) {
    /*
     enemy = game.add.sprite(x, y, key);
     enemy.animations.add('wr', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20], 15, true);
     enemy.animations.add('wl', [20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0], 15, true);
     enemy.scale.setTo(1.5,1.5);
     game.physics.arcade.enable(enemy);
     enemy.body.gravity.y = 500

     enemy.state = 'right'
     game.time.events.loop(Phaser.Timer.SECOND, function() {enemyWalk(enemy)}, this)
     */
};

Enemy.EnemyWalk = function(enemy) {
    switch (enemy.state){
        case 'left':
            enemy.animations.play('wl');
            enemy.body.velocity.x = -100;
            enemy.state = 'stop';
            break;
        case 'right':
            enemy.animations.play('wr');
            enemy.body.velocity.x = 100;
            enemy.state = 'stop';
            break;
        case 'stop':
            enemy.animations.stop();
            if (enemy.body.velocity.x > 0) {
                enemy.state = 'left'
            } else {
                enemy.state = 'right'
            }
            enemy.body.velocity.x = 0;
            break;
    }
};