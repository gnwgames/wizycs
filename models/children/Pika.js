/**
 * Created by gattra on 12/23/2015.
 */
var PikaEnemy = function (game, x, y) {
    Enemy.call(this, game, x, y, 'pika')
    this.animations.add('walkRight', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20], 21, true)
    this.animations.add('walkLeft', [20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0], 21, true)
    this.scale.setTo(1.5, 1.5)
    this.game.add.existing(this)
    this.body.gravity.y = 500
    this.state = 'right'
    // when the player runs into enemy, he cannot move the enemy
    this.body.immovable = true
};

PikaEnemy.prototype = Object.create(Enemy.prototype);
PikaEnemy.prototype.constructor = PikaEnemy;

PikaEnemy.prototype.updateState = function () {
    switch (this.state){
        case 'left':
            this.animations.play('walkLeft');
            this.body.velocity.x = -100;
            this.state = 'stop';
            break;
        case 'right':
            this.animations.play('walkRight');
            this.body.velocity.x = 100;
            this.state = 'stop';
            break;
        case 'stop':
            this.animations.stop();
            if (this.body.velocity.x > 0) {
                this.state = 'left'
            } else {
                this.state = 'right'
            }
            this.body.velocity.x = 0;
            break
    }
};
