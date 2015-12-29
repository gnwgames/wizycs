/**
 * Created by gattra on 12/23/2015.
 */
var MODE = {
    PATROLING : 0,
    ATTACKING : 1,
    PURSUING : 2
};

var PikaEnemy = function (game, x, y, range, attackType, power) {
    Enemy.call(this, game, x, y, 'pika')
    this.animations.add('walkRight', [8,9,10,11,12,13,14,15], 10, true);
    this.animations.add('walkLeft', [8,9,10,11,12,13,14,15], 10, true);
    this.scale.setTo(1.5, 1.5)
    this.game.add.existing(this);
    this.body.gravity.y = 500
    this.body.velocity.y = 0;
    this.patrolRange = range;
    this.attackType = attackType;
    this.power = power;
    this.state = 'right';
    // when the player runs into enemy, he cannot move the enemy
    this.body.immovable = true;
    this.instanceType = 'Enemy';
    this.lifeCount = 3;
    this.mode = MODE.PATROLING;
    this.lastFired = 0;
};


PikaEnemy.prototype = Object.create(Enemy.prototype);
PikaEnemy.prototype.constructor = PikaEnemy;

PikaEnemy.prototype.updateState = function () {
    if (this.mode === MODE.ATTACKING) {
        //do nothing
    } else if (this.mode === MODE.PATROLING) {
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
    }
};

PikaEnemy.prototype.flipLeft = function() {
    this.scale.setTo (1.5, 1.5)
};

PikaEnemy.prototype.flipRight = function() {
    this.scale.setTo(-1.5, 1.5)
};

PikaEnemy.prototype.pursuePlayer = function (player) {
    this.mode = MODE.PURSUING;
    this.body.collideWorldBounds = true;
    this.state = 'stop';
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    if (player.alive) {
        game.physics.arcade.moveToObject(this, player, 150);
    }

    if (this.body.velocity.x > 0) {
        this.flipRight();
        this.animations.play('walkRight');
    } else if (this.body.velocity.x < 0){
        this.flipLeft();
        this.animations.play('walkLeft');
    }

};

PikaEnemy.prototype.attackPlayer = function(player) {
    this.mode = MODE.ATTACKING;

    this.animations.stop();
    this.body.velocity.x = 0;

    //get location of pika enemy
    var pikaPositionX, pikaPositionY;
    pikaPositionX = this.position.x;
    pikaPositionY = this.position.y;

    //get location of player
    var playerPositionX;
    playerPositionX = player.position.x;

    //compare locations
    var xOffset, shootDir;
    if (playerPositionX < pikaPositionX) { xOffset = 20; shootDir = 'left'; this.flipLeft(); }
    else { xOffset = 0; shootDir = 'right'; this.flipRight(); }

    //check lastFired to see if ready to fire again
    var currentTime = new Date().getTime() / 1000;
    if (currentTime > this.lastFired + 5) {
        this.lastFired = currentTime;

        //conjure power object
        var power;
        if (this.power === Flame) {
            power = new Flame(this.game, pikaPositionX - xOffset, pikaPositionY - 16);
            power.overlap(player);
            power.shoot(shootDir);

            if (player.alive) {
                game.physics.arcade.moveToObject(power, player, 300);
            }
        }


    }

};
