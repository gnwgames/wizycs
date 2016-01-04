/**
 * Created by gattra on 12/23/2015.
 */
var MODE = {
    PATROLING : 0,
    ATTACKING : 1,
    PURSUING : 2
};

var PikaEnemy = function (game, x, y, range, attackType, power, attackRange, fireRate) {
    Enemy.call(this, game, x, y, 'pika');
    this.animations.add('walkRight', [8,9,10,11,12,13,14,15], 10, true);
    this.animations.add('walkLeft', [8,9,10,11,12,13,14,15], 10, true);
    this.scale.setTo(1.5, 1.5);
    this.origin = { x : x, y : y};
    this.game.add.existing(this);
    this.body.gravity.y = 550;
    this.body.velocity.y = 0;
    this.patrolRange = range || 150;
    this.attackType = attackType || Enemy.ATTACK_TYPE.STAND;
    this.attackRange = attackRange || 150;
    this.fireRate = fireRate || 2;
    this.power = power;
    this.state = 'stop';
    this.lastStopped = 0;
    this.lastDir = 'right';
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

PikaEnemy.prototype.update = function () {
    if((this.body.blocked.left || this.body.blocked.right)) {
        this.jump(-160, 200);
    }

    if (this.mode === MODE.ATTACKING) {
        //do nothing
    } else if (this.mode === MODE.PATROLING) {
        switch (this.state){
            case 'left':
                this.flipLeft();
                this.animations.play('walkLeft');
                var distanceTraveled = this.calculateDistanceFromOriginX(this.origin.x);
                if (distanceTraveled >= this.patrolRange) { this.lastStopped = (new Date().getTime()/1000); this.state = 'stop'; break; }
                this.body.velocity.x = -70;
                break;
            case 'right':
                this.flipRight();
                this.animations.play('walkRight');
                var distanceTraveled = this.calculateDistanceFromOriginX(this.origin.x);
                if (distanceTraveled <= 1) { this.lastStopped = (new Date().getTime()/1000); this.state = 'stop'; break; }
                this.body.velocity.x = 70;
                break;
            case 'stop':
                this.animations.stop();
                this.body.velocity.x = 0;
                this.frame = 1;
                if (this.lastStopped+1 < (new Date().getTime()/1000)) {
                    if (this.lastDir === 'right') {
                        this.state = 'left';
                        this.lastDir = 'left';
                    } else {
                        this.state = 'right';
                        this.lastDir = 'right';
                    }
                }
                break;
        }
    }
};

// if (distanceTraveled === this.patrolRange) { this.lastStopped = (new Date().getTime()/1000); this.state = 'stop'; break; }

PikaEnemy.prototype.calculateDistanceFromOriginX = function (originX) {
    var currentX = this.position.x;
    var absoluteDistance = Math.abs(currentX-originX);
    return absoluteDistance;
};

//(this.body.onFloor() || this.body.touching.down) &&

PikaEnemy.prototype.flipLeft = function() {
    this.scale.setTo (1.5, 1.5)
};

PikaEnemy.prototype.flipRight = function() {
    this.scale.setTo(-1.5, 1.5)
};

PikaEnemy.prototype.pursuePlayer = function (player) {
    this.mode = MODE.PURSUING;
    var playerPosition = player.position;
    var pikaPosition = this.position;

    if (pikaPosition.x < playerPosition.x - 50) {
        this.flipRight();
        this.animations.play('walkRight');
        this.body.velocity.x = 100;
    } else if (pikaPosition.x > playerPosition.x + 50)  {
        this.flipLeft();
        this.animations.play('walkLeft');
        this.body.velocity.x = -100;
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

};

PikaEnemy.prototype.st = function () {
    this.animations.stop();
    this.frame = 1;
    this.body.velocity.x = 0;
};

PikaEnemy.prototype.jump = function(velocityY, velocityX) {
    this.body.velocity.y = velocityY;
    this.body.velocity.x = velocityX;
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
    if (playerPositionX < pikaPositionX) { xOffset = -30; shootDir = 'left'; this.flipLeft(); }
    else { xOffset = 0; shootDir = 'right'; this.flipRight(); }

    //check lastFired to see if ready to fire again
    var currentTime = new Date().getTime() / 1000;
    if (currentTime > this.lastFired + this.fireRate) {

        this.lastFired = currentTime;

        //conjure power object
        var power;
        if (this.power === Flame) {
            power = new Flame(this.game, pikaPositionX + xOffset, pikaPositionY - 16);
            power.hitGroups = player;
            power.collideGroups = collision;
            power.shoot(shootDir);

            if (player.alive) {
                game.physics.arcade.moveToObject(power, player, 300);
            }
        }
    }

};
