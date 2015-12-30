/**
 * Created by gattra on 12/23/2015.
 */
var MODE = {
    PATROLING : 0,
    ATTACKING : 1,
    PURSUING : 2
};

var PikaEnemy = function (game, x, y, range, power, detectRange) {
    Enemy.call(this, game, x, y, 'pika')
    this.animations.add('walkRight', [8,9,10,11,12,13,14,15], 10, true);
    this.animations.add('walkLeft', [8,9,10,11,12,13,14,15], 10, true);
    this.scale.setTo(1.5, 1.5)
    this.game.add.existing(this);
    this.origin = { x : x, y : y };
    this.body.gravity.y = 500;
    this.body.velocity.y = 0;
    this.patrolRange = range;
    this.detectRange = detectRange || 250;
    this.attackRange = 150;
    this.fireRate = 1;
    this.power = power;
    this.state = 'right';
    // when the player runs into enemy, he cannot move the enemy
    this.body.immovable = true;
    this.instanceType = 'Enemy';
    this.lifeCount = 3;
    this.jumpCount = 0;
    this.mode = MODE.PATROLING;
    this.lastFired = 0;
};


PikaEnemy.prototype = Object.create(Enemy.prototype);
PikaEnemy.prototype.constructor = PikaEnemy;

PikaEnemy.prototype.updateState = function () {
    console.log(this.mode);
    if (this.mode === MODE.ATTACKING) {
        //do nothing
    } else if ((this.mode === MODE.PATROLING) && (this.patrolRange > 10)) {
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
    var playerPosition = player.position;
    var pikaPosition = this.position;

    if (pikaPosition.x < playerPosition.x - 50) {
        this.flipRight();
        this.animations.play('walkRight');
        this.body.velocity.x = 200;
    } else if (pikaPosition.x > playerPosition.x + 50)  {
        this.flipLeft();
        this.animations.play('walkLeft');
        this.body.velocity.x = -200;
    }
/*
    if ((playerPosition.y < pikaPosition.y) && (this.body.onFloor() || this.body.touching.down)) {
        var offsetX = Math.abs(playerPosition.x - pikaPosition.x);
        var offsetY = Math.abs(playerPosition.y - pikaPosition.y);
        var offset = offsetX + offsetY;
        var distance = game.physics.arcade.distanceBetween(this,player);
        console.log ('offset: '+offset+' | distance: '+distance);
        console.log(offset - distance);
        console.log(offset/distance);
        console.log((offset + distance) /2);
        var velocity = ((offset + distance) /2) + (offset-distance);
        this.jump(velocity);
    }
*/
    /*
    this.body.collideWorldBounds = true;
    this.state = 'stop';
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    if (player.alive) {
        game.physics.arcade.moveToObject(this, player, 150);
    }
    */

    if (game.physics.arcade.distanceBetween(this, player) < this.attackRange) {
        this.attackPlayer(player);
        this.mode = MODE.ATTACKING;
    }

};

PikaEnemy.prototype.st = function () {
    this.animations.stop();
    this.frame = 1;
    this.body.velocity.x = 0;
};

PikaEnemy.prototype.jump = function(velocity) {
    this.body.velocity.y = -(velocity);
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
    if (playerPositionX < pikaPositionX) { xOffset = -25; shootDir = 'left'; this.flipLeft(); }
    else { xOffset = 0; shootDir = 'right'; this.flipRight(); }

    //check lastFired to see if ready to fire again
    var currentTime = new Date().getTime() / 1000;
    if (currentTime > this.lastFired + this.fireRate) {
        this.lastFired = currentTime;

        //conjure power object
        var power;
        if (this.power === Flame) {
            power = new Flame(this.game, pikaPositionX + xOffset, pikaPositionY - 16);
            power.overlap(player);
            power.hitGroups = player;
            power.shoot(shootDir);

            if (player.alive) {
                game.physics.arcade.moveToObject(power, player, 300);
            }
        }
    }

};
