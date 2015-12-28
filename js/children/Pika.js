/**
 * Created by gattra on 12/23/2015.
 */
var PikaEnemy = function (game, x, y, range, attackType) {
    Enemy.call(this, game, x, y, 'pika')
    this.animations.add('walkRight', [8,9,10,11,12,13,14,15], 10, true);
    this.animations.add('walkLeft', [8,9,10,11,12,13,14,15], 10, true);
    this.scale.setTo(1.5, 1.5)
    this.game.add.existing(this);
    this.body.gravity.y = 500
    this.body.velocity.y = 0;
    this.patrolRange = range;
    this.attackType = attackType;
    this.state = 'right';
    // when the player runs into enemy, he cannot move the enemy
    this.body.immovable = true;
    this.instanceType = 'Enemy';
    this.lifeCount = 3;
};


PikaEnemy.prototype = Object.create(Enemy.prototype);
PikaEnemy.prototype.constructor = PikaEnemy;

PikaEnemy.prototype.updateState = function () {
    switch (this.state){
        case 'left':
            this.flipLeft();
            this.animations.play('walkLeft');
            this.body.velocity.x = -this.patrolRange;
            this.state = 'stop';
            break;
        case 'right':
            this.flipRight();
            this.animations.play('walkRight');
            this.body.velocity.x = this.patrolRange;
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

PikaEnemy.prototype.flipLeft = function() {
    this.scale.setTo (1.5, 1.5)
};

PikaEnemy.prototype.flipRight = function() {
    this.scale.setTo(-1.5, 1.5)
};

PikaEnemy.prototype.pursuePlayer = function (player) {

    this.body.collideWorldBounds = true;
    this.state = 'stop';
    this.changeUpdateMethod();
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    if (player.alive) {
        game.physics.arcade.moveToObject(this, player, 150);
    }

};

PikaEnemy.prototype.attackPlayer = function() {
    //pass
};

PikaEnemy.prototype.changeUpdateMethod = function() {

    this.updateState = function() {
        if (this.body.velocity.x > 0) {
            this.flipRight();
            this.animations.play('walkRight');
        } else if (this.body.velocity.x < 0){
            this.flipLeft();
            this.animations.play('walkLeft');
        }
    };
};
