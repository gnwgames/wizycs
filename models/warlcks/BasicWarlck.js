/**
 * Created by gattra on 1/3/16.
 */

var BasicWarlck = function (game, x, y, range, attackRange, fireRate) {
    Warlck.call(this, game, x, y, 'chars');
    this.animations.add('walkRight', [72, 73, 74, 72], 10, true);
    this.animations.add('walkLeft', [60, 61, 62, 61], 10, true);
    this.origin = { x : x, y : y };
    this.game.add.existing(this);
    this.body.gravity.y = 550;
    this.body.velocity.y = 0;
    this.patrolRange = range || 150;
    this.attackRange = attackRange || 150;
    this.fireRate = fireRate || 1;
    this.state = 'stop';
    this.lastStopped = 0;
    this.lastDir = 'right';
    // when the player runs into enemy, he cannot move the enemy
    this.body.immovable = true;
    this.instanceType = 'Warlck';
    this.lifeCount = 3;
    this.jumpCount = 0;
    this.mode = MODE.PATROLING;
    this.lastFired = 0;
};


BasicWarlck.prototype = Object.create(Enemy.prototype);
BasicWarlck.prototype.constructor = BasicWarlck;

BasicWarlck.prototype.update = function () {
    if((this.body.blocked.left || this.body.blocked.right)) {
        this.jump(-160, 200);
    }

    if (this.mode === MODE.ATTACKING) {
        //do nothing
    } else if (this.mode === MODE.PATROLING) {
        switch (this.state){
            case 'left':
                this.animations.play('walkLeft');
                var distanceTraveled = this.calculateDistanceFromOriginX(this.origin.x);
                if (distanceTraveled >= this.patrolRange) { this.lastStopped = (new Date().getTime()/1000); this.state = 'stop'; break; }
                this.body.velocity.x = -70;
                break;
            case 'right':
                this.animations.play('walkRight');
                var distanceTraveled = this.calculateDistanceFromOriginX(this.origin.x);
                if (distanceTraveled <= 1) { this.lastStopped = (new Date().getTime()/1000); this.state = 'stop'; break; }
                this.body.velocity.x = 70;
                break;
            case 'stop':
                this.animations.stop();
                this.body.velocity.x = 0;
                this.frame = 49;
                if (this.lastStopped < ((new Date().getTime()/1000)+2)) {
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

BasicWarlck.prototype.calculateDistanceFromOriginX = function (originX) {
    var currentX = this.position.x;
    var absoluteDistance = Math.abs(currentX-originX);
    return absoluteDistance;
};

BasicWarlck.prototype.pursuePlayer = function (player) {
    this.mode = MODE.PURSUING;
    var playerPosition = player.position;
    var warlckPosition = this.position;

    if (warlckPosition.x < playerPosition.x - 50) {
        this.animations.play('walkRight');
        this.body.velocity.x = 100;
    } else if (warlckPosition.x > playerPosition.x + 50)  {
        this.animations.play('walkLeft');
        this.body.velocity.x = -100;
    }

};

BasicWarlck.prototype.st = function () {
    this.animations.stop();
    this.body.velocity.x = 0;
};

BasicWarlck.prototype.jump = function(velocityY, velocityX) {
    this.body.velocity.y = velocityY;
    this.body.velocity.x = velocityX;
};

BasicWarlck.prototype.attackPlayer = function(player) {
    this.mode = MODE.ATTACKING;

    this.animations.stop();
    this.body.velocity.x = 0;

    //get location of pika enemy
    var warlckPositionX, warlckPositionY;
    warlckPositionX = this.position.x;
    warlckPositionY = this.position.y;

    //get location of player
    var playerPositionX;
    playerPositionX = player.position.x;

    //compare locations
    var xOffset, shootDir;
    if (playerPositionX < warlckPositionX) { xOffset = -30; shootDir = 'left'; }
    else { xOffset = 0; shootDir = 'right'; }

    //check lastFired to see if ready to fire again
    var currentTime = new Date().getTime() / 1000;
    if (currentTime > this.lastFired + this.fireRate) {

        this.lastFired = currentTime;

        console.log('firing');
    }

};
